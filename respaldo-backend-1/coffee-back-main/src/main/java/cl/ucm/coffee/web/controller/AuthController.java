package cl.ucm.coffee.web.controller;

import cl.ucm.coffee.persitence.entity.UserEntity;
import cl.ucm.coffee.service.UserService;
import cl.ucm.coffee.service.dto.LoginDto;
import cl.ucm.coffee.service.dto.UserDto;
import cl.ucm.coffee.web.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        UsernamePasswordAuthenticationToken login = new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());
        Authentication authentication = authenticationManager.authenticate(login);
        UserEntity user = userService.findByUsername(loginDto.getUsername());
        String role = authentication.getAuthorities().iterator().next().getAuthority();
        String jwt = jwtUtil.create(loginDto.getUsername(), user.getFullName(), role);
        Map<String, String> map = new HashMap<>();
        map.put("token", jwt);
        return ResponseEntity.ok(map);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody UserDto userDto) {
        String message = userService.createUser(userDto);
        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/updateUser")
    public ResponseEntity<?> updateUser(@RequestBody UserDto userDto) {
        String message = userService.updateUser(userDto);
        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/updateUserStatus")
    public ResponseEntity<?> updateUserStatus(@RequestBody UserDto userDto) {
        String message = userService.updateUserStatus(userDto);
        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        List<UserEntity> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }


}
