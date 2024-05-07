package com.example.FlashLearn.dto.game;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    private String senderName;
    private String receiverName;
    private String message;
    private Status status;
}
