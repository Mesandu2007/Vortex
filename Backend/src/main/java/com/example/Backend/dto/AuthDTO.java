package com.example.Backend.dto;

public class AuthDTO {


    public static class LoginRequest {

        private String email;
        private String password;


        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }


        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }



    public static class GoogleLoginRequest {

        private String idToken;


        public String getIdToken() {
            return idToken;
        }

        public void setIdToken(String idToken) {
            this.idToken = idToken;
        }
    }



    public static class LoginResponse {

        private Long id;
        private String fullName;
        private String email;
        private String role;
        private String message;
        private String token;


        public LoginResponse(
                Long id,
                String fullName,
                String email,
                String role,
                String message,
                String token
        ) {

            this.id = id;
            this.fullName = fullName;
            this.email = email;
            this.role = role;
            this.message = message;
            this.token = token;
        }


        public Long getId() {
            return id;
        }


        public String getFullName() {
            return fullName;
        }


        public String getEmail() {
            return email;
        }


        public String getRole() {
            return role;
        }


        public String getMessage() {
            return message;
        }


        public String getToken() {
            return token;
        }


        public void setToken(String token) {
            this.token = token;
        }
    }




    public static class ChangePasswordRequest {

        private String oldPassword;
        private String newPassword;


        public String getOldPassword() {
            return oldPassword;
        }

        public void setOldPassword(String oldPassword) {
            this.oldPassword = oldPassword;
        }


        public String getNewPassword() {
            return newPassword;
        }

        public void setNewPassword(String newPassword) {
            this.newPassword = newPassword;
        }
    }




    public static class AdminProfileResponse {

        private Long id;
        private String fullName;
        private String iitId;
        private String email;
        private String department;
        private String clubPosition;


        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }


        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
        }


        public String getIitId() {
            return iitId;
        }

        public void setIitId(String iitId) {
            this.iitId = iitId;
        }


        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }


        public String getDepartment() {
            return department;
        }

        public void setDepartment(String department) {
            this.department = department;
        }


        public String getClubPosition() {
            return clubPosition;
        }

        public void setClubPosition(String clubPosition) {
            this.clubPosition = clubPosition;
        }
    }
}