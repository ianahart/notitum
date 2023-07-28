package com.hart.notitum.checklist.response;

public class CreateChecklistResponse {
    private String message;

    public CreateChecklistResponse() {

    }

    public CreateChecklistResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
