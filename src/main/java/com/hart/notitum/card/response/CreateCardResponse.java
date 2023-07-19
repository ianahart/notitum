package com.hart.notitum.card.response;

public class CreateCardResponse {
    private String message;

    public CreateCardResponse() {

    }

    public CreateCardResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
