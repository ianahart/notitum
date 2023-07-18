package com.hart.notitum.list;

import com.hart.notitum.list.request.CreateWorkspaceListRequest;
import com.hart.notitum.list.request.ReorderWorkspaceListRequest;
import com.hart.notitum.list.response.CreateWorkspaceListResponse;
import com.hart.notitum.list.response.GetWorkspaceListsResponse;
import com.hart.notitum.list.response.UpdateWorkspaceListResponse;
import com.hart.notitum.list.request.UpdateWorkspaceListRequest;
import com.hart.notitum.list.response.WorkspaceListReorderResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/lists")
public class WorkspaceListController {

    private final WorkspaceListService workspaceListService;

    @Autowired
    public WorkspaceListController(WorkspaceListService workspaceListService) {
        this.workspaceListService = workspaceListService;
    }

    @PostMapping("/reorder")
    public ResponseEntity<WorkspaceListReorderResponse> reorderWorkspaceLists(
            @RequestBody ReorderWorkspaceListRequest request) {

        this.workspaceListService.reorderWorkspaceLists(request.getData());

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new WorkspaceListReorderResponse("success"));
    }

    @GetMapping
    public ResponseEntity<GetWorkspaceListsResponse> getWorkspaceLists(
            @RequestParam("userId") Long userId, @RequestParam("workspaceId") Long workspaceId) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GetWorkspaceListsResponse("success",
                        this.workspaceListService.getWorkspaceLists(userId, workspaceId)));
    }

    @PostMapping
    public ResponseEntity<CreateWorkspaceListResponse> createWorkspaceList(
            @RequestBody CreateWorkspaceListRequest request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new CreateWorkspaceListResponse("success",
                        this.workspaceListService.createWorkspaceList(request)));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UpdateWorkspaceListResponse> updateWorkspaceList(
            @RequestBody UpdateWorkspaceListRequest request, @PathVariable("id") Long id) {
        this.workspaceListService.updateWorkspaceList(request.getWorkspaceList(), id, request.getWorkspaceId());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new UpdateWorkspaceListResponse("success"));
    }
}
