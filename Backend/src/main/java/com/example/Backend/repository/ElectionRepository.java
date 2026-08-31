package com.example.Backend.repository;

import com.example.Backend.model.Admin;
import com.example.Backend.model.Election;
import com.example.Backend.model.ElectionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface ElectionRepository  extends JpaRepository<Election, Long> {

    List<Election> findByAdmin(Admin admin);

    List<Election> findByAdminId(Long adminId);

    Optional<Election> findByAccessCode(String accessCode);

    List<Election> findByStatus(ElectionStatus status);

    List<Election> findTop5ByAdminIdOrderByIdDesc(Long adminId);




}
