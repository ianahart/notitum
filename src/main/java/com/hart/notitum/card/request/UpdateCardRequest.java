package com.hart.notitum.card.request;

import com.hart.notitum.card.Card;
import com.hart.notitum.card.dto.CardDto;

public class UpdateCardRequest {
    private CardDto card;
    private Long workspaceListId;
    private Long userId;

    public UpdateCardRequest() {

    }

    public UpdateCardRequest(CardDto card, Long workspaceListId, Long userId) {
        this.card = card;
        this.workspaceListId = workspaceListId;
        this.userId = userId;
    }

    public CardDto getCard() {
        return card;
    }

    public Long getWorkspaceListId() {
        return workspaceListId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setCard(CardDto card) {
        this.card = card;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setWorkspaceListId(Long workspaceListId) {
        this.workspaceListId = workspaceListId;
    }
}
