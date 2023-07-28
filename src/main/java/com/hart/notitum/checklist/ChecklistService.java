package com.hart.notitum.checklist;

import java.util.FormatterClosedException;
import java.util.List;

import com.hart.notitum.activity.ActivityService;
import com.hart.notitum.advice.BadRequestException;
import com.hart.notitum.advice.ForbiddenException;
import com.hart.notitum.advice.NotFoundException;
import com.hart.notitum.card.Card;
import com.hart.notitum.card.CardService;
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

    public void updateChecklist(Long checklistId, String title, Long workspaceId) {
        if (workspaceService.getWorkspaceById(workspaceId).getUser().getId() != this.userService
                .getCurrentlyLoggedInUser().getId()) {
            throw new ForbiddenException("Only the owner of the workspace can update a checklists's title");
        }

        Checklist checklist = this.checklistRepository.findById(checklistId)
                .orElseThrow(() -> new NotFoundException("Checklist not found"));

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
        List<Checklist> checklists = this.checklistRepository.getChecklists(cardId);

        return checklists;
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

    public void createChecklist(String title, Long cardId) {
        if (countChecklists(cardId) >= 10) {
            throw new BadRequestException("Can only have 10 checklists per card");
        }
        validateChecklist(title, cardId);
        User user = this.userService.getCurrentlyLoggedInUser();
        Card card = this.cardService.getCardById(cardId);

        if (user.getId() != card.getUser().getId()) {
            throw new ForbiddenException("Cannot create a checklist on another person's workspace card");
        }

        this.checklistRepository.save(new Checklist(title, false, card, user));
        this.activityService.createActivity(createChecklistActivity(user, card, title), user.getId(),
                card.getWorkspaceList().getWorkspace().getId());
    }
}
