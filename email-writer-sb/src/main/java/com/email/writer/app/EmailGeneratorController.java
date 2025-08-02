package com.email.writer.app;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")

@CrossOrigin(origins = "*")
public class EmailGeneratorController {
    private  final  EmailGeneratorService emailGeneatorService;

    public EmailGeneratorController(EmailGeneratorService emailGeneatorService) {
        this.emailGeneatorService = emailGeneatorService;
    }

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest){
        String response=emailGeneatorService.generateEmailReply(emailRequest);
    return ResponseEntity.ok(response);


}

}
