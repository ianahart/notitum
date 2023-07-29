package com.hart.notitum.checklistitem.request;

public class UpdateChecklistItemRequest {
    private Long checklistItemId;
    private Boolean isComplete;
    private Long userId;

    public UpdateChecklistItemRequest() {

    }

    public UpdateChecklistItemRequest(Long checklistItemId, Boolean isComplete, Long userId) {
        this.checklistItemId = checklistItemId;
        this.isComplete = isComplete;
        this.userId = userId;
    }

    public Long getUserId() {
        return userId;
    }

    public Boolean getIsComplete() {
        return isComplete;
    }

    public Long getChecklistItemId() {
        return checklistItemId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setIsComplete(Boolean isComplete) {
        this.isComplete = isComplete;
    }

    public void setChecklistItemId(Long checklistItemId) {
        this.checklistItemId = checklistItemId;
    }
}
