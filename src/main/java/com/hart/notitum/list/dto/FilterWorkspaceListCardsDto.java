package com.hart.notitum.list.dto;

import java.util.List;

import com.hart.notitum.card.Card;

public class FilterWorkspaceListCardsDto {
    private Long id;
    private String title;
    private String background;
    private List<Card> cards;

    public FilterWorkspaceListCardsDto() {

    }

    public FilterWorkspaceListCardsDto(Long id, String background, String title, List<Card> cards) {
        this.id = id;
        this.background = background;
        this.title = title;
        this.cards = cards;
    }

    public Long getId() {
        return id;
    }

    public List<Card> getCards() {
        return cards;
    }

    public String getTitle() {
        return title;
    }

    public String getBackground() {
        return background;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
    }

    public void setTitle(String title) {
        this.title = title;
    }

}
