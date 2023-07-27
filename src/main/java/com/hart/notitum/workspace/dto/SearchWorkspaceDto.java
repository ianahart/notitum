package com.hart.notitum.workspace.dto;

import java.sql.Timestamp;

import com.hart.notitum.workspace.Visibility;

public class SearchWorkspaceDto {
    private Long workspaceId;
    private String background;
    private String title;
    private Visibility visibility;
    private Long userId;

    public SearchWorkspaceDto() {

    }

    public SearchWorkspaceDto(
            Long workspaceId,
            String background,
            String title,
            Visibility visibility,
            Long userId) {

        this.workspaceId = workspaceId;
        this.background = background;
        this.title = title;
        this.visibility = visibility;
        this.userId = userId;
    }

    public Long getWorkspaceId() {
        return workspaceId;
    }

    public String getTitle() {
        return title;
    }

    public Long getUserId() {
        return userId;
    }

    public String getBackground() {
        return background;
    }

    public Visibility getVisibility() {
        return visibility;
    }

    public void setWorkspaceId(Long workspaceId) {
        this.workspaceId = workspaceId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setVisibility(Visibility visibility) {
        this.visibility = visibility;
    }

    public void setBackground(String background) {
        this.background = background;
    }
}
