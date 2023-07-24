package com.hart.notitum.list.request;

import java.util.List;

import com.hart.notitum.list.dto.ReorderWorkspaceListDto;

public class ReorderWorkspaceListRequest {
    private List<ReorderWorkspaceListDto> data;
    private Long workspaceUserId;

    public ReorderWorkspaceListRequest() {

    }

    public ReorderWorkspaceListRequest(List<ReorderWorkspaceListDto> data, Long workspaceUserId) {
        this.data = data;
        this.workspaceUserId = workspaceUserId;
    }

    public List<ReorderWorkspaceListDto> getData() {
        return data;
    }

    public Long getWorkspaceUserId() {
        return workspaceUserId;
    }

    public void setWorkspaceUserId(Long workspaceUserId) {
        this.workspaceUserId = workspaceUserId;
    }

    public void setData(List<ReorderWorkspaceListDto> data) {
        this.data = data;
    }

}
