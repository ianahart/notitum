package com.hart.notitum.checklistitem;

import com.hart.notitum.checklistitem.request.CreateChecklistItemRequest;
import com.hart.notitum.checklistitem.request.UpdateChecklistItemRequest;
import com.hart.notitum.checklistitem.response.CreateChecklistItemResponse;
import com.hart.notitum.checklistitem.response.UpdateChecklistItemResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/checklist-items")
public class ChecklistItemController {

    private final ChecklistItemService checklistItemService;

    @Autowired
    public ChecklistItemController(ChecklistItemService checklistItemService) {
        this.checklistItemService = checklistItemService;
    }

    @PatchMapping("/{checklistItemId}")
    public ResponseEntity<UpdateChecklistItemResponse> updateChecklistItem(
            @PathVariable("checklistItemId") Long checklistItemId,
            @RequestBody UpdateChecklistItemRequest request) {
        this.checklistItemService.updateChecklistItem(checklistItemId, request.getIsComplete(), request.getUserId());
        return ResponseEntity.status(HttpStatus.OK)
                .body(new UpdateChecklistItemResponse("success"));
    }

    @PostMapping
    public ResponseEntity<CreateChecklistItemResponse> createChecklistItem(
            @RequestBody CreateChecklistItemRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new CreateChecklistItemResponse("success",
                        this.checklistItemService.createChecklistItem(request.getChecklistItemTitle(),
                                request.getChecklistId(),
                                request.getUserId())));
    }
}
