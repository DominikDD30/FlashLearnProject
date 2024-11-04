package com.example.FlashLearn.service;

import com.example.FlashLearn.infractructure.database.entity.UserEntity;
import com.example.FlashLearn.infractructure.database.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;

    public UserEntity findUserById(int ownerId) {
        return userRepository.findById(ownerId).get();
    }
}
