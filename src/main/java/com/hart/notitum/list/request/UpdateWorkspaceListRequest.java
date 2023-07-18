package com.hart.notitum.list.request;

import com.hart.notitum.list.WorkspaceList;

public class UpdateWorkspaceListRequest {
    private WorkspaceList workspaceList;
    private Long workspaceId;

    public UpdateWorkspaceListRequest() {

    }

    public UpdateWorkspaceListRequest(WorkspaceList workspaceList, Long workspaceId) {
        this.workspaceList = workspaceList;
        this.workspaceId = workspaceId;
    }

    public WorkspaceList getWorkspaceList() {
        return workspaceList;
    }

    public Long getWorkspaceId() {
        return workspaceId;
    }

    public void setWorkspaceId(Long workspaceId) {
        this.workspaceId = workspaceId;
    }

    public void setWorkspaceList(WorkspaceList workspaceList) {
        this.workspaceList = workspaceList;
    }
}
