package cl.ucm.coffee.service;

import cl.ucm.coffee.persitence.entity.TestimonialsEntity;
import cl.ucm.coffee.persitence.repository.TestimonialsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestimonialsService implements ITestimonialsService {

    @Autowired
    private TestimonialsRepository testimonialsRepository;

    @Override
    public ResponseEntity<?> create(TestimonialsEntity testimonialsEntity) {
        testimonialsRepository.save(testimonialsEntity);
        return ResponseEntity.ok("{\"message\": \"Testimonial created successfully\"}");
    }

    @Override
    public ResponseEntity<?> findByCoffeeId(int coffeeId) {
        List<TestimonialsEntity> testimonials = testimonialsRepository.findByCoffee_IdCoffee(coffeeId);
        return ResponseEntity.ok(testimonials);
    }

    @Override
    public void deleteByCoffeeId(int idCoffee) {
        testimonialsRepository.deleteByCoffeeId(idCoffee);
    }
}
