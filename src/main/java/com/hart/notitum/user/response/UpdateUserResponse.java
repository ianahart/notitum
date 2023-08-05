package com.hart.notitum.user.response;

public class UpdateUserResponse {
    private String message;

    public UpdateUserResponse() {

    }

    public UpdateUserResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
