package com.example.FlashLearn.service.ocr;

import com.example.FlashLearn.dto.AnswerDTO;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class OcrService {

    private final PredictService predictService;
    private GroupingService groupingService;



    public Map<String, List<AnswerDTO>> ocrImageAndCreateQuizItems(MultipartFile multipartFile) throws IOException {
        System.out.println("mulit"+multipartFile);
        File imageFile = convertMultiPartToFile(multipartFile);
        System.out.println(imageFile);
        Tesseract tesseract = new Tesseract();

        try {
//            tesseract.setDatapath("src/main/resources/Tesseract-OCR/tessdata");

            tesseract.setDatapath("/usr/share/tesseract/tessdata");



//            tesseract.setDatapath("C:/Program Files/Tesseract-OCR/tessdata");

            String result = tesseract.doOCR(imageFile);

            if (imageFile.exists()) {
                imageFile.delete();
            }

            GroupingMethod groupingMethod = predictService.predictGroupingMethod(result,Language.PL);
            switch (groupingMethod){
                case NUMERATED_QUESTIONS_AND_LETTER_ANSWERS ->groupingService=new NumberThenLettersGroupingService();
                case NUMERATED_QUESTIONS_AND_TRUE_FALSE_ANSWERS ->groupingService=new NumberThenBooleanGroupingService();
            }
            if (groupingMethod.equals(GroupingMethod.NOTHING_FOUND)) {
                return null;
            }
           return groupingService.extractQuizItems(result,Language.PL);
        } catch (TesseractException e) {
            System.err.println(e.getMessage());
        }
        return null;
    }




    private File convertMultiPartToFile(MultipartFile file) throws IOException {
            File convFile = new File(System.getProperty("java.io.tmpdir")+"/"+file.getName()+".pdf");
             file.transferTo(convFile);
            return convFile;
    }
}
