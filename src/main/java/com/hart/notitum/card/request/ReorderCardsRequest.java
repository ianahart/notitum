package com.hart.notitum.card.request;

import java.util.List;

import com.hart.notitum.card.dto.ReorderCardDto;

public class ReorderCardsRequest {
    private List<ReorderCardDto> data;
    private Long workspaceUserId;

    public ReorderCardsRequest() {

    }

    public ReorderCardsRequest(List<ReorderCardDto> data, Long workspaceUserId) {
        this.data = data;
        this.workspaceUserId = workspaceUserId;
    }

    public List<ReorderCardDto> getData() {
        return data;
    }

    public Long getWorkspaceUserId() {
        return workspaceUserId;
    }

    public void setWorkspaceUserId(Long workspaceUserId) {
        this.workspaceUserId = workspaceUserId;
    }

    public void setData(List<ReorderCardDto> data) {
        this.data = data;
    }
}
