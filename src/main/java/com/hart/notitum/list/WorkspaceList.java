package com.hart.notitum.list;

import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.hart.notitum.card.Card;
import com.hart.notitum.user.User;
import com.hart.notitum.workspace.Workspace;

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
import jakarta.persistence.GenerationType;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity()
@Table(name = "workspace_list")
public class WorkspaceList {
    @Id
    @SequenceGenerator(name = "workspace_list_sequence", sequenceName = "workspace_list_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "workspace_list_sequence")
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
    @Column(name = "index")
    private Integer index;
    @Column(name = "x_coordinate")
    private Double xCoordinate;
    @Column(name = "y_coordinate")
    private Double yCoordinate;

    @ManyToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne()
    @JoinColumn(name = "workspace_id", referencedColumnName = "id")
    private Workspace workspace;

    @JsonManagedReference
    @OneToMany(mappedBy = "workspaceList", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Card> cards;

    public WorkspaceList() {

    }

    public WorkspaceList(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            String title,
            Integer index,
            Double xCoordinate,
            Double yCoordinate

    ) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.title = title;
        this.index = index;
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
    }

    public WorkspaceList(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            String title,
            Integer index,
            Double xCoordinate,
            Double yCoordinate,
            List<Card> cards

    ) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.title = title;
        this.index = index;
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.cards = cards;
    }

    public WorkspaceList(
            String title,
            User user,
            Workspace workspace,
            Integer index

    ) {
        this.title = title;
        this.user = user;
        this.workspace = workspace;
        this.index = index;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public List<Card> getCards() {
        return cards;
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

    public Workspace getWorkspace() {
        return workspace;
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

    public void setUser(User user) {
        this.user = user;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
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

    public void setWorkspace(Workspace workspace) {
        this.workspace = workspace;
    }

    public void setyCoordinate(Double yCoordinate) {
        this.yCoordinate = yCoordinate;
    }

}
