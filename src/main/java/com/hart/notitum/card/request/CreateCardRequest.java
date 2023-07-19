package com.hart.notitum.card.request;

public class CreateCardRequest {
    private Long workspaceListId;
    private Long userId;
    private String title;

    public CreateCardRequest() {

    }

    public CreateCardRequest(Long workspaceListId, Long userId, String title) {
        this.workspaceListId = workspaceListId;
        this.userId = userId;
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getWorkspaceListId() {
        return workspaceListId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setWorkspaceListId(Long workspaceListId) {
        this.workspaceListId = workspaceListId;
    }
}
