package com.hart.notitum.comment.request;

public class CreateCommentRequest {
    private String comment;
    private Long userId;
    private Long cardId;
    private Long workspaceId;

    public CreateCommentRequest() {

    }

    public CreateCommentRequest(
            String comment,
            Long userId,
            Long cardId,
            Long workspaceId) {
        this.comment = comment;
        this.userId = userId;
        this.cardId = cardId;
        this.workspaceId = workspaceId;
    }

    public Long getCardId() {
        return cardId;
    }

    public Long getUserId() {
        return userId;
    }

    public String getComment() {
        return comment;
    }

    public Long getWorkspaceId() {
        return workspaceId;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setWorkspaceId(Long workspaceId) {
        this.workspaceId = workspaceId;
    }
}
