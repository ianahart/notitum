package com.hart.notitum.card.request;

public class CreateCardRequest {
    private Long workspaceListId;
    private Long userId;
    private String title;
    private Integer index;

    public CreateCardRequest() {

    }

    public CreateCardRequest(Long workspaceListId, Long userId, String title, Integer index) {
        this.workspaceListId = workspaceListId;
        this.userId = userId;
        this.title = title;
        this.index = index;
    }

    public String getTitle() {
        return title;
    }

    public Integer getIndex() {
        return index;
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

    public void setIndex(Integer index) {
        this.index = index;
    }

    public void setWorkspaceListId(Long workspaceListId) {
        this.workspaceListId = workspaceListId;
    }
}
