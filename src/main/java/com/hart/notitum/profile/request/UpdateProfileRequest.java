package com.hart.notitum.profile.request;

public class UpdateProfileRequest {
    private String name;
    private String value;
    private Boolean locationVisible;

    public UpdateProfileRequest() {

    }

    public UpdateProfileRequest(String name, String value, Boolean locationVisible) {
        this.name = name;
        this.value = value;
        this.locationVisible = locationVisible;
    }

    public String getName() {
        return name;
    }

    public String getValue() {
        return value;
    }

    public Boolean getLocationVisible() {
        return locationVisible;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public void setLocationVisible(Boolean locationVisible) {
        this.locationVisible = locationVisible;
    }

}
