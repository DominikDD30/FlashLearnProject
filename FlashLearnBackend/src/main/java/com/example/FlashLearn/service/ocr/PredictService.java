package com.example.FlashLearn.service.ocr;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class PredictService {
    public GroupingMethod predictGroupingMethod(String text,Language lang) {
//        int linesThatStartingWithNumber= (int) Arrays.stream(text.split("\n"))
//                .filter(line->!line.isEmpty() && Character.isDigit(line.charAt(0))).count();
        if(checkIfIsNumberQuestionAndTrueFalseAnswer(text,lang)){
            return GroupingMethod.NUMERATED_QUESTIONS_AND_TRUE_FALSE_ANSWERS;
        }
        else if(checkIfIsNumberQuestionAndLetterAnswersType(text)){
            return GroupingMethod.NUMERATED_QUESTIONS_AND_LETTER_ANSWERS;
        }else{
            return GroupingMethod.NOTHING_FOUND;
        }
    }

    private boolean checkIfIsNumberQuestionAndTrueFalseAnswer(String text, Language lang) {
        int positiveTests=0;
        Optional<String> lineThatStartsWithNumber1=findLineThatStartsWith(text,'1');
        Optional<String> lineThatStartsWithNumber2=findLineThatStartsWith(text,'2');
        Optional<String> lineThatStartsWithNumber3=findLineThatStartsWith(text,'3');

        if(lineThatStartsWithNumber1.isEmpty()&&lineThatStartsWithNumber2.isEmpty()&&lineThatStartsWithNumber3.isEmpty()){
            return false;
        }
        List<String>next2LinesAfterLineThatStartsWithNumber1=findTwoLinesAfterSpecifiedLine(text,lineThatStartsWithNumber1.get());
        List<String>next2LinesAfterLineThatStartsWithNumber2=findTwoLinesAfterSpecifiedLine(text,lineThatStartsWithNumber2.get());
        List<String>next2LinesAfterLineThatStartsWithNumber3=findTwoLinesAfterSpecifiedLine(text,lineThatStartsWithNumber3.get());
        boolean firstTest= checkIfLinesContainsTrueAndFalseAnswers(next2LinesAfterLineThatStartsWithNumber1,lang);
        boolean secondTest= checkIfLinesContainsTrueAndFalseAnswers(next2LinesAfterLineThatStartsWithNumber2,lang);
        boolean thirdTest= checkIfLinesContainsTrueAndFalseAnswers(next2LinesAfterLineThatStartsWithNumber3,lang);
        if(firstTest){positiveTests++;}
        if(secondTest){positiveTests++;}
        if(thirdTest){positiveTests++;}

        return positiveTests >=2;
    }

    private boolean checkIfLinesContainsTrueAndFalseAnswers(List<String> lines, Language lang) {
        String firstLine = lines.get(0).trim().toLowerCase();
        String secondLine = lines.get(1).trim().toLowerCase();
        boolean containsTrue;
        boolean containsFalse;
        if(lang.equals(Language.PL)){
           containsTrue= firstLine.contains("tak")||firstLine.contains("prawda");
            containsFalse= secondLine.contains("nie")||secondLine.contains("fałsz");
        }
        else{
            containsTrue= firstLine.contains("yes")||firstLine.contains("true");
            containsFalse= secondLine.contains("no")||secondLine.contains("false");
        }
        return containsTrue&&containsFalse;
    }

    private boolean checkIfIsNumberQuestionAndLetterAnswersType(String text) {
        int positiveTests=0;
        Optional<String> lineThatStartsWithNumber1=findLineThatStartsWith(text,'1');
        Optional<String> lineThatStartsWithNumber2=findLineThatStartsWith(text,'2');
        Optional<String> lineThatStartsWithNumber3=findLineThatStartsWith(text,'3');

        if(lineThatStartsWithNumber1.isEmpty()&&lineThatStartsWithNumber2.isEmpty()&&lineThatStartsWithNumber3.isEmpty()){
            return false;
        }

        List<String>next10LinesAfterLineThatStartsWithNumber1= findTenLinesAfterSpecifiedLine(text,lineThatStartsWithNumber1.get());
        List<String>next10LinesAfterLineThatStartsWithNumber2= findTenLinesAfterSpecifiedLine(text,lineThatStartsWithNumber2.get());
        List<String>next10LinesAfterLineThatStartsWithNumber3= findTenLinesAfterSpecifiedLine(text,lineThatStartsWithNumber3.get());

        boolean firstTest=checkIfSomeOfLinesStartsWithLetterAandFollowedLineStartsWithB(next10LinesAfterLineThatStartsWithNumber1);
        boolean secondTest=checkIfSomeOfLinesStartsWithLetterAandFollowedLineStartsWithB(next10LinesAfterLineThatStartsWithNumber2);
        boolean thirdTest=checkIfSomeOfLinesStartsWithLetterAandFollowedLineStartsWithB(next10LinesAfterLineThatStartsWithNumber3);
        if(firstTest){positiveTests++;}
        if(secondTest){positiveTests++;}
        if(thirdTest){positiveTests++;}

        return positiveTests >=2;
    }


    private Optional<String> findLineThatStartsWith(String text, char flag) {
       return Arrays.stream(text.split("\n"))
                .filter(line->!line.isEmpty() && line.trim().charAt(0)==flag).findAny();
    }


    public static List<String> findTenLinesAfterSpecifiedLine(String text, String line) {
        List<String> result = new ArrayList<>();
        String[] lines = text.split("\n");
        boolean found = false;
        for (int i = 0; i < lines.length; i++) {
            if (lines[i].equals(line)) {
                found = true;
                // Add the next 3 non-empty lines after the found line
                for (int j = i + 1; j < lines.length && result.size() < 10; j++) {
                    if (!lines[j].isEmpty()) {
                        result.add(lines[j]);
                    }
                }
                break;
            }
        }
        return result;
    }

    public List<String> findTwoLinesAfterSpecifiedLine(String text, String line) {
      return findTenLinesAfterSpecifiedLine(text, line).subList(0,2);
    }

    public boolean checkIfSomeOfLinesStartsWithLetterAandFollowedLineStartsWithB(List<String> lines) {
        boolean foundA = false;
        for (String line : lines) {
            char firstChar = line.trim().toLowerCase().charAt(0);
            if (!line.isEmpty() && firstChar == 'a') {
                foundA = true;
            } else if (foundA && !line.isEmpty() && firstChar == 'b') {
                return true;
            }
        }
        return false;
    }

}
