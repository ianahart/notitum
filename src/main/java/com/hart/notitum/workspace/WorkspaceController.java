package com.hart.notitum.workspace;

import com.hart.notitum.workspace.request.CreateWorkspaceRequest;
import com.hart.notitum.workspace.request.UpdateWorkspaceRequest;
import com.hart.notitum.workspace.response.CreateWorkspaceResponse;
import com.hart.notitum.workspace.response.GetWorkspaceResponse;
import com.hart.notitum.workspace.response.GetWorkspacesResponse;
import com.hart.notitum.workspace.response.SearchWorkspacesResponse;
import com.hart.notitum.workspace.response.UpdateWorkspaceResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/workspaces")
public class WorkspaceController {

    private final WorkspaceService workspaceService;

    @Autowired
    public WorkspaceController(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
    }

    @GetMapping("/search")
    public ResponseEntity<SearchWorkspacesResponse> searchWorkspaces(
            @RequestParam("query") String query,
            @RequestParam("pageSize") int pageSize,
            @RequestParam("page") int page,
            @RequestParam("direction") String direction,
            @RequestParam("userId") Long userId) {

        return ResponseEntity.status(HttpStatus.OK).body(new SearchWorkspacesResponse("success",
                this.workspaceService.searchWorkspaces(query, pageSize, page, direction, userId)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetWorkspaceResponse> getWorkspace(@PathVariable("id") Long id,
            @RequestParam("userId") Long userId) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                        new GetWorkspaceResponse("success", this.workspaceService.getWorkspace(id, userId)));
    }

    @GetMapping
    public ResponseEntity<GetWorkspacesResponse> getWorkspaces(@RequestParam("userId") Long userId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GetWorkspacesResponse("success", this.workspaceService.getWorkspaces(userId)));
    }

    @GetMapping("/starred")
    public ResponseEntity<GetWorkspacesResponse> getStarredWorkspaces(@RequestParam("userId") Long userId,
            @RequestParam("isStarred") boolean isStarred) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GetWorkspacesResponse("success",
                        this.workspaceService.getStarredWorkspaces(userId, isStarred)));
    }

    @GetMapping("/recent")
    public ResponseEntity<GetWorkspacesResponse> getRecentWorkspaces(@RequestParam("userId") Long userId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GetWorkspacesResponse("success", this.workspaceService.getRecentWorkspaces(userId)));
    }

    @PostMapping
    public ResponseEntity<CreateWorkspaceResponse> createWorkSpace(@RequestBody CreateWorkspaceRequest request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(this.workspaceService.createWorkSpace(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UpdateWorkspaceResponse> updateWorkspace(@RequestBody UpdateWorkspaceRequest request,
            @PathVariable("id") Long id) {
        this.workspaceService.updateWorkspace(request, id);
        return ResponseEntity.status(HttpStatus.OK).body(new UpdateWorkspaceResponse("success"));
    }
}
