
package com.example.Backend.controller;

import com.example.Backend.dto.AuthDTO;
import com.example.Backend.model.Admin;
import com.example.Backend.repository.AdminRepository;
import com.example.Backend.service.AdminService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;
    private final AdminRepository adminRepository;


    public AdminController(
            AdminService adminService,
            AdminRepository adminRepository
    ) {

        this.adminService = adminService;
        this.adminRepository = adminRepository;

    }


    @GetMapping("/profile")
    public ResponseEntity<AuthDTO.AdminProfileResponse> getProfile(
            Authentication authentication
    ) {

        String email = authentication.getName();


        Admin admin =
                adminRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Admin not found"
                                )
                        );


        AuthDTO.AdminProfileResponse profile =
                adminService.getAdminProfile(
                        admin.getId()
                );


        return ResponseEntity.ok(profile);

    }

}

