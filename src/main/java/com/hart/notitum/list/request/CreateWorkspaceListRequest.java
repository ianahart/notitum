package com.hart.notitum.list.request;

public class CreateWorkspaceListRequest {
    private Long userId;
    private Long workspaceId;
    private String title;
    private Integer index;

    public CreateWorkspaceListRequest() {

    }

    public CreateWorkspaceListRequest(Long userId, Long workspaceId, String title, Integer index) {
        this.userId = userId;
        this.workspaceId = workspaceId;
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

    public Long getWorkspaceId() {
        return workspaceId;
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

    public void setIndex(Integer index) {
        this.index = index;
    }
}
