
        package com.example.Backend.service;

import com.example.Backend.dto.AuthDTO;
import com.example.Backend.model.Admin;
import com.example.Backend.repository.AdminRepository;

import org.springframework.stereotype.Service;


@Service
public class AdminService {

    private final AdminRepository adminRepository;


    public AdminService(
            AdminRepository adminRepository
    ) {

        this.adminRepository = adminRepository;

    }


    public AuthDTO.AdminProfileResponse getAdminProfile(
            Long adminId
    ) {

        Admin admin =
                adminRepository.findById(adminId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Admin not found"
                                )
                        );


        AuthDTO.AdminProfileResponse response =
                new AuthDTO.AdminProfileResponse();


        response.setId(
                admin.getId()
        );

        response.setFullName(
                admin.getFullName()
        );

        response.setIitId(
                admin.getIitId()
        );

        response.setEmail(
                admin.getEmail()
        );



        response.setClubPosition(
                admin.getClubPosition()
        );


        return response;

    }

}


