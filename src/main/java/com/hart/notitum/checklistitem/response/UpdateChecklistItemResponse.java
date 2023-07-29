package com.hart.notitum.checklistitem.response;

public class UpdateChecklistItemResponse {
    private String message;

    public UpdateChecklistItemResponse() {

    }

    public UpdateChecklistItemResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
