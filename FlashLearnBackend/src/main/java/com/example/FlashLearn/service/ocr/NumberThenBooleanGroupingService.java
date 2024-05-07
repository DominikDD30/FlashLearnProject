package com.example.FlashLearn.service.ocr;

import com.example.FlashLearn.dto.AnswerDTO;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class NumberThenBooleanGroupingService implements GroupingService{
    @Override
    public  Map<String, List<AnswerDTO>> extractQuizItems(String text,Language lang) {
        Map<String, List<AnswerDTO>> questionAnswersMap = new LinkedHashMap<>();
        Scanner scanner = new Scanner(text);

        String question = "";
        int counter=1;
        List<AnswerDTO> answers =new ArrayList<>();
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (!line.isEmpty()) {
                if (Character.isDigit(line.charAt(0))) {
                    // Nowy numer - nowe pytanie
                    if (!question.isEmpty()) {
                        questionAnswersMap.put(question, answers);
                    }
                    question = line.substring(line.indexOf('.') + 2); // Pobierz pytanie bez numeru i spacji
                    answers = new ArrayList<>();
                    counter=1;
                } else {
                    // Dodaj odpowiedzi
                    if (checkIfLineContainsTrue(line,lang)) {
                        answers.add(new AnswerDTO(counter++,lang.equals(Language.PL)?"tak":"true",true));
                    }
                    else if(checkIfLineContainsFalse(line,lang)){
                        answers.add(new AnswerDTO(counter++,lang.equals(Language.PL)?"nie":"false",false));
                    }
                }
            }
        }
        if (!question.isEmpty()) {
            questionAnswersMap.put(question, answers);
        }
        scanner.close();
        return questionAnswersMap;
    }

    private boolean checkIfLineContainsTrue(String line,Language lang) {
        if(lang.equals(Language.PL)){
            return line.toLowerCase().startsWith("tak")||line.toLowerCase().startsWith("prawda");
        }else{
            return line.toLowerCase().startsWith("yes")||line.toLowerCase().startsWith("true");
        }
    }
    private boolean checkIfLineContainsFalse(String line,Language lang) {
        if(lang.equals(Language.PL)){
            return line.toLowerCase().startsWith("nie")||line.toLowerCase().startsWith("fałsz");
        }else{
            return line.toLowerCase().startsWith("no")||line.toLowerCase().startsWith("false");
        }
    }
}
