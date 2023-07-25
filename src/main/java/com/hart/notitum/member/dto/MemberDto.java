package com.hart.notitum.member.dto;

public class MemberDto {
    private Long id;
    private String firstName;
    private String lastName;
    private Long userId;

    public MemberDto() {
    }

    public MemberDto(
            Long id,
            String firstName,
            String lastName,
            Long userId) {

        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getLastName() {
        return lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
}
