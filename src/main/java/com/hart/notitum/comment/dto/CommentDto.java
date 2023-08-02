package com.hart.notitum.comment.dto;

import java.sql.Timestamp;

public class CommentDto {
    private Long id;
    private Timestamp createdAt;
    private String text;
    private String firstName;
    private String lastName;
    private Boolean isOpen;
    private Long userId;

    public CommentDto() {

    }

    public CommentDto(
            Long id,
            Timestamp createdAt,
            String text,
            String firstName,
            String lastName,
            Boolean isOpen,
            Long userId) {
        this.id = id;
        this.createdAt = createdAt;
        this.text = text;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isOpen = isOpen;
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public Boolean getIsOpen() {
        return isOpen;
    }

    public Long getUserId() {
        return userId;
    }

    public String getText() {
        return text;
    }

    public String getLastName() {
        return lastName;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
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

    public void setText(String text) {
        this.text = text;
    }

    public void setIsOpen(Boolean isOpen) {
        this.isOpen = isOpen;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

}
