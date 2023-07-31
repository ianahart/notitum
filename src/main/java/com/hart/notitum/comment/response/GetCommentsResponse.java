package com.hart.notitum.comment.response;

import com.hart.notitum.comment.dto.PaginationDto;

public class GetCommentsResponse {
    private String message;
    private PaginationDto data;

    public GetCommentsResponse() {

    }

    public GetCommentsResponse(String message, PaginationDto data) {
        this.message = message;
        this.data = data;
    }

    public PaginationDto getData() {
        return data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(PaginationDto data) {
        this.data = data;
    }
}
