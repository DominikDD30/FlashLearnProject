package com.example.FlashLearn.infractructure.security;

import com.example.FlashLearn.exception.BadRegisterData;
import com.example.FlashLearn.infractructure.database.entity.UserEntity;
import com.example.FlashLearn.infractructure.database.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AuthenticateService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthenticationResponse register(AuthRequest request) {
        String regex = "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{7,}";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(request.getPassword());

        if (!matcher.matches()) {
           throw new RuntimeException("password not match requirements");
        }

        var user = UserEntity.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .active(true)
                .build();
        try {
            userRepository.save(user);
        }catch (RuntimeException e){
            throw new BadRegisterData();
        }
        return new AuthenticationResponse(jwtService.generateToken(user));
    }

    public AuthenticationResponse authenticate(AuthRequest request) {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            var user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException(
                            String.format("User with %s username not found", request.getEmail())));

            return new AuthenticationResponse(jwtService.generateToken(user));

    }


    public UserEntity getUserData(String token) {
        String username = jwtService.extractUsername(token);
       return userRepository.findByEmail(username).get();
    }
}
