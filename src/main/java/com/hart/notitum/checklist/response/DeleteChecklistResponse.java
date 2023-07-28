package com.hart.notitum.checklist.response;

public class DeleteChecklistResponse {
    private String message;

    public DeleteChecklistResponse() {

    }

    public DeleteChecklistResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
