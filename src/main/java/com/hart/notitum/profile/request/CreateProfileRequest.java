package com.hart.notitum.profile.request;

public class CreateProfileRequest {
    private Long userId;

    public CreateProfileRequest() {

    }

    public CreateProfileRequest(Long userId) {
        this.userId = userId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
