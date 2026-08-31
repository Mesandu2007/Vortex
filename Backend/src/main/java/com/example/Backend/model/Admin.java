package com.example.Backend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "admins")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    private String iitId;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String clubPosition;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Election> elections;


    public Admin() {
    }


    public Admin(Long id, String fullName, String iitId, String email,
                 String password, String clubPosition, Role role,
                 List<Election> elections) {
        this.id = id;
        this.fullName = fullName;
        this.iitId = iitId;
        this.email = email;
        this.password = password;
        this.clubPosition = clubPosition;
        this.role = role;
        this.elections = elections;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getIitId() {
        return iitId;
    }

    public void setIitId(String iitId) {
        this.iitId = iitId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getClubPosition() {
        return clubPosition;
    }

    public void setClubPosition(String clubPosition) {
        this.clubPosition = clubPosition;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<Election> getElections() {
        return elections;
    }

    public void setElections(List<Election> elections) {
        this.elections = elections;
    }
}