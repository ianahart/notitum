package com.hart.notitum.member.response;

import java.util.List;

import com.hart.notitum.workspace.dto.WorkspaceDto;

public class GetMemberWorkspaceResponse {

    private String message;
    private List<WorkspaceDto> data;

    public GetMemberWorkspaceResponse() {

    }

    public GetMemberWorkspaceResponse(String message, List<WorkspaceDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public List<WorkspaceDto> getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(List<WorkspaceDto> data) {
        this.data = data;
    }
}
