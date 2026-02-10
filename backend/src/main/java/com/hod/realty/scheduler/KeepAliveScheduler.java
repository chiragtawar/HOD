package com.hod.realty.scheduler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class KeepAliveScheduler {

    private static final Logger logger = LoggerFactory.getLogger(KeepAliveScheduler.class);
    private final RestTemplate restTemplate = new RestTemplate();
    private static final String URL = "https://www.houseofdreamsrealty.in/";

    @Scheduled(fixedRate = 120000) // 2 minutes
    public void pingWebsite() {
        try {
            logger.info("Pinging website: {}", URL);
            restTemplate.getForObject(URL, String.class);
            logger.info("Website pinged successfully.");
        } catch (Exception e) {
            logger.error("Failed to ping website: {}", e.getMessage());
        }
    }
}
