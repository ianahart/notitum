package com.hart.notitum.activity.request;

public class CreateActivityRequest {
    private String text;
    private Long userId;
    private Long workspaceId;

    public CreateActivityRequest() {

    }

    public CreateActivityRequest(String text, Long userId, Long workspaceId) {
        this.text = text;
        this.userId = userId;
        this.workspaceId = workspaceId;
    }

    public String getText() {
        return text;
    }

    public Long getWorkspaceId() {
        return workspaceId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setWorkspaceId(Long workspaceId) {
        this.workspaceId = workspaceId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
