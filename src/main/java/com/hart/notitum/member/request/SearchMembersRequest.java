package com.hart.notitum.member.request;

public class SearchMembersRequest {
    private String query;
    private Long workspaceId;

    public SearchMembersRequest() {

    }

    public SearchMembersRequest(String query, Long workspaceId) {
        this.query = query;
        this.workspaceId = workspaceId;
    }

    public String getQuery() {
        return query;
    }

    public Long getWorkspaceId() {
        return workspaceId;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public void setWorkspaceId(Long workspaceId) {
        this.workspaceId = workspaceId;
    }

}
