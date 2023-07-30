package com.hart.notitum.checklistitem;

import com.hart.notitum.advice.BadRequestException;
import com.hart.notitum.advice.ForbiddenException;
import com.hart.notitum.advice.NotFoundException;
import com.hart.notitum.checklist.ChecklistService;
import com.hart.notitum.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChecklistItemService {

    private final ChecklistItemRepository checklistItemRepository;
    private final UserService userService;
    private final ChecklistService checklistService;

    @Autowired
    public ChecklistItemService(
            ChecklistItemRepository checklistItemRepository,
            UserService userService,
            ChecklistService checklistService) {
        this.checklistItemRepository = checklistItemRepository;
        this.userService = userService;
        this.checklistService = checklistService;
    }

    public void deleteChecklistItem(Long checklistItemId, Long workspaceUserId) {
        if (this.userService.getCurrentlyLoggedInUser().getId() != workspaceUserId) {
            throw new ForbiddenException("Only the owner of the workspace can delete checklist items");
        }

        this.checklistItemRepository.deleteById(checklistItemId);

    }

    private int countChecklistItems(Long checklistId) {
        return this.checklistItemRepository.countChecklistItems(checklistId);
    }

    private void validateCreateChecklistItem(String checklistItemTitle, Long checklistId, Long userId) {
        if (checklistItemTitle.strip().length() == 0 || checklistItemTitle.length() > 255) {
            throw new BadRequestException("Checklist item must be between 1 and 255 characters");
        }
        if (checklistId == null) {
            throw new BadRequestException("checklistId is missing from request");
        }
        if (this.userService.getCurrentlyLoggedInUser().getId() != userId) {
            throw new ForbiddenException("Only the owner of the workspace can add a checklist item");
        }
    }

    public ChecklistItem createChecklistItem(String checklistItemTitle, Long checklistId, Long userId) {
        validateCreateChecklistItem(checklistItemTitle, checklistId, userId);
        if (countChecklistItems(checklistId) >= 10) {
            throw new BadRequestException("Can only have 10 checklist items per checklist for now");
        }

        ChecklistItem checklistItem = this.checklistItemRepository.save(new ChecklistItem(
                checklistItemTitle,
                false,
                this.userService.getCurrentlyLoggedInUser(),
                this.checklistService.getChecklistById(checklistId)));

        return checklistItem;
    }

    public void updateChecklistItem(Long checklistItemId, Boolean isComplete, Long userId) {
        if (this.userService.getCurrentlyLoggedInUser().getId() != userId) {
            throw new ForbiddenException("Only the owner of the workspace can update a check list item");
        }

        ChecklistItem checklistItem = this.checklistItemRepository.findById(checklistItemId)
                .orElseThrow(() -> new NotFoundException("Check list item not found"));

        checklistItem.setIsComplete(isComplete);
        this.checklistItemRepository.save(checklistItem);
    }
}
