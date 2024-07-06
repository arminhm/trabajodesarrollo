package cl.ucm.coffee.service;

import cl.ucm.coffee.persitence.entity.UserEntity;
import cl.ucm.coffee.persitence.entity.UserRoleEntity;
import cl.ucm.coffee.persitence.repository.UserRepository;
import cl.ucm.coffee.service.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String createUser(UserDto userDto) {
        if (userRepository.existsById(userDto.getUsername())) {
            throw new RuntimeException("El usuario ya existe");
        }

        UserEntity user = new UserEntity();
        user.setUsername(userDto.getUsername());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setEmail(userDto.getEmail());
        user.setFullName(userDto.getFullName());
        user.setLocked(userDto.getLocked() != null ? userDto.getLocked() : false);
        user.setDisabled(userDto.getDisabled() != null ? userDto.getDisabled() : false);

        UserRoleEntity role = new UserRoleEntity();
        role.setRole("CLIENTE");
        role.setUser(user);
        role.setGrantedDate(new Timestamp(System.currentTimeMillis()));
        user.setRoles(Collections.singletonList(role));

        userRepository.save(user);
        return "Usuario agregado correctamente";
    }

    public String updateUser(UserDto userDto) {
        UserEntity user = userRepository.findById(userDto.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setEmail(userDto.getEmail());
        user.setFullName(userDto.getFullName());
        user.setLocked(userDto.getLocked());
        user.setDisabled(userDto.getDisabled());

        userRepository.save(user);
        return "Usuario actualizado correctamente";
    }

    public UserEntity findByUsername(String username) {
        return userRepository.findById(username).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public String updateUserStatus(UserDto userDto) {
        UserEntity user = userRepository.findById(userDto.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));
        user.setLocked(userDto.getLocked());
        user.setDisabled(userDto.getDisabled());

        userRepository.save(user);
        return "Estado del usuario actualizado correctamente";
    }

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

}
