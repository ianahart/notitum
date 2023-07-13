package com.hart.notitum.workspace.response;

public class CreateWorkspaceResponse {
    private String message;
    private String title;
    private Long userId;
    private Long workspaceId;

    public CreateWorkspaceResponse() {

    }

    public CreateWorkspaceResponse(String message, String title, Long userId, Long workspaceId) {
        this.message = message;
        this.title = title;
        this.userId = userId;
        this.workspaceId = workspaceId;
    }

    public String getTitle() {
        return title;
    }

    public String getMessage() {
        return message;
    }

    public Long getWorkspaceId() {
        return workspaceId;
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

    public void setWorkspaceId(Long workspaceId) {
        this.workspaceId = workspaceId;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
