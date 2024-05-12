package com.example.FlashLearn.service.generating;

import com.example.FlashLearn.dto.FlashcardDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FlashcardsGeneratingService {
    public List<FlashcardDTO> generate(String text, String xSep, String ySep) {
        if (xSep.equals("not")){
           return generateLineByLine(text,ySep);
        }
        else{
           return generateClassic(text,xSep,ySep);
        }
    }



    private List<FlashcardDTO> generateClassic(String text,String xSep,String ySep) {
        List<FlashcardDTO>result=new ArrayList<>();
        String[] splited = text.split(ySep.equals(";")?";":"\n");
        for (String line : splited) {
            String delimeter=xSep.equals("space")?" ":xSep;
            String[] splitedBySpace = line.split(delimeter);
            result.add(new FlashcardDTO(null, splitedBySpace[0], splitedBySpace[1], null));
        }
        return result;
    }

    private List<FlashcardDTO> generateLineByLine(String text,String ySep) {
        List<FlashcardDTO>result=new ArrayList<>();
        String[] splited = text.split(ySep.equals(";")?";":"\n");
        for (int i = 0; i < splited.length-1; i+=2) {
            result.add(new FlashcardDTO(null,splited[i],splited[i+1],null));
        }
        return result;
    }


}
