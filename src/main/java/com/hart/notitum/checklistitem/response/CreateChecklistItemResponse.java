package com.hart.notitum.checklistitem.response;

import com.hart.notitum.checklistitem.ChecklistItem;

public class CreateChecklistItemResponse {
    private String message;
    private ChecklistItem data;

    public CreateChecklistItemResponse() {

    }

    public CreateChecklistItemResponse(String message, ChecklistItem data) {
        this.message = message;
        this.data = data;
    }

    public ChecklistItem getData() {
        return data;
    }

    public String getMessage() {
        return message;
    }

    public void setData(ChecklistItem data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
