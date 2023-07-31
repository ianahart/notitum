package com.hart.notitum.comment.response;

import com.hart.notitum.comment.dto.CommentDto;

public class CreateCommentResponse {
    private String message;
    private CommentDto data;

    public CreateCommentResponse() {

    }

    public CreateCommentResponse(String message, CommentDto data) {
        this.message = message;
        this.data = data;
    }

    public CommentDto getData() {
        return data;
    }

    public String getMessage() {
        return message;
    }

    public void setData(CommentDto data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
