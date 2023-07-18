package com.hart.notitum.list.response;

public class DeleteWorkspaceListResponse {
    private String message;

    public DeleteWorkspaceListResponse() {

    }

    public DeleteWorkspaceListResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
