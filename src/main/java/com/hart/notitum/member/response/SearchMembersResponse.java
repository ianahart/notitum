package com.hart.notitum.member.response;

import java.util.List;

import com.hart.notitum.member.dto.MemberDto;

public class SearchMembersResponse {
    private String message;
    private List<MemberDto> data;

    public SearchMembersResponse() {

    }

    public SearchMembersResponse(String message, List<MemberDto> data) {
        this.message = message;
        this.data = data;
    }

    public List<MemberDto> getData() {
        return data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(List<MemberDto> data) {
        this.data = data;
    }
}
