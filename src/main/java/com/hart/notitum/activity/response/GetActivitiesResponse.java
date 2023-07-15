package com.hart.notitum.activity.response;

import com.hart.notitum.activity.dto.PaginationDto;

public class GetActivitiesResponse {
    private String message;
    private PaginationDto data;

    public GetActivitiesResponse() {

    }

    public GetActivitiesResponse(String message, PaginationDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public PaginationDto getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(PaginationDto data) {
        this.data = data;
    }

}
