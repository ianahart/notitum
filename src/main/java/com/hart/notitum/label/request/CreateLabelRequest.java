package com.hart.notitum.label.request;

public class CreateLabelRequest {

    private Long workspaceId;
    private Long cardId;
    private String color;
    private String title;

    public CreateLabelRequest() {

    }

    public CreateLabelRequest(
            Long workspaceId,
            Long cardId,
            String color,
            String title) {
        this.workspaceId = workspaceId;
        this.cardId = cardId;
        this.color = color;
        this.title = title;
    }

    public String getColor() {
        return color;
    }

    public String getTitle() {
        return title;
    }

    public Long getWorkspaceId() {
        return workspaceId;
    }

    public Long getCardId() {
        return cardId;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }

    public void setWorkspaceId(Long workspaceId) {
        this.workspaceId = workspaceId;
    }
}
