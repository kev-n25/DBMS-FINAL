package com.jobseeker.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobseeker.backend.service.ApplicationService;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    // Apply to a job with form details
    @PostMapping("/apply")
    public String apply(
            @RequestParam String username,
            @RequestParam int jobId,
            @RequestParam String fullName,
            @RequestParam String phone,
            @RequestParam String education,
            @RequestParam String experience,
            @RequestParam(required = false, defaultValue = "") String coverLetter) {
        return applicationService.apply(username, jobId, fullName, phone, education, experience, coverLetter);
    }

    // Get all applications with job details
    @GetMapping("/{username}")
    public List<Map<String, Object>> getUserApplications(@PathVariable String username) {
        return applicationService.getUserApplications(username);
    }

    // Get applied job IDs
    @GetMapping("/applied-ids/{username}")
    public List<Integer> getAppliedJobIds(@PathVariable String username) {
        return applicationService.getAppliedJobIds(username);
    }
}