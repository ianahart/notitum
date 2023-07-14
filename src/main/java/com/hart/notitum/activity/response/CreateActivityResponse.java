package com.hart.notitum.activity.response;

public class CreateActivityResponse {
    private String message;

    public CreateActivityResponse() {

    }

    public CreateActivityResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
