package com.hart.notitum.list.dto;

import java.sql.Timestamp;
import java.util.List;

import com.hart.notitum.card.Card;

public class WorkspaceListWithCardDto {
    private List<Card> cards;
    private Long id;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private Integer index;
    private String title;
    private Double xCoordinate;
    private Double yCoordinate;

    public WorkspaceListWithCardDto() {

    }

    public WorkspaceListWithCardDto(List<Card> cards,
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            Integer index,
            String title,
            Double xCoordinate,
            Double yCoordinate) {
        this.cards = cards;
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.index = index;
        this.title = title;
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
    }

    public List<Card> getCards() {
        return cards;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
    }

    public Long getId() {
        return id;
    }

    public Integer getIndex() {
        return index;
    }

    public String getTitle() {
        return title;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public Double getxCoordinate() {
        return xCoordinate;
    }

    public Double getyCoordinate() {
        return yCoordinate;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setxCoordinate(Double xCoordinate) {
        this.xCoordinate = xCoordinate;
    }

    public void setyCoordinate(Double yCoordinate) {
        this.yCoordinate = yCoordinate;
    }
}
