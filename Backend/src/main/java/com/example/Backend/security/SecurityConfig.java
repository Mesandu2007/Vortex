
package com.example.Backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;


    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) {

        this.jwtAuthenticationFilter =
                jwtAuthenticationFilter;

    }


    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                .cors(cors -> {})

                .csrf(csrf ->
                        csrf.disable()
                )

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth




                        .requestMatchers(
                                "/api/auth/login/admin",
                                "/api/auth/login/google"
                        )
                        .permitAll()




                        .requestMatchers(
                                "/api/elections/join"
                        )
                        .hasAuthority("USER")




                        .requestMatchers(
                                "/api/elections/**"
                        )
                        .hasAuthority("ADMIN")



                        .requestMatchers(
                                "/api/admin/**"
                        )
                        .hasAuthority("ADMIN")




                        .requestMatchers(
                                "/api/votes/**"
                        )
                        .hasAuthority("USER")




                        .requestMatchers(
                                "/api/results/**"
                        )
                        .authenticated()



                        .anyRequest()
                        .authenticated()
                );


        http.addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
        );


        return http.build();

    }


    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();

    }


    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration
    ) throws Exception {

        return configuration.getAuthenticationManager();

    }

}

