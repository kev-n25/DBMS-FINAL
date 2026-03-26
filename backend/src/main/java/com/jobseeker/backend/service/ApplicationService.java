package com.jobseeker.backend.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobseeker.backend.model.Application;
import com.jobseeker.backend.model.Job;
import com.jobseeker.backend.model.User;
import com.jobseeker.backend.repository.ApplicationRepository;
import com.jobseeker.backend.repository.JobRepository;
import com.jobseeker.backend.repository.UserRepository;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    // Apply to a job with form details
    public String apply(String username, int jobId, String fullName, String phone,
                        String education, String experience, String coverLetter) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (applicationRepository.existsByUserIdAndJobId(user.getId(), jobId)) {
            return "Already applied!";
        }

        Application app = new Application();
        app.setUserId(user.getId());
        app.setJobId(jobId);
        app.setStatus("Applied");
        app.setFullName(fullName);
        app.setPhone(phone);
        app.setEducation(education);
        app.setExperience(experience);
        app.setCoverLetter(coverLetter);
        applicationRepository.save(app);
        return "Application submitted!";
    }

    // Get all applications for a user with job details
    public List<Map<String, Object>> getUserApplications(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Application> applications = applicationRepository.findByUserId(user.getId());
        List<Map<String, Object>> result = new ArrayList<>();

        for (Application app : applications) {
            Job job = jobRepository.findById(app.getJobId()).orElse(null);
            if (job != null) {
                Map<String, Object> entry = new LinkedHashMap<>();
                entry.put("applicationId", app.getId());
                entry.put("status", app.getStatus());
                entry.put("appliedAt", app.getAppliedAt());
                entry.put("fullName", app.getFullName());
                entry.put("phone", app.getPhone());
                entry.put("education", app.getEducation());
                entry.put("experience", app.getExperience());
                entry.put("coverLetter", app.getCoverLetter());
                entry.put("jobId", job.getId());
                entry.put("title", job.getTitle());
                entry.put("company", job.getCompany());
                entry.put("location", job.getLocation());
                entry.put("description", job.getDescription());
                entry.put("requiredEducation", job.getRequiredEducation());
                result.add(entry);
            }
        }
        return result;
    }

    // Get applied job IDs
    public List<Integer> getAppliedJobIds(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Application> apps = applicationRepository.findByUserId(user.getId());
        List<Integer> ids = new ArrayList<>();
        for (Application app : apps) {
            ids.add(app.getJobId());
        }
        return ids;
    }
}