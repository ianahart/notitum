package com.hart.notitum.list.request;

import java.util.List;

import com.hart.notitum.list.dto.ReorderWorkspaceListDto;

public class ReorderWorkspaceListRequest {
    private List<ReorderWorkspaceListDto> data;

    public ReorderWorkspaceListRequest() {

    }

    public ReorderWorkspaceListRequest(List<ReorderWorkspaceListDto> data) {
        this.data = data;
    }

    public List<ReorderWorkspaceListDto> getData() {
        return data;
    }

    public void setData(List<ReorderWorkspaceListDto> data) {
        this.data = data;
    }
}
