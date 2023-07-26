package com.hart.notitum.activelabel.response;

import java.util.List;

import com.hart.notitum.activelabel.dto.ActiveLabelDto;

public class GetActiveLabelsResponse {
    private String message;
    private List<ActiveLabelDto> data;

    public GetActiveLabelsResponse() {

    }

    public GetActiveLabelsResponse(String message, List<ActiveLabelDto> data) {
        this.message = message;
        this.data = data;
    }

    public List<ActiveLabelDto> getData() {
        return data;
    }

    public String getMessage() {
        return message;
    }

    public void setData(List<ActiveLabelDto> data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
