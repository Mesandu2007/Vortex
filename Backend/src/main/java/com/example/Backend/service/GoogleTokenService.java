package com.example.Backend.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class GoogleTokenService {

    @Value("${google.client-id}")
    private String googleClientId;


    public GoogleIdToken.Payload verifyToken(String idTokenString) {

        try {

            GoogleIdTokenVerifier verifier =
                    new GoogleIdTokenVerifier.Builder(
                            GoogleNetHttpTransport.newTrustedTransport(),
                            GsonFactory.getDefaultInstance()
                    )
                            .setAudience(
                                    Collections.singletonList(googleClientId)
                            )
                            .build();


            GoogleIdToken idToken =
                    verifier.verify(idTokenString);


            if (idToken == null) {

                throw new RuntimeException(
                        "Invalid Google ID token"
                );
            }


            return idToken.getPayload();

        } catch (Exception e) {

            throw new RuntimeException(
                    "Google token verification failed",
                    e
            );
        }
    }
}
