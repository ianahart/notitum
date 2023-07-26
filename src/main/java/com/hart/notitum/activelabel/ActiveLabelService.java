package com.hart.notitum.activelabel;

import com.hart.notitum.label.Label;
import com.hart.notitum.label.LabelRepository;
import com.hart.notitum.user.UserService;
import com.hart.notitum.advice.NotFoundException;
import com.hart.notitum.card.Card;
import com.hart.notitum.card.CardRepository;

import java.util.List;

import com.hart.notitum.activelabel.dto.ActiveLabelDto;
import com.hart.notitum.advice.BadRequestException;
import com.hart.notitum.advice.ForbiddenException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActiveLabelService {

    private final ActiveLabelRepository activeLabelRepository;
    private final LabelRepository labelRepository;
    private final CardRepository cardRepository;
    private final UserService userService;

    @Autowired
    public ActiveLabelService(
            ActiveLabelRepository activeLabelRepository,
            LabelRepository labelRepository,
            CardRepository cardRepository,
            UserService userService) {
        this.activeLabelRepository = activeLabelRepository;
        this.labelRepository = labelRepository;
        this.cardRepository = cardRepository;
        this.userService = userService;
    }

    public void deleteActiveLabel(Long id, Long cardId) {
        Card card = this.cardRepository.findById(cardId)
                .orElseThrow(() -> new NotFoundException("card not found deleting active label"));

        if (card.getUser().getId() != this.userService.getCurrentlyLoggedInUser().getId()) {
            throw new ForbiddenException("Only owner of workspace can remove labels");
        }

        this.activeLabelRepository.deleteById(id);
    }

    public List<ActiveLabelDto> getActiveLabels(Long cardId) {
        if (cardId == null) {
            throw new BadRequestException("cardId missing from getting active label request");
        }
        return this.activeLabelRepository.getActiveLabels(cardId);
    }

    private boolean checkIfActiveLabelExists(Long labelId, Long cardId) {
        return this.activeLabelRepository.checkIfActiveLabelExists(labelId, cardId) == null ? false : true;
    }

    public ActiveLabelDto createActiveLabel(Long labelId, Boolean checked, Long cardId) {
        Card card = this.cardRepository.findById(cardId)
                .orElseThrow(() -> new NotFoundException("Card not found creating active label"));

        if (this.userService.getCurrentlyLoggedInUser().getId() != card.getUser().getId()) {
            throw new ForbiddenException("Only the owner of the workspace can add and remove labels");
        }

        Label label = this.labelRepository.findById(labelId)
                .orElseThrow(() -> new NotFoundException("Label not found creating active label"));
        if (!checked) {
            throw new BadRequestException("Label is not checked");
        }

        if (checkIfActiveLabelExists(label.getId(), card.getId())) {
            throw new BadRequestException("You have already added this label to this card");
        }

        ActiveLabel activeLabel = this.activeLabelRepository.save(new ActiveLabel(label, card));

        return new ActiveLabelDto(activeLabel.getId(), checked, label.getTitle(), label.getColor(),
                activeLabel.getCreatedAt(), label.getId());

    }
}
