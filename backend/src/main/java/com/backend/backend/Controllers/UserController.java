package com.backend.backend.Controllers;

import com.backend.backend.Services.UserService;
import com.backend.backend.Models.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
public class UserController
{
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllusers(){
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<User> adduser(@RequestBody User user){

        User newuser = userService.createUser(user);
        return new ResponseEntity<>(newuser, HttpStatus.CREATED);
    }
    
}