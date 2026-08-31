package com.example.Backend.controller;

import com.example.Backend.dto.AuthDTO;
import com.example.Backend.model.Admin;
import com.example.Backend.service.AuthService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;


    public AuthController(AuthService authService) {
        this.authService = authService;
    }









    @PostMapping("/login/admin")
    public ResponseEntity<AuthDTO.LoginResponse> loginAdmin(
            @RequestBody AuthDTO.LoginRequest request
    ) {

        AuthDTO.LoginResponse response =
                authService.loginAdmin(request);

        return ResponseEntity.ok(response);
    }




    @PostMapping("/login/google")
    public ResponseEntity<AuthDTO.LoginResponse> loginUserWithGoogle(
            @RequestBody AuthDTO.GoogleLoginRequest request
    ) {

        AuthDTO.LoginResponse response =
                authService.loginUserWithGoogle(request);

        return ResponseEntity.ok(response);
    }
}