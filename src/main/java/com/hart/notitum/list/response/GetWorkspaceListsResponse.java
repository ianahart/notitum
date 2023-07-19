package com.hart.notitum.list.response;

import java.util.List;

import com.hart.notitum.list.WorkspaceList;
import com.hart.notitum.list.dto.WorkspaceListDto;
import com.hart.notitum.list.dto.WorkspaceListWithCardDto;

public class GetWorkspaceListsResponse {
    private String message;
    private List<WorkspaceListWithCardDto> data;

    public GetWorkspaceListsResponse() {

    }

    public GetWorkspaceListsResponse(String message, List<WorkspaceListWithCardDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public List<WorkspaceListWithCardDto> getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(List<WorkspaceListWithCardDto> data) {
        this.data = data;
    }

}
