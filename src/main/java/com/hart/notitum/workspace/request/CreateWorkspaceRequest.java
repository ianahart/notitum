package com.hart.notitum.workspace.request;

public class CreateWorkspaceRequest {
    private String background;
    private String title;
    private String visibility;
    private Long userId;

    public CreateWorkspaceRequest() {

    }

    public CreateWorkspaceRequest(
            String background,
            String title,
            String visibility,
            Long userId) {
        this.background = background;
        this.title = title;
        this.visibility = visibility;
        this.userId = userId;
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

    public String getVisibility() {
        return visibility;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setBackground(String background) {
        this.background = background;
    }

    public void setVisibility(String visibility) {
        this.visibility = visibility;
    }
}
