package com.example.FlashLearn.service.generating;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InputDataForGenerating {
    private String text;
    private String xSeparator;
    private String ySeparator;
}
