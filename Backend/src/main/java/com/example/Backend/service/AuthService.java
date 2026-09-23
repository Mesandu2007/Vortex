package com.example.Backend.service;


import com.example.Backend.dto.AuthDTO;
import com.example.Backend.model.Admin;
import com.example.Backend.model.User;
import com.example.Backend.repository.AdminRepository;
import com.example.Backend.repository.UserRepository;
import com.example.Backend.security.JwtService;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthService {


    private final AdminRepository adminRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final GoogleTokenService googleTokenService;


    public AuthService(
            AdminRepository adminRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            GoogleTokenService googleTokenService
    ){

        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.googleTokenService = googleTokenService;

    }













    public AuthDTO.LoginResponse loginAdmin(
            AuthDTO.LoginRequest request
    ){


        Admin admin =
                adminRepository.findByEmail(request.getEmail())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid email or password"
                                )
                        );




        if(!passwordEncoder.matches(
                request.getPassword(),
                admin.getPassword()
        )){


            throw new RuntimeException(
                    "Invalid email or password"
            );

        }




        String token =
                jwtService.generateToken(
                        admin.getEmail(),
                        "ADMIN"
                );






        return new AuthDTO.LoginResponse(

                admin.getId(),

                admin.getFullName(),

                admin.getEmail(),

                "ADMIN",

                "Login successful",

                token

        );


    }




    public AuthDTO.LoginResponse loginUserWithGoogle(
            AuthDTO.GoogleLoginRequest request
    ){

        // Verify Google ID token
        GoogleIdToken.Payload payload =
                googleTokenService.verifyToken(
                        request.getIdToken()
                );



        String googleId =
                payload.getSubject();

        String email =
                payload.getEmail();

        String fullName =
                (String) payload.get("name");



        if(!Boolean.TRUE.equals(
                payload.getEmailVerified()
        )){

            throw new RuntimeException(
                    "Google email is not verified"
            );

        }


        // Check university email
        if(!email.endsWith("@iit.ac.lk")){

            throw new RuntimeException(
                    "Only university accounts are allowed"
            );

        }



        User user =
                userRepository.findByGoogleId(googleId)
                        .orElse(null);



        if(user == null){

            user =
                    userRepository.findByEmail(email)
                            .orElse(null);

        }



        if(user == null){

            user = new User();

            user.setGoogleId(googleId);

            user.setEmail(email);

            user.setFullName(fullName);

            user.setRole(
                    com.example.Backend.model.Role.USER
            );


            user =
                    userRepository.save(user);

        }
        else{


            if(user.getGoogleId() == null){

                user.setGoogleId(googleId);

                user =
                        userRepository.save(user);

            }

        }



        String token =
                jwtService.generateToken(
                        user.getEmail(),
                        "USER"
                );


        return new AuthDTO.LoginResponse(

                user.getId(),

                user.getFullName(),

                user.getEmail(),

                "USER",

                "Google login successful",

                token

        );

    }

}