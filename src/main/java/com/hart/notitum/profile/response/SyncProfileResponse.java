package com.hart.notitum.profile.response;

import com.hart.notitum.profile.dto.SyncProfileDto;

public class SyncProfileResponse {
    private String message;
    private SyncProfileDto data;

    public SyncProfileResponse() {

    }

    public SyncProfileResponse(String message, SyncProfileDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public SyncProfileDto getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(SyncProfileDto data) {
        this.data = data;
    }
}
