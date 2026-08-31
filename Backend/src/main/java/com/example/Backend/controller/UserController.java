
package com.example.Backend.controller;

import com.example.Backend.dto.UserDashboardDTO;
import com.example.Backend.model.User;
import com.example.Backend.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;


    public UserController(
            UserService userService
    ) {

        this.userService = userService;

    }




    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(
            Authentication authentication
    ) {

        String email =
                authentication.getName();


        User user =
                userService.getUserProfile(
                        email
                );


        return ResponseEntity.ok(
                user
        );

    }




    @GetMapping("/dashboard")
    public ResponseEntity<UserDashboardDTO.DashboardResponse>
    getDashboard(
            Authentication authentication
    ) {

        String email =
                authentication.getName();


        UserDashboardDTO.DashboardResponse response =
                userService.getUserDashboard(
                        email
                );


        return ResponseEntity.ok(
                response
        );

    }

}


