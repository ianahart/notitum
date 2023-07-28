package com.hart.notitum.checklist.response;

import java.util.List;

import com.hart.notitum.checklist.Checklist;

public class GetChecklistsResponse {
    private String message;
    private List<Checklist> data;

    public GetChecklistsResponse() {

    }

    public GetChecklistsResponse(String message, List<Checklist> data) {
        this.message = message;
        this.data = data;
    }

    public List<Checklist> getData() {
        return data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(List<Checklist> data) {
        this.data = data;
    }
}
