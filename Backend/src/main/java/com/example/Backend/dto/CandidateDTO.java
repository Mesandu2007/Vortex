package com.example.Backend.dto;

public class CandidateDTO {



    public static class CreateCandidateRequest {

        private String name;
        private String iitId;
        private String department;
        private String year;
        private String biography;
        private String manifesto;



        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getIitId() {
            return iitId;
        }

        public void setIitId(String iitId) {
            this.iitId = iitId;
        }

        public String getDepartment() {
            return department;
        }

        public void setDepartment(String department) {
            this.department = department;
        }

        public String getYear() {
            return year;
        }

        public void setYear(String year) {
            this.year = year;
        }

        public String getBiography() {
            return biography;
        }

        public void setBiography(String biography) {
            this.biography = biography;
        }

        public String getManifesto() {
            return manifesto;
        }

        public void setManifesto(String manifesto) {
            this.manifesto = manifesto;
        }


    }



    public static class UpdateCandidateRequest {

        private String name;
        private String department;
        private String year;
        private String biography;
        private String manifesto;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDepartment() {
            return department;
        }

        public void setDepartment(String department) {
            this.department = department;
        }

        public String getYear() {
            return year;
        }

        public void setYear(String year) {
            this.year = year;
        }

        public String getBiography() {
            return biography;
        }

        public void setBiography(String biography) {
            this.biography = biography;
        }

        public String getManifesto() {
            return manifesto;
        }

        public void setManifesto(String manifesto) {
            this.manifesto = manifesto;
        }
    }



    public static class CandidateResponse {

        private Long id;
        private String name;
        private String iitId;
        private String department;
        private String year;
        private String photo;
        private String biography;
        private String manifesto;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getIitId() {
            return iitId;
        }

        public void setIitId(String iitId) {
            this.iitId = iitId;
        }

        public String getDepartment() {
            return department;
        }

        public void setDepartment(String department) {
            this.department = department;
        }

        public String getYear() {
            return year;
        }

        public void setYear(String year) {
            this.year = year;
        }

        public String getPhoto() {
            return photo;
        }

        public void setPhoto(String photo) {
            this.photo = photo;
        }

        public String getBiography() {
            return biography;
        }

        public void setBiography(String biography) {
            this.biography = biography;
        }

        public String getManifesto() {
            return manifesto;
        }

        public void setManifesto(String manifesto) {
            this.manifesto = manifesto;
        }
    }



    public static class CandidateSummaryResponse {

        private Long id;
        private String name;
        private String department;
        private String photo;
        private String year;
        private String biography;
        private String manifesto;


        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDepartment() {
            return department;
        }

        public void setDepartment(String department) {
            this.department = department;
        }

        public String getPhoto() {
            return photo;
        }

        public void setPhoto(String photo) {
            this.photo = photo;
        }

        public String getYear(){
            return year;
        }

        public void setYear(String year){
            this.year=year;
        }

        public String getBiography() {
            return biography;
        }

        public void setBiography(String biography) {
            this.biography = biography;
        }

        public String getManifesto() {
            return manifesto;
        }

        public void setManifesto(String manifesto) {
            this.manifesto = manifesto;
        }




    }
}