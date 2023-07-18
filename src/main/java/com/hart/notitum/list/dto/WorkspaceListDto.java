package com.hart.notitum.list.dto;

import java.sql.Timestamp;

public class WorkspaceListDto {
    private Long id;
    private Timestamp createdAt;
    private Double xCoordinate;
    private Double yCoordinate;
    private Integer index;
    private String title;
    private Timestamp updatedAt;

    public WorkspaceListDto() {

    }

    public WorkspaceListDto(
            Long id,
            Timestamp createdAt,
            Double xCoordinate,
            Double yCoordinate,
            Integer index,
            String title,
            Timestamp updatedAt) {
        this.id = id;
        this.createdAt = createdAt;
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.index = index;
        this.title = title;
        this.updatedAt = updatedAt;
    }

    public Integer getIndex() {
        return index;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public String getTitle() {
        return title;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Double getxCoordinate() {
        return xCoordinate;
    }

    public Double getyCoordinate() {
        return yCoordinate;
    }

    public Long getId() {
        return id;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setxCoordinate(Double xCoordinate) {
        this.xCoordinate = xCoordinate;
    }

    public void setyCoordinate(Double yCoordinate) {
        this.yCoordinate = yCoordinate;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
