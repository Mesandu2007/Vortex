package com.example.Backend.dto;

import com.example.Backend.model.ElectionStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;


public class ElectionDTO {


    public static class CreateElectionRequest {

        private String title;
        private String positionName;
        private String description;
        private LocalDateTime startDate;
        private LocalDateTime endDate;

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getPositionName() {
            return positionName;
        }

        public void setPositionName(String positionName) {
            this.positionName = positionName;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public LocalDateTime getStartDate() {
            return startDate;
        }

        public void setStartDate(LocalDateTime startDate) {
            this.startDate = startDate;
        }

        public LocalDateTime getEndDate() {
            return endDate;
        }

        public void setEndDate(LocalDateTime endDate) {
            this.endDate = endDate;
        }
    }



    public static class UpdateElectionRequest {

        private String title;
        private String positionName;
        private String description;
        private LocalDateTime startDate;
        private LocalDateTime endDate;

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getPositionName() {
            return positionName;
        }

        public void setPositionName(String positionName) {
            this.positionName = positionName;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public LocalDateTime getStartDate() {
            return startDate;
        }

        public void setStartDate(LocalDateTime startDate) {
            this.startDate = startDate;
        }

        public LocalDateTime getEndDate() {
            return endDate;
        }

        public void setEndDate(LocalDateTime endDate) {
            this.endDate = endDate;
        }
    }



    public static class JoinElectionRequest {

        private String accessCode;

        public String getAccessCode() {
            return accessCode;
        }

        public void setAccessCode(String accessCode) {
            this.accessCode = accessCode;
        }
    }



    public static class ElectionResponse {

        private Long id;
        private String title;
        private String positionName;
        private String description;
        private String accessCode;
        private LocalDateTime startDate;
        private LocalDateTime endDate;
        private ElectionStatus status;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getPositionName() {
            return positionName;
        }

        public void setPositionName(String positionName) {
            this.positionName = positionName;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getAccessCode() {
            return accessCode;
        }

        public void setAccessCode(String accessCode) {
            this.accessCode = accessCode;
        }

        public LocalDateTime getStartDate() {
            return startDate;
        }

        public void setStartDate(LocalDateTime startDate) {
            this.startDate = startDate;
        }

        public LocalDateTime getEndDate() {
            return endDate;
        }

        public void setEndDate(LocalDateTime endDate) {
            this.endDate = endDate;
        }

        public ElectionStatus getStatus() {
            return status;
        }

        public void setStatus(ElectionStatus status) {
            this.status = status;
        }
    }


    public static class ElectionStatsResponse {

        private long totalCandidates;
        private long totalParticipants;
        private long totalVotes;

        private Long electionId;
        private String title;
        private ElectionStatus status;

        // Candidate vote information
        private List<CandidateVoteResponse> candidateResults;




        public long getTotalCandidates() {
            return totalCandidates;
        }

        public void setTotalCandidates(long totalCandidates) {
            this.totalCandidates = totalCandidates;
        }


        public long getTotalParticipants() {
            return totalParticipants;
        }

        public void setTotalParticipants(long totalParticipants) {
            this.totalParticipants = totalParticipants;
        }


        public long getTotalVotes() {
            return totalVotes;
        }

        public void setTotalVotes(long totalVotes) {
            this.totalVotes = totalVotes;
        }


        public Long getElectionId() {
            return electionId;
        }

        public void setElectionId(Long electionId) {
            this.electionId = electionId;
        }


        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }


        public ElectionStatus getStatus() {
            return status;
        }

        public void setStatus(ElectionStatus status) {
            this.status = status;
        }


        public List<CandidateVoteResponse> getCandidateResults() {
            return candidateResults;
        }

        public void setCandidateResults(
                List<CandidateVoteResponse> candidateResults
        ) {
            this.candidateResults = candidateResults;
        }
    }







    public static class JoinedElectionResponse {

        private Long id;
        private String title;
        private String positionName;
        private LocalDateTime startDate;
        private LocalDateTime endDate;
        private ElectionStatus status;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getPositionName() {
            return positionName;
        }

        public void setPositionName(String positionName) {
            this.positionName = positionName;
        }

        public LocalDateTime getStartDate() {
            return startDate;
        }

        public void setStartDate(LocalDateTime startDate) {
            this.startDate = startDate;
        }

        public LocalDateTime getEndDate() {
            return endDate;
        }

        public void setEndDate(LocalDateTime endDate) {
            this.endDate = endDate;
        }

        public ElectionStatus getStatus() {
            return status;
        }

        public void setStatus(ElectionStatus status) {
            this.status = status;
        }
    }


    public static class ParticipantResponse {

        private Long userId;
        private String fullName;
        private String iitId;
        private String email;
        private String department;
        private String academicYear;


        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
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


        public String getAcademicYear() {
            return academicYear;
        }

        public void setAcademicYear(String academicYear) {
            this.academicYear = academicYear;
        }

    }


    public static class CandidateVoteResponse {

        private Long candidateId;
        private String candidateName;
        private String imageUrl;
        private long voteCount;


        public Long getCandidateId() {
            return candidateId;
        }

        public void setCandidateId(Long candidateId) {
            this.candidateId = candidateId;
        }


        public String getCandidateName() {
            return candidateName;
        }

        public void setCandidateName(String candidateName) {
            this.candidateName = candidateName;
        }


        public String getImageUrl() {
            return imageUrl;
        }

        public void setImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
        }


        public long getVoteCount() {
            return voteCount;
        }

        public void setVoteCount(long voteCount) {
            this.voteCount = voteCount;
        }
    }

    public static class UserElectionResponse{

        private Long id;
        private String title;
        private String positionName;
        private String description;
        private String accessCode;
        private LocalDateTime startDate;
        private LocalDateTime endDate;
        private ElectionStatus status;
        private List<CandidateResponse> candidates;



        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getPositionName() {
            return positionName;
        }

        public void setPositionName(String positionName) {
            this.positionName = positionName;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getAccessCode() {
            return accessCode;
        }

        public void setAccessCode(String accessCode) {
            this.accessCode = accessCode;
        }

        public LocalDateTime getStartDate() {
            return startDate;
        }

        public void setStartDate(LocalDateTime startDate) {
            this.startDate = startDate;
        }

        public LocalDateTime getEndDate() {
            return endDate;
        }

        public void setEndDate(LocalDateTime endDate) {
            this.endDate = endDate;
        }

        public ElectionStatus getStatus() {
            return status;
        }

        public void setStatus(ElectionStatus status) {
            this.status = status;
        }

        public List<CandidateResponse> getCandidates() {
            return candidates;
        }

        public void setCandidates(List<CandidateResponse> candidates) {
            this.candidates = candidates;
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

    public static class DashboardResponse {

        private long totalElections;

        private long activeElections;

        private long draftElections;

        private long completedElections;

        private List<ElectionResponse> recentElections;


        public long getTotalElections() {
            return totalElections;
        }

        public void setTotalElections(long totalElections) {
            this.totalElections = totalElections;
        }


        public long getActiveElections() {
            return activeElections;
        }

        public void setActiveElections(long activeElections) {
            this.activeElections = activeElections;
        }


        public long getDraftElections() {
            return draftElections;
        }

        public void setDraftElections(long draftElections) {
            this.draftElections = draftElections;
        }


        public long getCompletedElections() {
            return completedElections;
        }

        public void setCompletedElections(long completedElections) {
            this.completedElections = completedElections;
        }


        public List<ElectionResponse> getRecentElections() {
            return recentElections;
        }

        public void setRecentElections(
                List<ElectionResponse> recentElections
        ) {
            this.recentElections = recentElections;
        }
    }

}