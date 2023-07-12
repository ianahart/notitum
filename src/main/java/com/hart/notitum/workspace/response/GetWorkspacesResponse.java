package com.hart.notitum.workspace.response;

import java.util.List;

import com.hart.notitum.workspace.dto.WorkspaceDto;

public class GetWorkspacesResponse {
    private String message;
    private List<WorkspaceDto> workspaces;

    public GetWorkspacesResponse() {

    }

    public GetWorkspacesResponse(String message, List<WorkspaceDto> workspaces) {
        this.message = message;
        this.workspaces = workspaces;
    }

    public String getMessage() {
        return message;
    }

    public List<WorkspaceDto> getWorkspaces() {
        return workspaces;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setWorkspaces(List<WorkspaceDto> workspaces) {
        this.workspaces = workspaces;
    }
}
