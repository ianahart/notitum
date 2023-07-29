package com.hart.notitum.checklist.response;

import com.hart.notitum.checklist.Checklist;

public class CreateChecklistResponse {
    private String message;
    private Checklist data;

    public CreateChecklistResponse() {

    }

    public CreateChecklistResponse(String message, Checklist data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public Checklist getData() {
        return data;
    }

    public void setData(Checklist data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
