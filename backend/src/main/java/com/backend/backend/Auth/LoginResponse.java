package com.backend.backend.Auth;

import com.backend.backend.Models.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private User user;

    public LoginResponse(User user) {
        this.user = user;
    }
}
