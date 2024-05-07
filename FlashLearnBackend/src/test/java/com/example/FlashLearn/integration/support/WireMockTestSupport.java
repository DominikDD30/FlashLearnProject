package com.example.FlashLearn.integration.support;

import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.WireMock;
import com.github.tomakehurst.wiremock.junit.WireMockRule;

import static com.github.tomakehurst.wiremock.stubbing.Scenario.STARTED;

public interface WireMockTestSupport {

    default void stubForPexelImages(final WireMockServer wireMockServer) {
        wireMockServer.stubFor(WireMock.post(WireMock.urlPathEqualTo("/pexel"))
                .willReturn(WireMock.aResponse()
                        .withHeader("Content-Type", "application/json")
                        .withBodyFile("wiremock/pexelImage1.json")
                        .withTransformers("response-template")));
    }


}
