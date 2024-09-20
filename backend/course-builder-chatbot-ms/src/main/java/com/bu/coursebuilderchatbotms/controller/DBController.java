package com.bu.coursebuilderchatbotms.controller;

import com.bu.coursebuilderchatbotms.domain.Projects;
import com.bu.coursebuilderchatbotms.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class DBController {

    @Autowired
    private ProjectService projectService;

    // Get all projects
    @GetMapping
    public List<Projects> getAllProjects() {
        return projectService.getAllProjects();
    }

    // Get a single project by ID
    @GetMapping("/{id}")
    public Projects getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id);
    }

    // Create a new project
    @PostMapping
    public Projects createProject(@RequestBody Projects project) {
        return projectService.createProject(project);
    }

    // Delete a project by ID
    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
    }
}