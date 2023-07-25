package com.hart.notitum.member.response;

import com.hart.notitum.member.dto.MemberPaginationDto;

public class GetMembersResponse {
    private String message;
    private MemberPaginationDto data;

    public GetMembersResponse() {

    }

    public GetMembersResponse(String message, MemberPaginationDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public MemberPaginationDto getData() {
        return data;
    }

    public void setData(MemberPaginationDto data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
