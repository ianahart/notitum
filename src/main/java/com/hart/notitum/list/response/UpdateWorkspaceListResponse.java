package com.hart.notitum.list.response;

public class UpdateWorkspaceListResponse {
    private String message;

    public UpdateWorkspaceListResponse() {

    }

    public UpdateWorkspaceListResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
