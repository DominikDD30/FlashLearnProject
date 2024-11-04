package com.example.FlashLearn.controller;

import com.example.FlashLearn.exception.BadRegisterData;
import com.example.FlashLearn.infractructure.database.entity.UserEntity;
import com.example.FlashLearn.infractructure.security.AuthRequest;
import com.example.FlashLearn.infractructure.security.AuthenticateService;
import com.example.FlashLearn.infractructure.security.AuthenticationResponse;
import com.example.FlashLearn.infractructure.security.UserDataDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import static org.apache.naming.ResourceRef.AUTH;

@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping(AUTH)
public class AuthenticationController {
    private static final String AUTH="/auth";

    private AuthenticateService authenticateService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody AuthRequest request
    ){
        try {
            return ResponseEntity.ok(authenticateService.register(request));
        }catch (BadRegisterData exc){
            return ResponseEntity.badRequest().build();
        }
    }


    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthRequest request
    ) {
        try {
            return ResponseEntity.ok(authenticateService.authenticate(request));
        }catch(UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/userData")
    public ResponseEntity<UserDataDto> getUserData(@RequestBody String token){
        try {
            UserEntity userData = authenticateService.getUserData(token);
            return ResponseEntity.ok(new UserDataDto(userData.getUserId(), userData.getEmail()));
        }catch (RuntimeException exc){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}
