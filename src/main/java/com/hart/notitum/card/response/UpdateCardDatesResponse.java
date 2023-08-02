package com.hart.notitum.card.response;

public class UpdateCardDatesResponse {

    private String message;

    public UpdateCardDatesResponse() {

    }

    public UpdateCardDatesResponse(String message) {
          this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
