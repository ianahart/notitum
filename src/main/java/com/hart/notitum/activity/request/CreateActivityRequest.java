package com.hart.notitum.activity.request;

public class CreateActivityRequest {
    private String text;
    private Long userId;

    public CreateActivityRequest() {

    }

    public CreateActivityRequest(String text, Long userId) {
        this.text = text;
        this.userId = userId;
    }

    public String getText() {
        return text;
    }

    public Long getUserId() {
        return userId;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
