package com.hart.notitum.label.dto;

import java.sql.Timestamp;

public class LabelDto {
    private Long id;
    private Boolean isChecked;
    private String title;
    private String color;
    private Timestamp createdAt;

    public LabelDto() {

    }

    public LabelDto(
            Long id,
            Boolean isChecked,
            String title,
            String color,
            Timestamp createdAt) {
        this.id = id;
        this.isChecked = isChecked;
        this.title = title;
        this.color = color;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getColor() {
        return color;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Boolean getIsChecked() {
        return isChecked;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setIsChecked(Boolean isChecked) {
        this.isChecked = isChecked;
    }
}
