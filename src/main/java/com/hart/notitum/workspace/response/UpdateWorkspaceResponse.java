package com.hart.notitum.workspace.response;

public class UpdateWorkspaceResponse {
    private String message;

    public UpdateWorkspaceResponse() {

    }

    public UpdateWorkspaceResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
