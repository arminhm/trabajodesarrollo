package cl.ucm.coffee.web.controller;

import cl.ucm.coffee.persitence.entity.CoffeeEntity;
import cl.ucm.coffee.service.ICoffeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;

@RestController
@RequestMapping("/api/coffee")
public class CoffeeController {

    @Autowired
    private ICoffeeService coffeeService;

    @PostMapping("/create")
    public ResponseEntity<?> createCoffee(
            @RequestParam("name") String name,
            @RequestParam("price") int price,
            @RequestParam("description") String description,
            @RequestParam(value = "foto", required = false) String foto) {
        try {
            String imageBase64 = foto != null ? foto : null;
            return coffeeService.create(name, price, description, imageBase64);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"error\": \"Error creating coffee\"}");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateCoffee(
            @RequestParam("idCoffee") int idCoffee,
            @RequestParam("name") String name,
            @RequestParam("price") int price,
            @RequestParam("description") String description,
            @RequestParam(value = "foto", required = false) String foto) {
        try {
            String imageBase64 = foto != null ? foto : null;
            CoffeeEntity coffeeEntity = new CoffeeEntity();
            coffeeEntity.setIdCoffee(idCoffee);
            coffeeEntity.setName(name);
            coffeeEntity.setPrice(price);
            coffeeEntity.setDescription(description);
            coffeeEntity.setImage64(imageBase64);
            return coffeeService.updateCoffee(coffeeEntity);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"error\": \"Error updating coffee\"}");
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> listCoffees() {
        return coffeeService.coffeeList();
    }

    @DeleteMapping("/delete/{idCoffee}")
    public ResponseEntity<?> deleteCoffee(@PathVariable("idCoffee") int idCoffee) {
        return coffeeService.deleteCoffee(idCoffee);
    }

    @GetMapping("/findByName")
    public ResponseEntity<?> findByName(@RequestParam String name) {
        return coffeeService.findByName(name);
    }




}
