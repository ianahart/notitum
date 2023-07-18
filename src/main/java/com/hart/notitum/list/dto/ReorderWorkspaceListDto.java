package com.hart.notitum.list.dto;

public class ReorderWorkspaceListDto {
    private Long workspaceListId;
    private Integer index;

    public ReorderWorkspaceListDto() {

    }

    public ReorderWorkspaceListDto(Long workspaceListId, Integer index) {
        this.workspaceListId = workspaceListId;
        this.index = index;
    }

    public Integer getIndex() {
        return index;
    }

    public Long getWorkspaceListId() {
        return workspaceListId;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public void setWorkspaceListId(Long workspaceListId) {
        this.workspaceListId = workspaceListId;
    }
}
