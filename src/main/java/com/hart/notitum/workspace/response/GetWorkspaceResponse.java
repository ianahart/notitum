package com.hart.notitum.workspace.response;

import com.hart.notitum.workspace.dto.WorkspaceDto;

public class GetWorkspaceResponse {
    private String message;
    private WorkspaceDto workspace;

    public GetWorkspaceResponse() {

    }

    public GetWorkspaceResponse(String message, WorkspaceDto workspace) {
        this.message = message;
        this.workspace = workspace;
    }

    public String getMessage() {
        return message;
    }

    public WorkspaceDto getWorkspace() {
        return workspace;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setWorkspace(WorkspaceDto workspace) {
        this.workspace = workspace;
    }
}
