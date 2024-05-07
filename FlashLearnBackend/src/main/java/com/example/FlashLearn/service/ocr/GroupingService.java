package com.example.FlashLearn.service.ocr;

import com.example.FlashLearn.dto.AnswerDTO;

import java.util.List;
import java.util.Map;

public interface GroupingService {
   Map<String, List<AnswerDTO>> extractQuizItems(String text,Language lang);

}
