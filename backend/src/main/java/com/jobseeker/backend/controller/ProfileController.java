package com.jobseeker.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobseeker.backend.service.ProfileService;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    // Save user's selected skills
    @PostMapping("/save")
    public String saveProfile(
            @RequestParam String username,
            @RequestBody List<Integer> skillIds) {
        return profileService.saveProfile(username, skillIds);
    }

    // Get user's saved skill IDs (so Profile page can pre-highlight them)
    @GetMapping("/skills/{username}")
    public List<Integer> getUserSkills(@PathVariable String username) {
        return profileService.getUserSkills(username);
    }

    // Save user's location
    @PostMapping("/location")
    public String saveLocation(
            @RequestParam String username,
            @RequestParam String location) {
        return profileService.saveLocation(username, location);
    }

    // Get user's saved location (so Profile page can pre-fill it)
    @GetMapping("/location/{username}")
    public String getUserLocation(@PathVariable String username) {
        return profileService.getUserLocation(username);
    }
}