package com.example.Backend.security;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {


    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;


    public JwtAuthenticationFilter(
            JwtService jwtService,
            UserDetailsService userDetailsService
    ) {

        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;

    }


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {


        String authHeader =
                request.getHeader("Authorization");


        String token = null;
        String email = null;



        if (authHeader != null &&
                authHeader.startsWith("Bearer ")) {

            token = authHeader.substring(7);

            try {

                email = jwtService.extractEmail(token);

            } catch (Exception e) {

                // Invalid token
                email = null;

            }
        }



        if (email != null &&
                SecurityContextHolder
                        .getContext()
                        .getAuthentication() == null) {


            // First validate our JWT
            if (jwtService.validateToken(token)) {


                UserDetails userDetails =
                        userDetailsService
                                .loadUserByUsername(email);


                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );


                SecurityContextHolder
                        .getContext()
                        .setAuthentication(authentication);

            }
        }




        filterChain.doFilter(
                request,
                response
        );

    }

}