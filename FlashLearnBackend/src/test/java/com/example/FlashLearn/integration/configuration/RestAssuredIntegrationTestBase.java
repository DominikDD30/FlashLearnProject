package com.example.FlashLearn.integration.configuration;

import com.example.FlashLearn.integration.support.ControllerTestSupport;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.core.WireMockConfiguration;
import com.github.tomakehurst.wiremock.extension.responsetemplating.ResponseTemplateTransformer;
import io.restassured.RestAssured;
import io.restassured.config.ObjectMapperConfig;
import io.restassured.config.RestAssuredConfig;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.web.server.LocalServerPort;

import static org.assertj.core.api.Assertions.assertThat;

public abstract class RestAssuredIntegrationTestBase extends AbstractIT
implements ControllerTestSupport {

    @LocalServerPort
    protected int port;

    @Value("${server.servlet.context-path}")
    protected String basePath;


    protected static WireMockServer wireMockServer;

    @BeforeAll
    static void beforeAll(){
        wireMockServer= new WireMockServer(
                WireMockConfiguration.wireMockConfig()
                        .port(9999)
                        .extensions(new ResponseTemplateTransformer(null,false,null,null))
        );
        wireMockServer.start();
    }

    @AfterAll
    static void afterAll(){
        wireMockServer.stop();
    }

    @AfterEach
     void afterEach(){
        wireMockServer.resetAll();
    }

    @Autowired
    private ObjectMapper objectMapper;


    @Override
    public ObjectMapper getObjectMapper() {
        return objectMapper;
    }

    public RequestSpecification requestSpecification(){
       return RestAssured
                .given()
                .config(getConfig())
               .basePath(basePath)
               .port(port)
                .accept(ContentType.JSON)
                .contentType(ContentType.JSON);
    }

    private RestAssuredConfig getConfig() {
        return RestAssuredConfig.config()
                .objectMapperConfig(new ObjectMapperConfig()
                        .jackson2ObjectMapperFactory((type, s) -> objectMapper));
    }

    @Test
    void contextLoaded() {
        assertThat(true).isTrue();
    }



}
