package cl.ucm.coffee.service.dto;

import lombok.Data;

@Data
public class UserDto {
    private String username;
    private String password;
    private String email;
    private String fullName;
    private Boolean locked;
    private Boolean disabled;
}
