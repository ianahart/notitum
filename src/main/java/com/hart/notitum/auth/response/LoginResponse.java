package com.hart.notitum.auth.response;

import com.hart.notitum.user.dto.UserDto;

public class LoginResponse {
    private UserDto user;
    private String token;

    public LoginResponse() {

    }

    public LoginResponse(UserDto user, String token) {
        this.user = user;
        this.token = token;
    }

    public UserDto getUser() {
        return user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }
}
