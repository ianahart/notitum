package com.hart.notitum.user.response;

public class UpdateEmailResponse {
    private String message;

    public UpdateEmailResponse() {

    }

    public UpdateEmailResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
