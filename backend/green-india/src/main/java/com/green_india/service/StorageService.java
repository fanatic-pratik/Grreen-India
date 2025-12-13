package com.green_india.service;



import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class StorageService {
    private final Path root = Paths.get(System.getProperty("user.dir"), "uploads");

    public StorageService() throws IOException {
        Files.createDirectories(root);
    }

    public String save(MultipartFile file) {
        try {
            String filename = UUID.randomUUID() + "-" + file.getOriginalFilename();
            Path uploadDir = Paths.get("uploads");
            Files.createDirectories(uploadDir);

            Path filePath = uploadDir.resolve(filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return filePath.toAbsolutePath().toString(); // ✅ THIS
        } catch (Exception e) {
            throw new RuntimeException("File save failed", e);
        }
    }

}
