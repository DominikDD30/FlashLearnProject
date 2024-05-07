package com.example.FlashLearn.service.ocr;

import com.example.FlashLearn.dto.AnswerDTO;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class NumberThenLettersGroupingService implements GroupingService{
    private boolean isLongerAnswerOption=false;
    private boolean isFirstLap =true;
    private String tempQuestion;
    private String tempAnswer;
    private List<AnswerDTO> tempAnswers=new ArrayList<>();
    private int answerCounter=97;
    @Override
    public Map<String, List<AnswerDTO>> extractQuizItems(String text,Language lang) {
        Map<String, List<AnswerDTO>> result=new LinkedHashMap<>();
        String[] lines = text.split("\n");

        for (String s : lines) {
            String line = s.trim();
            if (!line.isEmpty()) {
                if (Character.isDigit(line.charAt(0)) ) {
                    if(!isFirstLap){
                    result.put(tempQuestion.substring(2), tempAnswers);
                    }
                    tempQuestion = line;
                    isFirstLap = false;
                    answerCounter=97;
                    tempAnswers=new ArrayList<>();
                    continue;
                }
                if (!isFirstLap) {
                    if (line.toLowerCase().charAt(0) != (char)answerCounter&&answerCounter==97) {
                        tempQuestion=tempQuestion.concat(" "+line);
                    }
                    else if (line.toLowerCase().charAt(0) == (char) answerCounter) {
                            tempAnswers.add(new AnswerDTO(answerCounter - 96, line, false));
                            tempAnswer=line;
                            answerCounter++;
                        } else{
                            tempAnswers.removeLast();
                            tempAnswers.add(new AnswerDTO(answerCounter - 97,tempAnswer.concat(" "+line), false));
                        tempAnswer=tempAnswer.concat(line);
                        }
                }
            }
        }
        return result;
    }


    private void endLookingForAnswer() {
        isFirstLap =false;
        answerCounter=97;
        tempAnswers=new ArrayList<>();
    }



}
