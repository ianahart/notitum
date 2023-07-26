package com.hart.notitum.card.response;

public class DeleteCardResponse {
    private String message;

    public DeleteCardResponse() {

    }

    public DeleteCardResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
