package com.jobseeker.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobseeker.backend.model.Job;
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
        // Get user id
        int userId = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();

        // Get user's skill ids
        List<Integer> skillIds = userSkillRepository.findByUserId(userId)
                .stream()
                .map(UserSkill::getSkillId)
                .collect(Collectors.toList());

        if (skillIds.isEmpty()) {
            return jobRepository.findAll();
        }

        // Get matching jobs
        return jobRepository.findJobsBySkillIds(skillIds);
    }
}