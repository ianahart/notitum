package com.hart.notitum.workspace.dto;

import java.sql.Timestamp;

import com.hart.notitum.workspace.Visibility;

public class WorkspaceDto {
    private Long workspaceId;
    private String background;
    private Timestamp createdAt;
    private String title;
    private Visibility visibility;
    private Long userId;
    private Timestamp updatedAt;
    private Boolean isStarred;
    private String description;

    public WorkspaceDto() {

    }

    public WorkspaceDto(
            Long workspaceId,
            String background,
            Timestamp createdAt,
            String title,
            Visibility visibility,
            Long userId,
            Timestamp updatedAt,
            Boolean isStarred,
            String description) {

        this.workspaceId = workspaceId;
        this.background = background;
        this.createdAt = createdAt;
        this.title = title;
        this.visibility = visibility;
        this.userId = userId;
        this.updatedAt = updatedAt;
        this.isStarred = isStarred;
        this.description = description;
    }

    public Long getWorkspaceId() {
        return workspaceId;
    }

    public String getDescription() {
        return description;
    }

    public Boolean getIsStarred() {
        return isStarred;
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

    public String getBackground() {
        return background;
    }

    public Visibility getVisibility() {
        return visibility;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setIsStarred(Boolean isStarred) {
        this.isStarred = isStarred;
    }

    public void setWorkspaceId(Long workspaceId) {
        this.workspaceId = workspaceId;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
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

    public void setVisibility(Visibility visibility) {
        this.visibility = visibility;
    }

    public void setBackground(String background) {
        this.background = background;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
