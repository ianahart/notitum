package com.hart.notitum.checklistitem.request;

public class CreateChecklistItemRequest {
    private String checklistItemTitle;
    private Long checklistId;
    private Long userId;
    private String assignees;

    public CreateChecklistItemRequest() {

    }

    public CreateChecklistItemRequest(String checklistItemTitle, Long checklistId, Long userId, String assignees) {
        this.checklistItemTitle = checklistItemTitle;
        this.checklistId = checklistId;
        this.userId = userId;
        this.assignees = assignees;
    }

    public String getChecklistItemTitle() {
        return checklistItemTitle;
    }

    public Long getUserId() {
        return userId;
    }

    public String getAssignees() {
        return assignees;
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

    public void setAssignees(String assignees) {
        this.assignees = assignees;
    }

    public void setChecklistItemTitle(String checklistItemTitle) {
        this.checklistItemTitle = checklistItemTitle;
    }
}
