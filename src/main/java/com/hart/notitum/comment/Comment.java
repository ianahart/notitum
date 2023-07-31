package com.hart.notitum.comment;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.hart.notitum.card.Card;
import com.hart.notitum.user.User;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;

@Entity()
@Table(name = "comment")
public class Comment {

    @Id
    @SequenceGenerator(name = "comment_sequence", sequenceName = "comment_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comment_sequence")
    @Column(name = "id")
    private Long id;
    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;
    @Column(name = "text", length = 100)
    private String text;
    @Column(name = "is_open")
    private Boolean isOpen;
    @JsonBackReference
    @ManyToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
    @JsonBackReference
    @ManyToOne()
    @JoinColumn(name = "card_id", referencedColumnName = "id")
    private Card card;

    public Comment() {

    }

    public Comment(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            String text,
            Boolean isOpen) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.text = text;
        this.isOpen = isOpen;
    }

    public Comment(String text, Card card, User user, Boolean isOpen) {
        this.text = text;
        this.card = card;
        this.user = user;
        this.isOpen = isOpen;
    }

    public Long getId() {
        return id;
    }

    public Boolean getIsOpen() {
        return isOpen;
    }

    public Card getCard() {
        return card;
    }

    public String getText() {
        return text;
    }

    public User getUser() {
        return user;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setIsOpen(Boolean isOpen) {
        this.isOpen = isOpen;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }
}
