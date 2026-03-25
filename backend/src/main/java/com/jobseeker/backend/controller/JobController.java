package com.jobseeker.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobseeker.backend.model.Job;
import com.jobseeker.backend.model.Skill;
import com.jobseeker.backend.repository.SkillRepository;
import com.jobseeker.backend.service.JobService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class JobController {

    @Autowired
    private JobService jobService;

    @Autowired
    private SkillRepository skillRepository;

    // Get all skills
    @GetMapping("/skills")
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    // Get all jobs
    @GetMapping("/jobs")
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    // Get matching jobs for user
    @GetMapping("/jobs/match/{username}")
    public List<Job> getMatchingJobs(@PathVariable String username) {
        return jobService.getMatchingJobs(username);
    }
}