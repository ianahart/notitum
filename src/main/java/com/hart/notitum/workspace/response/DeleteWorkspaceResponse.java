package com.hart.notitum.workspace.response;

public class DeleteWorkspaceResponse {
    private String message;

    public DeleteWorkspaceResponse() {

    }

    public DeleteWorkspaceResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
