package com.hart.notitum.user.response;

import com.hart.notitum.user.dto.MinimalUserDto;

public class GetMinimalUserResponse {
    private String message;
    private MinimalUserDto data;

    public GetMinimalUserResponse() {

    }

    public GetMinimalUserResponse(String message, MinimalUserDto data) {
        this.message = message;
        this.data = data;
    }

    public MinimalUserDto getData() {
        return data;
    }

    public String getMessage() {
        return message;
    }

    public void setData(MinimalUserDto data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
