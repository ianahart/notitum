package com.hart.notitum.list.response;

import com.hart.notitum.list.dto.WorkspaceListDto;
import com.hart.notitum.list.dto.WorkspaceListWithCardDto;

public class CreateWorkspaceListResponse {
    private String message;
    private WorkspaceListWithCardDto data;

    public CreateWorkspaceListResponse() {

    }

    public CreateWorkspaceListResponse(String message, WorkspaceListWithCardDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public WorkspaceListWithCardDto getData() {
        return data;
    }

    public void setData(WorkspaceListWithCardDto data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
