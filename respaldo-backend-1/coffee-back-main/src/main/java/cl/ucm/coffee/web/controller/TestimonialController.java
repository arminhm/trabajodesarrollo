package cl.ucm.coffee.web.controller;

import cl.ucm.coffee.persitence.entity.TestimonialsEntity;
import cl.ucm.coffee.service.ITestimonialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/testimonial")
public class TestimonialController {

    @Autowired
    private ITestimonialsService testimonialsService;

    @PostMapping("/create")
    public ResponseEntity<?> createTestimonial(@RequestBody TestimonialsEntity testimonial) {
        try {
            return testimonialsService.create(testimonial);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"error\": \"Error creating testimonial\"}");
        }
    }

    @GetMapping("/findByCoffeeId")
    public ResponseEntity<?> findByCoffeeId(@RequestParam int coffeeId) {
        return testimonialsService.findByCoffeeId(coffeeId);
    }
}
