package com.hart.notitum.card.response;

public class UpdateCardResponse {
    private String message;

    public UpdateCardResponse() {

    }

    public UpdateCardResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
