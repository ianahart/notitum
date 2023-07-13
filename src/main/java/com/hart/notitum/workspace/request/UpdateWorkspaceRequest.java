package com.hart.notitum.workspace.request;

import java.sql.Timestamp;

import com.hart.notitum.workspace.Visibility;

public class UpdateWorkspaceRequest {

    private String background;
    private Timestamp createdAt;
    private Boolean isStarred;
    private String title;
    private Timestamp updatedAt;
    private Long userId;
    private Visibility visibility;
    private Long workspaceId;

    public UpdateWorkspaceRequest() {

    }

    public UpdateWorkspaceRequest(
            String background,
            Timestamp createdAt,
            Boolean isStarred,
            String title,
            Timestamp updatedAt,
            Long userId,
            Visibility visibility,
            Long workspaceId) {
        this.background = background;
        this.createdAt = createdAt;
        this.isStarred = isStarred;
        this.title = title;
        this.updatedAt = updatedAt;
        this.userId = userId;
        this.visibility = visibility;
        this.workspaceId = workspaceId;
    }

    public String getTitle() {
        return title;
    }

    public Long getUserId() {
        return userId;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Boolean getIsStarred() {
        return isStarred;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public String getBackground() {
        return background;
    }

    public Visibility getVisibility() {
        return visibility;
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

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setIsStarred(Boolean isStarred) {
        this.isStarred = isStarred;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setBackground(String background) {
        this.background = background;
    }

    public void setVisibility(Visibility visibility) {
        this.visibility = visibility;
    }

    public void setWorkspaceId(Long workspaceId) {
        this.workspaceId = workspaceId;
    }

}
