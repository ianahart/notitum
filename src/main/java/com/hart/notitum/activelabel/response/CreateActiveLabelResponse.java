package com.hart.notitum.activelabel.response;

import com.hart.notitum.activelabel.dto.ActiveLabelDto;

public class CreateActiveLabelResponse {
    private String message;
    private ActiveLabelDto data;

    public CreateActiveLabelResponse() {

    }

    public CreateActiveLabelResponse(String message, ActiveLabelDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public ActiveLabelDto getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(ActiveLabelDto data) {
        this.data = data;
    }
}
