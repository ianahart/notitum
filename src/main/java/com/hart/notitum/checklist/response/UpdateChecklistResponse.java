package com.hart.notitum.checklist.response;

public class UpdateChecklistResponse {
    private String message;

    public UpdateChecklistResponse() {

    }

    public UpdateChecklistResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
