package com.hart.notitum.card.response;

import java.util.List;

import com.hart.notitum.list.dto.FilterWorkspaceListCardsDto;

public class FilterCardsResponse {
    private String message;
    private List<FilterWorkspaceListCardsDto> data;

    public FilterCardsResponse() {

    }

    public FilterCardsResponse(String message, List<FilterWorkspaceListCardsDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public List<FilterWorkspaceListCardsDto> getData() {
        return data;
    }

    public void setData(List<FilterWorkspaceListCardsDto> data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
