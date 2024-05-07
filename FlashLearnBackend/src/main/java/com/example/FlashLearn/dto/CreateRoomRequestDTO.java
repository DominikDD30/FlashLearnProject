package com.example.FlashLearn.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateRoomRequestDTO {
    private Integer setId;
    private Integer pairs;
}
