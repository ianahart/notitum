package com.hart.notitum.workspace.dto;

import java.util.List;

public class SearchWorkspacesPaginationDto {
    private List<SearchWorkspaceDto> workspaces;
    private int pageSize;
    private int page;
    private String direction;
    private int totalPages;

    public SearchWorkspacesPaginationDto() {

    }

    public SearchWorkspacesPaginationDto(
            List<SearchWorkspaceDto> workspaces,
            int pageSize,
            int page,
            String direction,
            int totalPages) {
        this.workspaces = workspaces;
        this.pageSize = pageSize;
        this.page = page;
        this.direction = direction;
        this.totalPages = totalPages;
    }

    public int getPage() {
        return page;
    }

    public int getPageSize() {
        return pageSize;
    }

    public String getDirection() {
        return direction;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public List<SearchWorkspaceDto> getWorkspaces() {
        return workspaces;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public void setWorkspaces(List<SearchWorkspaceDto> workspaces) {
        this.workspaces = workspaces;
    }
}
