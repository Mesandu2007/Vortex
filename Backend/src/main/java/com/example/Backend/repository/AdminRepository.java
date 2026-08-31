package com.example.Backend.repository;

import org.springframework.stereotype.Repository;

import com.example.Backend.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByIitId(String iitId);


}
