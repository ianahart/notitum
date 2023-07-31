package com.hart.notitum.card;

import java.sql.Timestamp;
import java.util.List;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.hart.notitum.activelabel.ActiveLabel;
import com.hart.notitum.checklist.Checklist;
import com.hart.notitum.comment.Comment;
import com.hart.notitum.list.WorkspaceList;
import com.hart.notitum.user.User;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;

@Entity()
@Table(name = "card")
public class Card {

    @Id
    @SequenceGenerator(name = "card_sequence", sequenceName = "card_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "card_sequence")
    @Column(name = "id")
    private Long id;
    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;
    @Column(name = "label")
    private String label;
    @Column(name = "title")
    private String title;
    @Column(name = "color")
    private String color;
    @Column(name = "index")
    private Integer index;
    @Column(name = "details", length = 400)
    private String details;
    @Column(name = "start_date")
    private Timestamp startDate;
    @Column(name = "end_date")
    private Timestamp endDate;
    @JsonBackReference
    @ManyToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
    @JsonBackReference
    @ManyToOne()
    @JoinColumn(name = "workspace_list_id", referencedColumnName = "id")
    private WorkspaceList workspaceList;

    @OneToMany(mappedBy = "card", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ActiveLabel> activeLabels;

    @OneToMany(mappedBy = "card", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Checklist> checklists;

    @OneToMany(mappedBy = "card", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Comment> comments = new ArrayList<>();

    public Card() {

    }

    public Card(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            String label,
            String color,
            Integer index,
            String details,
            Timestamp startDate,
            Timestamp endDate) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.label = label;
        this.color = color;
        this.index = index;
        this.details = details;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Card(String title, User user, WorkspaceList workspaceList) {
        this.title = title;
        this.user = user;
        this.workspaceList = workspaceList;
    }

    public Long getId() {
        return id;
    }

    public List<ActiveLabel> getActiveLabels() {
        return activeLabels;
    }

    public User getUser() {
        return user;
    }

    public String getColor() {
        return color;
    }

    public Integer getIndex() {
        return index;
    }

    public String getLabel() {
        return label;
    }

    public List<Checklist> getChecklists() {
        return checklists;
    }

    public String getTitle() {
        return title;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public String getDetails() {
        return details;
    }

    public Timestamp getEndDate() {
        return endDate;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Timestamp getStartDate() {
        return startDate;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public WorkspaceList getWorkspaceList() {
        return workspaceList;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setActiveLabels(List<ActiveLabel> activeLabels) {
        this.activeLabels = activeLabels;
    }

    public void setChecklists(List<Checklist> checklists) {
        this.checklists = checklists;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public void setEndDate(Timestamp endDate) {
        this.endDate = endDate;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setStartDate(Timestamp startDate) {
        this.startDate = startDate;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setWorkspaceList(WorkspaceList workspaceList) {
        this.workspaceList = workspaceList;
    }

}
