package com.hart.notitum.profile;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hart.notitum.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;

@Entity()
@Table(name = "profile")
public class Profile {
    @Id
    @SequenceGenerator(name = "profile_sequence", sequenceName = "profile_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "profile_sequence")
    @Column(name = "id")
    private Long id;
    @JsonIgnore
    @OneToOne(mappedBy = "profile", cascade = CascadeType.ALL)
    private User user;
    @Column(name = "full_name", length = 100)
    private String fullName;
    @Column(name = "public_name", length = 100)
    private String publicName;
    @Column(name = "job_title", length = 100)
    private String jobTitle;
    @Column(name = "department", length = 100)
    private String department;
    @Column(name = "organization", length = 100)
    private String organization;
    @Column(name = "location", length = 100)
    private String location;
    @Column(name = "location_visible")
    private Boolean locationVisible;

    public Profile() {

    }

    public Profile(
            Long id,
            String fullName,
            String publicName,
            String jobTitle,
            String department,
            String organization,
            String location,
            Boolean locationVisible) {
        this.id = id;
        this.fullName = fullName;
        this.publicName = publicName;
        this.jobTitle = jobTitle;
        this.department = department;
        this.organization = organization;
        this.location = location;
        this.locationVisible = locationVisible;
    }

    public Profile(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getFullName() {
        return fullName;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public String getLocation() {
        return location;
    }

    public String getDepartment() {
        return department;
    }

    public String getPublicName() {
        return publicName;
    }

    public String getOrganization() {
        return organization;
    }

    public Boolean getLocationVisible() {
        return locationVisible;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setPublicName(String publicName) {
        this.publicName = publicName;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public void setLocationVisible(Boolean locationVisible) {
        this.locationVisible = locationVisible;
    }

}
