package com.hart.notitum.member.request;

public class CreateMemberRequest {
    private String email;
    private Long workspaceId;

    public CreateMemberRequest() {

    }

    public CreateMemberRequest(String email, Long workspaceId) {
        this.email = email;
        this.workspaceId = workspaceId;
    }

    public String getEmail() {
        return email;
    }

    public Long getWorkspaceId() {
        return workspaceId;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setWorkspaceId(Long workspaceId) {
        this.workspaceId = workspaceId;
    }
}
