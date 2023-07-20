package com.hart.notitum.card.response;

public class ReorderCardsResponse {
    private String message;

    public ReorderCardsResponse() {

    }

    public ReorderCardsResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
