package com.hart.notitum.checklistitem;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.hart.notitum.checklist.Checklist;
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
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;

@Entity()
@Table(name = "checklist_item")
public class ChecklistItem {

    @Id
    @SequenceGenerator(name = "checklist_item_sequence", sequenceName = "checklist_item_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "checklist_item_sequence")
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
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @JsonBackReference
    @ManyToOne()
    @JoinColumn(name = "checklist_id", referencedColumnName = "id")
    private Checklist checklist;

    public ChecklistItem() {

    }

    public ChecklistItem(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            String title,
            Boolean isComplete) {
        this.id = id;
    }

    public ChecklistItem(
            String title,
            Boolean isComplete,
            User user,
            Checklist checklist) {
        this.title = title;
        this.isComplete = isComplete;
        this.user = user;
        this.checklist = checklist;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getTitle() {
        return title;
    }

    public Checklist getChecklist() {
        return checklist;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
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

    public void setUser(User user) {
        this.user = user;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setChecklist(Checklist checklist) {
        this.checklist = checklist;
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
