package com.example.FlashLearn.integration.support;

import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.WireMock;

public interface WireMockTestSupport {

    default void stubForfindImageForflashcard(final WireMockServer wireMockServer) {
//        wireMockServer.stubFor(WireMock.get(WireMock.urlPathEqualTo("/search?per_page=1&query=cat"))
        wireMockServer.stubFor(WireMock.get(WireMock.anyUrl())
                .willReturn(WireMock.aResponse()
                        .withHeader("Content-Type", "application/json")
                        .withBodyFile("wiremock/pexel1.json")
                        .withTransformers("response-template")));
    }


}
