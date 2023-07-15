package com.hart.notitum.activity.dto;

import java.sql.Timestamp;

public class ActivitiesDto {
    private Long activityId;
    private Timestamp createdAt;
    private String text;

    public ActivitiesDto() {

    }

    public ActivitiesDto(Long activityId, Timestamp createdAt, String text) {
        this.activityId = activityId;
        this.createdAt = createdAt;
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Long getActivityId() {
        return activityId;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setActivityId(Long activityId) {
        this.activityId = activityId;
    }

}
