package com.hart.notitum.profile.dto;

public class ProfileDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String publicName;
    private String jobTitle;
    private String department;
    private String organization;
    private String location;
    private Boolean locationVisible;
    private String bio;

    public ProfileDto() {

    }

    public ProfileDto(
            Long id,
            String firstName,
            String lastName,
            String publicName,
            String jobTitle,
            String department,
            String organization,
            String location,
            Boolean locationVisible,
            String bio) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.publicName = publicName;
        this.jobTitle = jobTitle;
        this.department = department;
        this.organization = organization;
        this.location = location;
        this.locationVisible = locationVisible;
        this.bio = bio;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public String getLastName() {
        return lastName;
    }

    public String getBio() {
        return bio;
    }

    public Long getId() {
        return id;
    }

    public String getLocation() {
        return location;
    }

    public String getFirstName() {
        return firstName;
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

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
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

    public void setId(Long id) {
        this.id = id;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}
