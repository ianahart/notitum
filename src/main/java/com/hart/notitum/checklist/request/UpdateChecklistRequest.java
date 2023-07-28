package com.hart.notitum.checklist.request;

public class UpdateChecklistRequest {
    private String title;
    private Long workspaceId;

    public UpdateChecklistRequest() {

    }

    public UpdateChecklistRequest(String title, Long workspaceId) {
        this.title = title;
        this.workspaceId = workspaceId;
    }

    public String getTitle() {
        return title;
    }

    public Long getWorkspaceId() {
        return workspaceId;
    }
}
