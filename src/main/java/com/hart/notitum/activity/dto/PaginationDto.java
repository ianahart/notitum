package com.hart.notitum.activity.dto;

import java.util.List;

public class PaginationDto {
    private List<ActivitiesDto> activities;
    private String direction;
    private int pageSize;
    private int page;
    private int totalPages;

    public PaginationDto() {

    }

    public PaginationDto(
            List<ActivitiesDto> activities,
            String direction,
            int pageSize,
            int page,
            int totalPages) {
        this.activities = activities;
        this.direction = direction;
        this.pageSize = pageSize;
        this.page = page;
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

    public List<ActivitiesDto> getActivities() {
        return activities;
    }

    public int getTotalPages() {
        return totalPages;
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

    public void setActivities(List<ActivitiesDto> activities) {
        this.activities = activities;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }
}
