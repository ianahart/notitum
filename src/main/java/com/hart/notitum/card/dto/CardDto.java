package com.hart.notitum.card.dto;

import java.sql.Timestamp;

public class CardDto {

    private Long id;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String label;
    private String color;
    private Integer index;
    private String details;
    private Timestamp startDate;
    private Timestamp endDate;

    public CardDto(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            String label,
            String color,
            Integer index,
            String details,
            Timestamp startDate,
            Timestamp endDate) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.label = label;
        this.color = color;
        this.index = index;
        this.details = details;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Long getId() {
        return id;
    }

    public String getColor() {
        return color;
    }

    public Integer getIndex() {
        return index;
    }

    public String getLabel() {
        return label;
    }

    public String getDetails() {
        return details;
    }

    public Timestamp getEndDate() {
        return endDate;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Timestamp getStartDate() {
        return startDate;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public void setEndDate(Timestamp endDate) {
        this.endDate = endDate;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setStartDate(Timestamp startDate) {
        this.startDate = startDate;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }
}
