package com.hart.notitum.checklist;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.hart.notitum.card.Card;
import com.hart.notitum.user.User;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;

@Entity()
@Table(name = "checklist")
public class Checklist {

    @Id
    @SequenceGenerator(name = "checklist_sequence", sequenceName = "checklist_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "checklist_sequence")
    @Column(name = "id")
    private Long id;
    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;
    @Column(name = "title")
    private String title;
    @Column(name = "is_complete")
    private Boolean isComplete;

    @JsonBackReference
    @ManyToOne()
    @JoinColumn(name = "card_id", referencedColumnName = "id")
    private Card card;

    @JsonBackReference
    @ManyToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Checklist() {

    }

    public Checklist(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            String title,
            Boolean isComplete) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.title = title;
        this.isComplete = isComplete;
    }

    public Checklist(
            String title,
            Boolean isComplete,
            Card card,
            User user) {
        this.title = title;
        this.isComplete = isComplete;
        this.card = card;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public Card getCard() {
        return card;
    }

    public User getUser() {
        return user;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public String getTitle() {
        return title;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public Boolean getIsComplete() {
        return isComplete;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public void setUser(User user) {
        this.user = user;
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

    public void setIsComplete(Boolean isComplete) {
        this.isComplete = isComplete;
    }

}
