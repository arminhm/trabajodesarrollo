package cl.ucm.coffee.service;

import cl.ucm.coffee.persitence.entity.CoffeeEntity;
import cl.ucm.coffee.persitence.repository.CoffeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoffeeService implements ICoffeeService {

    @Autowired
    private CoffeeRepository coffeeRepository;

    @Autowired
    private ITestimonialsService testimonialsService;

    @Override
    public ResponseEntity<?> create(String name, int price, String description, String foto) {
        CoffeeEntity coffee = new CoffeeEntity();
        coffee.setName(name);
        coffee.setPrice(price);
        coffee.setDescription(description);
        coffee.setImage64(foto);

        coffeeRepository.save(coffee);
        return ResponseEntity.ok("{\"message\": \"Coffee created successfully\"}");
    }

    @Override
    public ResponseEntity<?> coffeeList() {
        List<CoffeeEntity> coffeeList = coffeeRepository.findAll();
        return ResponseEntity.ok(coffeeList);
    }

    @Override
    public ResponseEntity<?> updateCoffee(CoffeeEntity coffeeEntity) {
        if (coffeeRepository.existsById(coffeeEntity.getIdCoffee())) {
            coffeeRepository.save(coffeeEntity);
            return ResponseEntity.ok("Coffee updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Coffee not found");
        }
    }

    @Override
    public ResponseEntity<?> deleteCoffee(int idCoffee) {
        if (coffeeRepository.existsById(idCoffee)) {
            testimonialsService.deleteByCoffeeId(idCoffee);
            coffeeRepository.deleteById(idCoffee);
            return ResponseEntity.ok("{\"message\": \"Coffee deleted successfully\"}");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"Coffee not found\"}");
        }
    }

    @Override
    public ResponseEntity<?> findByName(String name) {
        List<CoffeeEntity> coffees = coffeeRepository.findByNameStartingWith(name);
        return new ResponseEntity<>(coffees, HttpStatus.OK);
    }
}
