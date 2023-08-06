package com.hart.notitum.card;

import com.hart.notitum.list.WorkspaceList;
import com.hart.notitum.list.WorkspaceListRepository;
import com.hart.notitum.user.User;
import com.hart.notitum.user.UserRepository;
import com.hart.notitum.user.UserService;

import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.Optional;
import java.sql.Timestamp;
import java.util.ArrayList;

import com.hart.notitum.activelabel.ActiveLabelRepository;
import com.hart.notitum.activelabel.dto.ActiveLabelDto;
import com.hart.notitum.activity.Activity;
import com.hart.notitum.activity.ActivityRepository;
import com.hart.notitum.activity.ActivityService;
import com.hart.notitum.advice.BadRequestException;
import com.hart.notitum.advice.ForbiddenException;
import com.hart.notitum.advice.NotFoundException;
import com.hart.notitum.card.dto.CardDto;
import com.hart.notitum.card.dto.ReorderCardDto;
import com.hart.notitum.checklist.ChecklistRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CardService {

    private final CardRepository cardRepository;
    private final UserRepository userRepository;
    private final WorkspaceListRepository workspaceListRepository;
    private final ModelMapper modelMapper;
    private final UserService userService;
    private final ActiveLabelRepository activeLabelRepository;
    private final ChecklistRepository checklistRepository;
    private final ActivityRepository activityRepository;

    @Autowired
    public CardService(CardRepository cardRepository,
            UserRepository userRepository,
            WorkspaceListRepository workspaceListRepository,
            ModelMapper modelMapper,
            UserService userService,
            ActiveLabelRepository activeLabelRepository,
            ChecklistRepository checklistRepository,
            ActivityRepository activityRepository) {
        this.cardRepository = cardRepository;
        this.userRepository = userRepository;
        this.workspaceListRepository = workspaceListRepository;
        this.modelMapper = modelMapper;
        this.userService = userService;
        this.activeLabelRepository = activeLabelRepository;
        this.checklistRepository = checklistRepository;
        this.activityRepository = activityRepository;
    }

    public Card getCardById(Long cardId) {
        return this.cardRepository.findById(cardId)
                .orElseThrow(() -> new NotFoundException("Card not found with id " + cardId));
    }

    public void deleteCard(Long id, Long workspaceUserId) {
        if (workspaceUserId != this.userService.getCurrentlyLoggedInUser().getId()) {
            throw new ForbiddenException("Cannot delete another person's card");
        }
        Card card = this.cardRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Card not found deleting card"));
        List<Long> activeLabelIds = card.getActiveLabels().stream().map(v -> v.getId()).toList();
        this.activeLabelRepository.deleteAllById(activeLabelIds);
        this.cardRepository.deleteById(id);
    }

    public void updateCard(CardDto card, Long workspaceListId, Long userId) {
        if (card.getDetails() != null) {
            if (card.getDetails().length() > 400) {
                throw new BadRequestException("Card details cannot exceed 400 characters");
            }
        }
        Card cardToUpdate = modelMapper.map(card, Card.class);

        WorkspaceList wl = this.workspaceListRepository.findById(workspaceListId)
                .orElseThrow(() -> new NotFoundException("Workspace list not found"));

        User user = this.userService.getCurrentlyLoggedInUser();

        if (wl.getUser().getId() != user.getId()) {
            throw new ForbiddenException("Cannot update another persons card");
        }

        cardToUpdate.setUser(user);
        cardToUpdate.setWorkspaceList(wl);
        cardToUpdate.setActiveLabels(this.activeLabelRepository.findActiveLabelsById(card.getId()));
        cardToUpdate.setChecklists(this.checklistRepository.getChecklists(card.getId()));

        this.cardRepository.save(cardToUpdate);

        this.activityRepository.save(
                new Activity(
                        user.getFirstName() + " " + user.getLastName() + " updated a card title to "
                                + cardToUpdate.getTitle() + "  in list " +
                                wl.getTitle(),
                        user, wl.getWorkspace()));

    }

    public CardDto createCard(String title, Long userId, Long workspaceListId, Integer index) {
        if (userId == null || workspaceListId == null) {
            throw new BadRequestException("Either user id or workspace list id is null");
        }

        User user = this.userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found creating card"));
        WorkspaceList workspaceList = this.workspaceListRepository.findById(workspaceListId)
                .orElseThrow(() -> new NotFoundException("Workspace Lis not found creating card"));

        if (workspaceList.getUser().getId() != this.userService.getCurrentlyLoggedInUser().getId()) {
            throw new ForbiddenException("Cannot create a card on another person's list");
        }

        int countOfCardsInList = this.cardRepository.checkCardLimit(user.getId(), workspaceList.getId());
        if (countOfCardsInList > 10) {
            throw new BadRequestException("You can only have 10 cards in a list for now.");
        }

        Card card = new Card(title, user, workspaceList);
        card.setIndex(index);
        this.cardRepository.save(card);
        List<ActiveLabelDto> emptyList = new ArrayList<>();

        this.activityRepository.save(
                new Activity(
                        user.getFirstName() + " " + user.getLastName() + " added a card in " + workspaceList.getTitle(),
                        user, workspaceList.getWorkspace()));
        return new CardDto(
                emptyList,
                card.getId(),
                card.getCreatedAt(),
                card.getUpdatedAt(),
                card.getLabel(),
                card.getColor(),
                card.getIndex(),
                card.getDetails(),
                card.getStartDate(),
                card.getEndDate(),
                card.getTitle(),
                null);

    }

    public void updateCardDates(Long cardId, String action, List<Timestamp> dates, Long workspaceUserId) {
        if (this.userService.getCurrentlyLoggedInUser().getId() != workspaceUserId) {
            throw new ForbiddenException("Cannot update dates of a card if you are not the owner");
        }
        Card card = this.cardRepository.findById(cardId).orElseThrow(() -> new NotFoundException("Card not found"));
        if (action.equalsIgnoreCase("add")) {

            card.setStartDate(dates.get(0));
            card.setEndDate(dates.get(1));
        } else {
            card.setStartDate(null);
            card.setEndDate(null);
        }

        this.cardRepository.save(card);
    }

    public void reorderCards(List<ReorderCardDto> data, Long workspaceUserId) {
        if (this.userService.getCurrentlyLoggedInUser().getId() != workspaceUserId) {
            throw new ForbiddenException("Cannot reorder another person's card");
        }

        List<Long> ids = data.stream().map(v -> v.getId()).toList();
        List<Card> cards = this.cardRepository.findAllByIdOrderByIndexASC(ids);

        for (int i = 0; i < data.size(); i++) {
            int index = i;
            Optional<ReorderCardDto> card = data.stream().filter(v -> v.getId() == cards.get(index).getId())
                    .findFirst();

            if (card.isPresent()) {
                cards.get(index).setIndex(card.get().getIndex());
                WorkspaceList wl = this.workspaceListRepository.findById(card.get().getWorkspaceListId())
                        .orElseThrow(() -> new NotFoundException("workspace list not found reordering cards"));
                cards.get(index).setWorkspaceList(wl);

            }
        }
        this.cardRepository.saveAll(cards);
    }

    public void updateCardCoverPhoto(Long cardId, String coverPhoto, Long workspaceUserId) {
        if (this.userService.getCurrentlyLoggedInUser().getId() != workspaceUserId) {
            throw new ForbiddenException("Only the owner of the workspace can update the cover photo of a card");
        }

        Card card = this.cardRepository.findById(cardId)
                .orElseThrow(() -> new NotFoundException("Card with id " + cardId + " not found"));

        card.setCoverPhoto(coverPhoto);

        this.cardRepository.save(card);

    }
}
