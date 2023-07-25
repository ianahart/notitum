package com.hart.notitum.member.response;

import com.hart.notitum.member.dto.MemberDto;

public class CreateMemberResponse {
    private String message;
    private MemberDto data;

    public CreateMemberResponse() {

    }

    public CreateMemberResponse(String message, MemberDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public MemberDto getData() {
        return data;
    }

    public void setData(MemberDto data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
