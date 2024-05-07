package com.example.FlashLearn.integration;


import com.example.FlashLearn.dto.FlashcardDTO;
import com.example.FlashLearn.integration.configuration.RestAssuredIntegrationTestBase;
import com.example.FlashLearn.integration.support.WireMockTestSupport;
import com.example.FlashLearn.service.PexelService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@ExtendWith(MockitoExtension.class)
class PexelIT extends RestAssuredIntegrationTestBase implements WireMockTestSupport {


    @Autowired
    private PexelService pexelService;

    @Test
    void getPexelImagesCorrectly() {
        //given
        List<String> requestedImages = List.of("cat", "dog");
        stubForPexelImages(wireMockServer);


        List<FlashcardDTO> result = pexelService.findImagesForFlashcards(requestedImages);
        //then
        Assertions.assertThat(result).hasSize(2);
        FlashcardDTO catCard = result.stream().filter(i -> i.getConcept().equals("cat")).findAny().get();
        Assertions.assertThat(catCard.getImage()).isEqualTo("https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280");
    }




}