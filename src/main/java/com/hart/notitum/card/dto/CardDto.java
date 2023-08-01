package com.hart.notitum.card.dto;

import java.sql.Timestamp;
import java.util.List;

import com.hart.notitum.activelabel.dto.ActiveLabelDto;

public class CardDto {

    private List<ActiveLabelDto> activeLabels;
    private Long id;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String label;
    private String color;
    private Integer index;
    private String details;
    private Timestamp startDate;
    private Timestamp endDate;
    private String title;

    public CardDto(
            List<ActiveLabelDto> activeLabels,
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            String label,
            String color,
            Integer index,
            String details,
            Timestamp startDate,
            Timestamp endDate,
            String title) {
        this.activeLabels = activeLabels;
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.label = label;
        this.color = color;
        this.index = index;
        this.details = details;
        this.startDate = startDate;
        this.endDate = endDate;
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public List<ActiveLabelDto> getActiveLabels() {
        return activeLabels;
    }

    public String getTitle() {
        return title;
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

    public void setActiveLabels(List<ActiveLabelDto> activeLabels) {
        this.activeLabels = activeLabels;
    }

    public void setTitle(String title) {
        this.title = title;
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
