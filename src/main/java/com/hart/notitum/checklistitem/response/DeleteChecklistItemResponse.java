package com.hart.notitum.checklistitem.response;

public class DeleteChecklistItemResponse {
    private String message;

    public DeleteChecklistItemResponse() {

    }

    public DeleteChecklistItemResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
