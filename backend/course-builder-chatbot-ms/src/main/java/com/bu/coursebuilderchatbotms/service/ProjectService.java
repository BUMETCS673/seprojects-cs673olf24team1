package com.bu.coursebuilderchatbotms.service;

import com.bu.coursebuilderchatbotms.domain.Projects;
import com.bu.coursebuilderchatbotms.dao.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public List<Projects> getAllProjects() {
        return projectRepository.findAll();
    }

    public Projects getProjectById(Long id) {
        return projectRepository.findById(id).orElse(null);
    }

    public Projects createProject(Projects project) {
        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}