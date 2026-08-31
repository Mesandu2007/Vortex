package com.example.Backend.config;

import com.example.Backend.model.Admin;
import com.example.Backend.model.Role;
import com.example.Backend.repository.AdminRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
public class AdminSeeder {

    @Value("${admin.email}")
    private String adminEmail;

    @Value("${admin.password}")
    private String adminPassword;

    @Value("${admin.full-name}")
    private String adminFullName;

    @Value("${admin.iit-id}")
    private String adminIitId;

    @Value("${admin.club-position}")
    private String adminClubPosition;


    @Bean
    CommandLineRunner seedAdmin(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder
    ) {

        return args -> {

            if (adminRepository.findByEmail(adminEmail).isEmpty()) {

                Admin admin = new Admin();

                admin.setFullName(
                        adminFullName
                );

                admin.setIitId(
                        adminIitId
                );

                admin.setEmail(
                        adminEmail
                );

                admin.setPassword(
                        passwordEncoder.encode(
                                adminPassword
                        )
                );

                admin.setClubPosition(
                        adminClubPosition
                );

                admin.setRole(
                        Role.ADMIN
                );

                adminRepository.save(admin);

                System.out.println(
                        "Admin created: " + adminEmail
                );

            } else {

                System.out.println(
                        "Admin already exists: " + adminEmail
                );

            }

        };
    }
}