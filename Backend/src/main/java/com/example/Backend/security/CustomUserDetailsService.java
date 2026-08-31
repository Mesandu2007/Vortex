package com.example.Backend.security;


import com.example.Backend.model.Admin;
import com.example.Backend.model.User;

import com.example.Backend.repository.AdminRepository;
import com.example.Backend.repository.UserRepository;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.stereotype.Service;


import java.util.Collections;


@Service
public class CustomUserDetailsService implements UserDetailsService {


    private final AdminRepository adminRepository;
    private final UserRepository userRepository;


    public CustomUserDetailsService(
            AdminRepository adminRepository,
            UserRepository userRepository
    ){

        this.adminRepository = adminRepository;
        this.userRepository = userRepository;

    }


    @Override
    public UserDetails loadUserByUsername(String email) {


        // =====================================================
        // CHECK ADMIN
        // =====================================================

        Admin admin =
                adminRepository.findByEmail(email)
                        .orElse(null);


        if(admin != null){

            return new org.springframework.security.core.userdetails.User(

                    admin.getEmail(),

                    admin.getPassword(),

                    Collections.singleton(
                            new SimpleGrantedAuthority("ADMIN")
                    )

            );

        }


        // =====================================================
        // CHECK USER
        // =====================================================

        User user =
                userRepository.findByEmail(email)
                        .orElse(null);


        if(user != null){

            return new org.springframework.security.core.userdetails.User(

                    user.getEmail(),

                    "",

                    Collections.singleton(
                            new SimpleGrantedAuthority("USER")
                    )

            );

        }


        // =====================================================
        // USER NOT FOUND
        // =====================================================

        throw new RuntimeException(
                "User not found"
        );

    }

}