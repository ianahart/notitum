package com.hart.notitum.member.dto;

import java.util.List;

public class MemberPaginationDto {
    private List<MemberDto> members;
    private int page;
    private String direction;
    private int pageSize;
    private int totalPages;

    public MemberPaginationDto() {

    }

    public MemberPaginationDto(
            List<MemberDto> members,
            int page,
            String direction,
            int pageSize,
            int totalPages) {
        this.members = members;
        this.page = page;
        this.direction = direction;
        this.pageSize = pageSize;
        this.totalPages = totalPages;
    }

    public int getPage() {
        return page;
    }

    public List<MemberDto> getMembers() {
        return members;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public int getPageSize() {
        return pageSize;
    }

    public String getDirection() {
        return direction;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public void setMembers(List<MemberDto> members) {
        this.members = members;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }
}
