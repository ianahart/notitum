package com.hart.notitum.checklist;

import com.hart.notitum.checklist.request.CreateChecklistRequest;
import com.hart.notitum.checklist.request.UpdateChecklistRequest;
import com.hart.notitum.checklist.response.CreateChecklistResponse;
import com.hart.notitum.checklist.response.DeleteChecklistResponse;
import com.hart.notitum.checklist.response.GetChecklistsResponse;
import com.hart.notitum.checklist.response.UpdateChecklistResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/checklists")
public class ChecklistController {

    private final ChecklistService checklistService;

    @Autowired
    public ChecklistController(ChecklistService checklistService) {
        this.checklistService = checklistService;
    }

    @PatchMapping("/{checklistId}")
    public ResponseEntity<UpdateChecklistResponse> updateChecklist(@PathVariable("checklistId") Long checklistId,
            @RequestBody UpdateChecklistRequest request) {

        this.checklistService.updateChecklist(checklistId, request.getTitle(),
                request.getWorkspaceId());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new UpdateChecklistResponse("success"));
    }

    @DeleteMapping("/{checklistId}")
    public ResponseEntity<DeleteChecklistResponse> deleteChecklist(
            @PathVariable("checklistId") Long checklistId,
            @RequestParam("workspaceId") Long workspaceId) {
        this.checklistService.deleteChecklist(checklistId, workspaceId);
        return ResponseEntity.status(HttpStatus.OK).body(new DeleteChecklistResponse("success"));
    }

    @GetMapping
    public ResponseEntity<GetChecklistsResponse> getChecklists(@RequestParam("cardId") Long cardId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new GetChecklistsResponse("success", this.checklistService.getChecklists(cardId)));
    }

    @PostMapping
    public ResponseEntity<CreateChecklistResponse> createChecklist(@RequestBody CreateChecklistRequest request) {
        this.checklistService.createChecklist(request.getTitle(), request.getCardId());
        return ResponseEntity.status(HttpStatus.CREATED).body(new CreateChecklistResponse("success"));
    }
}
