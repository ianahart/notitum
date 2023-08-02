package com.hart.notitum.card.response;

public class UpdateCardCoverPhotoResponse {

    private String message;

    public UpdateCardCoverPhotoResponse() {

    }

    public UpdateCardCoverPhotoResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
