package com.hart.notitum.card.request;

import java.util.List;

import com.hart.notitum.card.dto.ReorderCardDto;

public class ReorderCardsRequest {
    private List<ReorderCardDto> data;

    public ReorderCardsRequest() {

    }

    public ReorderCardsRequest(List<ReorderCardDto> data) {
        this.data = data;
    }

    public List<ReorderCardDto> getData() {
        return data;
    }

    public void setData(List<ReorderCardDto> data) {
        this.data = data;
    }
}
