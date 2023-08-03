package com.hart.notitum.profile.response;

public class CreateProfileResponse {
    private String message;

    public CreateProfileResponse() {

    }

    public CreateProfileResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
