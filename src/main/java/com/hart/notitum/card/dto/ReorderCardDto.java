package com.hart.notitum.card.dto;

public class ReorderCardDto {
    private Long id;
    private Long workspaceListId;
    private Integer index;

    public ReorderCardDto() {

    }

    public ReorderCardDto(Long id, Integer index, Long workspaceListId) {
        this.id = id;
        this.index = index;
        this.workspaceListId = workspaceListId;
    }

    public Long getId() {
        return id;
    }

    public Long getWorkspaceListId() {
        return workspaceListId;
    }

    public Integer getIndex() {
        return index;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setWorkspaceListId(Long workspaceListId) {
        this.workspaceListId = workspaceListId;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }
}
