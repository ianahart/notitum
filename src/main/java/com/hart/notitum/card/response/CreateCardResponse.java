package com.hart.notitum.card.response;

import com.hart.notitum.card.dto.CardDto;

public class CreateCardResponse {
    private String message;
    private CardDto data;

    public CreateCardResponse() {

    }

    public CreateCardResponse(String message, CardDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public CardDto getData() {
        return data;
    }

    public void setData(CardDto data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
