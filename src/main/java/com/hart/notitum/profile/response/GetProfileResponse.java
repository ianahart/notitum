package com.hart.notitum.profile.response;

import com.hart.notitum.profile.dto.ProfileDto;

public class GetProfileResponse {

    private String message;
    private ProfileDto data;

    public GetProfileResponse() {

    }

    public GetProfileResponse(String message, ProfileDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public ProfileDto getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(ProfileDto data) {
        this.data = data;
    }
}
