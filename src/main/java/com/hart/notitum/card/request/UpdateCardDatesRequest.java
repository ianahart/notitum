package com.hart.notitum.card.request;

import java.sql.Timestamp;
import java.util.List;

public class UpdateCardDatesRequest {
    private String action;
    private List<Timestamp> values;
    private Long workspaceUserId;

    public UpdateCardDatesRequest() {

    }

    public UpdateCardDatesRequest(
            String action,
            List<Timestamp> values,
            Long workspaceUserId) {
        this.action = action;
        this.values = values;
        this.workspaceUserId = workspaceUserId;
    }

    public String getAction() {
        return action;
    }

    public List<Timestamp> getValues() {
        return values;
    }

    public Long getWorkspaceUserId() {
        return workspaceUserId;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public void setValues(List<Timestamp> values) {
        this.values = values;
    }

    public void setWorkspaceUserId(Long workspaceUserId) {
        this.workspaceUserId = workspaceUserId;
    }
}
