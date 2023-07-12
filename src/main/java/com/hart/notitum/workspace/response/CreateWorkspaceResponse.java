package com.hart.notitum.workspace.response;

public class CreateWorkspaceResponse {
    private String message;
    private String title;
    private Long userId;

    public CreateWorkspaceResponse() {

    }

    public CreateWorkspaceResponse(String message, String title, Long userId) {
        this.message = message;
        this.title = title;
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public String getMessage() {
        return message;
    }

    public Long getUserId() {
        return userId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
