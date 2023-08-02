package com.hart.notitum.card.request;

public class UpdateCardCoverPhotoRequest {
    private String coverPhoto;
    private Long workspaceUserId;
    private String action;

    public UpdateCardCoverPhotoRequest() {

    }

    public UpdateCardCoverPhotoRequest(String coverPhoto, Long workspaceUserId, String action) {
        this.coverPhoto = coverPhoto;
        this.workspaceUserId = workspaceUserId;
        this.action = action;
    }

    public String getCoverPhoto() {
        return coverPhoto;
    }

    public String getAction() {
        return action;
    }

    public Long getWorkspaceUserId() {
        return workspaceUserId;
    }

    public void setCoverPhoto(String coverPhoto) {
        this.coverPhoto = coverPhoto;
    }

    public void setWorkspaceUserId(Long workspaceUserId) {
        this.workspaceUserId = workspaceUserId;
    }

    public void setAction(String action) {
        this.action = action;
    }

}
