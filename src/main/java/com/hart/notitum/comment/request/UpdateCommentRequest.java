package com.hart.notitum.comment.request;

public class UpdateCommentRequest {
    private String text;
    private Long userId;
    private Long cardId;
    private Long workspaceId;

    public UpdateCommentRequest() {

    }

    public UpdateCommentRequest(
            String text,
            Long userId,
            Long cardId,
            Long workspaceId) {

        this.text = text;
        this.userId = userId;
        this.cardId = cardId;
        this.workspaceId = workspaceId;
    }

    public String getText() {
        return text;
    }

    public Long getCardId() {
        return cardId;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getWorkspaceId() {
        return workspaceId;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setWorkspaceId(Long workspaceId) {
        this.workspaceId = workspaceId;
    }
}
