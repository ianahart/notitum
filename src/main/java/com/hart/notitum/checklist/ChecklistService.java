package com.hart.notitum.checklist;

import java.util.List;
import java.util.ArrayList;

import com.hart.notitum.activity.ActivityService;
import com.hart.notitum.advice.BadRequestException;
import com.hart.notitum.advice.ForbiddenException;
import com.hart.notitum.advice.NotFoundException;
import com.hart.notitum.card.Card;
import com.hart.notitum.card.CardService;
import com.hart.notitum.checklist.dto.ChecklistWithItemsDto;
import com.hart.notitum.checklistitem.ChecklistItem;
import com.hart.notitum.user.User;
import com.hart.notitum.user.UserService;
import com.hart.notitum.workspace.Workspace;
import com.hart.notitum.workspace.WorkspaceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChecklistService {

    private final UserService userService;
    private final ChecklistRepository checklistRepository;
    private final CardService cardService;
    private final ActivityService activityService;
    private final WorkspaceService workspaceService;

    @Autowired
    public ChecklistService(
            UserService userService,
            ChecklistRepository checklistRepository,
            CardService cardService,
            ActivityService activityService,
            WorkspaceService workspaceService) {
        this.userService = userService;
        this.checklistRepository = checklistRepository;
        this.cardService = cardService;
        this.activityService = activityService;
        this.workspaceService = workspaceService;
    }

    public Checklist getChecklistById(Long checklistId) {
        return this.checklistRepository.findById(checklistId)
                .orElseThrow(() -> new NotFoundException("Checklist with id " + checklistId + " not found"));
    }

    private String updateChecklistActivity(String title, String curTitle, User user) {
        return user.getFirstName() + " " + user.getLastName() + " updated checklist title from " + curTitle + " to "
                + title;
    }

    public void updateChecklist(Long checklistId, String title, Long workspaceId) {
        User user = this.userService.getCurrentlyLoggedInUser();
        if (workspaceService.getWorkspaceById(workspaceId).getUser().getId() != user.getId()) {
            throw new ForbiddenException("Only the owner of the workspace can update a checklists's title");
        }

        Checklist checklist = this.checklistRepository.findById(checklistId)
                .orElseThrow(() -> new NotFoundException("Checklist not found"));

        this.activityService.createActivity(updateChecklistActivity(title, checklist.getTitle(), user), user.getId(),
                workspaceId);
        checklist.setTitle(title);

        this.checklistRepository.save(checklist);

    }

    public void deleteChecklist(Long checklistId, Long workspaceId) {
        Workspace workspace = this.workspaceService.getWorkspaceById(workspaceId);
        if (this.userService.getCurrentlyLoggedInUser().getId() != workspace.getUser().getId()) {
            throw new ForbiddenException("Only the owner of the workspace can delete checklists");
        }

        this.checklistRepository.deleteById(checklistId);
    }

    public List<Checklist> getChecklists(Long cardId) {
        if (cardId == null) {
            throw new BadRequestException("Card id was not present in the request");
        }
        List<Checklist> results = this.checklistRepository.getChecklists(cardId);
        for (Checklist x : results) {
            x.setChecklistItems(x.getChecklistItems());
        }
        return results;
    }

    private void validateChecklist(String title, Long cardId) {
        if (title.length() > 255) {
            throw new BadRequestException("Title cannot exceed 255 characters");
        }
        if (cardId == null) {
            throw new BadRequestException("Card id was not found creating checklist");
        }
    }

    private String createChecklistActivity(User user, Card card, String title) {
        return user.getFirstName() + " " + user.getLastName() + " created a checklist " + title
                + " in workspace list " + card.getWorkspaceList().getTitle();
    }

    private int countChecklists(Long cardId) {
        return this.checklistRepository.countChecklists(cardId);
    }

    public Checklist createChecklist(String title, Long cardId) {
        if (countChecklists(cardId) >= 10) {
            throw new BadRequestException("Can only have 10 checklists per card");
        }
        validateChecklist(title, cardId);
        User user = this.userService.getCurrentlyLoggedInUser();
        Card card = this.cardService.getCardById(cardId);

        if (user.getId() != card.getUser().getId()) {
            throw new ForbiddenException("Cannot create a checklist on another person's workspace card");
        }

        Checklist checklist = new Checklist(title, false, card, user);
        this.checklistRepository.save(checklist);
        this.activityService.createActivity(createChecklistActivity(user, card, title), user.getId(),
                card.getWorkspaceList().getWorkspace().getId());
        List<ChecklistItem> checklistItems = new ArrayList<>();
        checklist.setChecklistItems(checklistItems);
        return checklist;
    }
}
