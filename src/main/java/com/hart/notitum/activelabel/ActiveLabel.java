package com.hart.notitum.activelabel;

import java.sql.Timestamp;

import com.hart.notitum.card.Card;
import com.hart.notitum.label.Label;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;

@Entity()
@Table(name = "active_label")
public class ActiveLabel {
    @Id
    @SequenceGenerator(name = "active_label_sequence", sequenceName = "active_label_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "active_label_sequence")
    @Column(name = "id")
    private Long id;
    @CreationTimestamp
    private Timestamp createdAt;
    @UpdateTimestamp
    private Timestamp updatedAt;
    @ManyToOne
    @JoinColumn(name = "label_id", referencedColumnName = "id")
    private Label label;
    @ManyToOne
    @JoinColumn(name = "card_id", referencedColumnName = "id")
    private Card card;

    public ActiveLabel() {

    }

    public ActiveLabel(Long id,
            Timestamp createdAt,
            Timestamp updatedAt) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public ActiveLabel(Label label, Card card) {
        this.label = label;
        this.card = card;
    }

    public Long getId() {
        return id;
    }

    public Label getLabel() {
        return label;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Card getCard() {
        return card;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setLabel(Label label) {
        this.label = label;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

}
