package com.hart.notitum.workspace.response;

import com.hart.notitum.workspace.dto.SearchWorkspacesPaginationDto;

public class SearchWorkspacesResponse {
    private String message;
    private SearchWorkspacesPaginationDto data;

    public SearchWorkspacesResponse() {

    }

    public SearchWorkspacesResponse(String message, SearchWorkspacesPaginationDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public SearchWorkspacesPaginationDto getData() {
        return data;
    }

    public void setData(SearchWorkspacesPaginationDto data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
