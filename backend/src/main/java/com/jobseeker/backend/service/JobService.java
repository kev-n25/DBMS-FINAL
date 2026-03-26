package com.jobseeker.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobseeker.backend.model.Job;
import com.jobseeker.backend.model.User;
import com.jobseeker.backend.model.UserSkill;
import com.jobseeker.backend.repository.JobRepository;
import com.jobseeker.backend.repository.UserRepository;
import com.jobseeker.backend.repository.UserSkillRepository;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserSkillRepository userSkillRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public List<Job> getMatchingJobs(String username) {
        // Get user
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Get user's skill IDs
        List<Integer> skillIds = userSkillRepository.findByUserId(user.getId())
                .stream()
                .map(UserSkill::getSkillId)
                .collect(Collectors.toList());

        String location = user.getLocation();

        boolean hasSkills = !skillIds.isEmpty();
        boolean hasLocation = location != null && !location.trim().isEmpty();

        // Match by BOTH skills and location (best match)
        if (hasSkills && hasLocation) {
            return jobRepository.findJobsBySkillIdsAndLocation(skillIds, location);
        }

        // Match by skills only (no location set)
        if (hasSkills) {
            return jobRepository.findJobsBySkillIds(skillIds);
        }

        // Match by location only (no skills set)
        if (hasLocation) {
            return jobRepository.findByLocation(location);
        }

        // No skills, no location — return all jobs
        return jobRepository.findAll();
    }
}