package com.example.FlashLearn.infractructure.api;

import com.deepl.api.DeepLException;
import com.deepl.api.Translator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class DeeplClient {


    @Value("${api.deepl.apikey}")
    private  String DEEPL_API_KEY;
    public String translate(String text, String source, String target) throws DeepLException, InterruptedException {
        Translator translator = new Translator(DEEPL_API_KEY);
        return translator.translateText(text, source, target).getText();
    }
}
