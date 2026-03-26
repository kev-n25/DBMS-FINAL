package com.jobseeker.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobseeker.backend.model.User;
import com.jobseeker.backend.model.UserSkill;
import com.jobseeker.backend.repository.UserRepository;
import com.jobseeker.backend.repository.UserSkillRepository;

@Service
public class ProfileService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSkillRepository userSkillRepository;

    // Save user's selected skills (replaces old ones)
    public String saveProfile(String username, List<Integer> skillIds) {
        int userId = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();

        // Delete existing skills first
        userSkillRepository.deleteByUserId(userId);

        // Save new skills
        for (int skillId : skillIds) {
            UserSkill userSkill = new UserSkill();
            userSkill.setUserId(userId);
            userSkill.setSkillId(skillId);
            userSkillRepository.save(userSkill);
        }

        return "Profile saved successfully!";
    }

    // Get user's saved skill IDs
    public List<Integer> getUserSkills(String username) {
        int userId = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();

        return userSkillRepository.findByUserId(userId)
                .stream()
                .map(UserSkill::getSkillId)
                .collect(Collectors.toList());
    }

    // Save user's location
    public String saveLocation(String username, String location) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setLocation(location);
        userRepository.save(user);
        return "Location saved!";
    }

    // Get user's saved location
    public String getUserLocation(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getLocation() != null ? user.getLocation() : "";
    }
}