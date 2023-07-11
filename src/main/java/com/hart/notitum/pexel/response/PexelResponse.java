package com.hart.notitum.pexel.response;

import java.util.List;

public class PexelResponse {

    private String message;
    private List<String> photos;

    public PexelResponse() {

    }

    public PexelResponse(String message, List<String> photos) {
        this.message = message;
        this.photos = photos;
    }

    public List<String> getPhotos() {
        return photos;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setPhotos(List<String> photos) {
        this.photos = photos;
    }
}
