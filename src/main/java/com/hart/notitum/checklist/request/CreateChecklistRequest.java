package com.hart.notitum.checklist.request;

public class CreateChecklistRequest {
    private String title;
    private Long cardId;

    public CreateChecklistRequest() {

    }

    public CreateChecklistRequest(String title, Long cardId) {
        this.title = title;
        this.cardId = cardId;
    }

    public String getTitle() {
        return title;
    }

    public Long getCardId() {
        return cardId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }
}
