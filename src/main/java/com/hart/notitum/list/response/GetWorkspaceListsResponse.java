package com.hart.notitum.list.response;

import java.util.List;

import com.hart.notitum.list.dto.WorkspaceListDto;

public class GetWorkspaceListsResponse {
    private String message;
    private List<WorkspaceListDto> data;

    public GetWorkspaceListsResponse() {

    }

    public GetWorkspaceListsResponse(String message, List<WorkspaceListDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public List<WorkspaceListDto> getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(List<WorkspaceListDto> data) {
        this.data = data;
    }

}
