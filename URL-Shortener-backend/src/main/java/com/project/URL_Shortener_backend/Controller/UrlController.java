package com.project.URL_Shortener_backend.Controller;

import com.project.URL_Shortener_backend.Model.UrlMapping;
import com.project.URL_Shortener_backend.Repo.UrlRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UrlController {

    @Autowired
    private UrlRepo urlRepo;

    @PostMapping("/shorten")
    public Map<String, String> shortenUrl(@RequestBody Map<String, String> request) {
        String longUrl = request.get("longUrl");
        if (longUrl == null || longUrl.isEmpty()) {
            return Map.of("error", "Invalid URL");
        }

        String shortCode = UUID.randomUUID().toString().substring(0, 6);
        UrlMapping mapping = new UrlMapping(longUrl, shortCode);
        urlRepo.save(mapping);

        String shortUrl = "http://localhost:8080/" + shortCode;
        return Map.of("shortUrl", shortUrl);
    }

    @GetMapping("/{code}")
    public RedirectView redirect(@PathVariable String code) {
        return urlRepo.findByShortCode(code)
                .map(m -> new RedirectView(m.getLongUrl()))
                .orElseGet(() -> new RedirectView("https://example.com/not-found"));
    }
}
