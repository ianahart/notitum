package com.hart.notitum.list.response;

import com.hart.notitum.list.dto.WorkspaceListDto;

public class CreateWorkspaceListResponse {
    private String message;
    private WorkspaceListDto data;

    public CreateWorkspaceListResponse() {

    }

    public CreateWorkspaceListResponse(String message, WorkspaceListDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public WorkspaceListDto getData() {
        return data;
    }

    public void setData(WorkspaceListDto data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
