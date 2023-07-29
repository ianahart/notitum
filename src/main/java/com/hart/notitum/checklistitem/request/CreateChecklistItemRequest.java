package com.hart.notitum.checklistitem.request;

public class CreateChecklistItemRequest {
    private String checklistItemTitle;
    private Long checklistId;
    private Long userId;

    public CreateChecklistItemRequest() {

    }

    public CreateChecklistItemRequest(String checklistItemTitle, Long checklistId, Long userId) {
        this.checklistItemTitle = checklistItemTitle;
        this.checklistId = checklistId;
        this.userId = userId;
    }

    public String getChecklistItemTitle() {
        return checklistItemTitle;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getChecklistId() {
        return checklistId;
    }

    public void setChecklistId(Long checklistId) {
        this.checklistId = checklistId;
    }

    public void setChecklistItemTitle(String checklistItemTitle) {
        this.checklistItemTitle = checklistItemTitle;
    }
}
