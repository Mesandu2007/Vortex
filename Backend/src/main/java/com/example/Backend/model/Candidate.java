package com.example.Backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "candidates")
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String iitId;

    private String department;

    private String year;

    private String photo;

    @Column(length = 2000)
    private String biography;

    @Column(length = 2000)
    private String manifesto;

    @ManyToOne
    @JoinColumn(name = "election_id", nullable = false)
    private Election election;


    public Candidate() {
    }


    public Candidate(Long id, String name, String iitId,
                     String department, String year,
                     String photo, String biography,
                     String manifesto, Election election) {

        this.id = id;
        this.name = name;
        this.iitId = iitId;
        this.department = department;
        this.year = year;
        this.photo = photo;
        this.biography = biography;
        this.manifesto = manifesto;
        this.election = election;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIitId() {
        return iitId;
    }

    public void setIitId(String iitId) {
        this.iitId = iitId;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }

    public String getManifesto() {
        return manifesto;
    }

    public void setManifesto(String manifesto) {
        this.manifesto = manifesto;
    }

    public Election getElection() {
        return election;
    }

    public void setElection(Election election) {
        this.election = election;
    }
}