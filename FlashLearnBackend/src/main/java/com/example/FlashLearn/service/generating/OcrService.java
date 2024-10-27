package com.example.FlashLearn.service.generating;

import com.example.FlashLearn.dto.AnswerDTO;
import lombok.RequiredArgsConstructor;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OcrService {

    private final PredictService predictService;
    private GroupingService groupingService;


    public Map<String, List<AnswerDTO>> ocrImageAndCreateQuizItems(MultipartFile multipartFile) throws IOException {
        String result = ocrFile(multipartFile);
        GroupingMethod groupingMethod = predictService.predictGroupingMethod(result, Language.PL);
        switch (groupingMethod) {
            case NUMERATED_QUESTIONS_AND_LETTER_ANSWERS -> groupingService = new NumberThenLettersGroupingService();
            case NUMERATED_QUESTIONS_AND_TRUE_FALSE_ANSWERS -> groupingService = new NumberThenBooleanGroupingService();
        }
        if (groupingMethod.equals(GroupingMethod.NOTHING_FOUND)) {
            return null;
        }
        return groupingService.extractQuizItems(result, Language.PL);
    }



    public String ocrFile(MultipartFile file) {
        try {
            Tesseract tesseract = new Tesseract();
            tesseract.setDatapath("/usr/share/tesseract/tessdata");
//             tesseract.setDatapath("Tesseract-OCR/tessdata");

            File imageFile = convertMultiPartToFile(file);
            String result = tesseract.doOCR(imageFile);

            if (imageFile.exists()) {
                imageFile.delete();
            }
            return result;
        } catch (IOException | TesseractException e) {
            throw new RuntimeException("Błąd podczas przetwarzania pliku OCR: " + e.getMessage(), e);
        }
    }

private File convertMultiPartToFile(MultipartFile file) throws IOException {
    File convFile = new File(System.getProperty("java.io.tmpdir") + "/" + file.getName() + ".pdf");
    file.transferTo(convFile);
    return convFile;
}


}
