package com.hart.notitum.checklist.dto;

import java.sql.Timestamp;
import java.util.List;

import com.hart.notitum.checklistitem.ChecklistItem;

public class ChecklistWithItemsDto {

    private Long id;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private Boolean isComplete;
    private String title;
    private List<ChecklistItem> checklistItems;

    public ChecklistWithItemsDto() {

    }

    public ChecklistWithItemsDto(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            Boolean isComplete,
            String title,
            List<ChecklistItem> checklistItems) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isComplete = isComplete;
        this.title = title;
        this.checklistItems = checklistItems;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public Boolean getIsComplete() {
        return isComplete;
    }

    public List<ChecklistItem> getChecklistItems() {
        return checklistItems;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setIsComplete(Boolean isComplete) {
        this.isComplete = isComplete;
    }

    public void setChecklistItems(List<ChecklistItem> checklistItems) {
        this.checklistItems = checklistItems;
    }
}
