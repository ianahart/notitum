package com.hart.notitum.list.request;

import com.hart.notitum.list.WorkspaceList;
import com.hart.notitum.list.dto.WorkspaceListDto;

public class UpdateWorkspaceListRequest {
    private WorkspaceListDto workspaceList;
    private Long workspaceId;

    public UpdateWorkspaceListRequest() {

    }

    public UpdateWorkspaceListRequest(WorkspaceListDto workspaceList, Long workspaceId) {
        this.workspaceList = workspaceList;
        this.workspaceId = workspaceId;
    }

    public WorkspaceListDto getWorkspaceList() {
        return workspaceList;
    }

    public Long getWorkspaceId() {
        return workspaceId;
    }

    public void setWorkspaceId(Long workspaceId) {
        this.workspaceId = workspaceId;
    }

    public void setWorkspaceList(WorkspaceListDto workspaceList) {
        this.workspaceList = workspaceList;
    }
}
