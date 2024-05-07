package com.example.FlashLearn.infractructure.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.http.codec.json.Jackson2JsonDecoder;
import org.springframework.http.codec.json.Jackson2JsonEncoder;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.netty.http.client.HttpClient;

import java.net.URI;
import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Configuration
public class WebClientConfiguration {

    @Value("${api.pexels.url}")
    private String PEXELS_URL;

    @Value("${api.elevenlabs.url}")
    private String ELEVENLABS_URL;
    @Value("${api.pexels.apikey}")
    private  String PEXELS_API_KEY;

    @Value("${api.elevenlabs.apikey}")
    private  String ELEVENLABS_API_KEY;

    private static final int TIMEOUT=5000;

    @Bean
    public WebClient pexelWebClient(ObjectMapper objectMapper) {
        final var httpClient = HttpClient.create()
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, TIMEOUT)
                .responseTimeout(Duration.ofMillis(TIMEOUT))
                .doOnConnected(con ->
                        con.addHandlerLast(new ReadTimeoutHandler(TIMEOUT, TimeUnit.MILLISECONDS))
                                .addHandlerLast(new WriteTimeoutHandler(TIMEOUT, TimeUnit.MILLISECONDS)));


        return WebClient.builder()
                .baseUrl(PEXELS_URL)
                .exchangeStrategies(buildDefaultExchangeStrategies(objectMapper))
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .defaultHeader("Authorization",PEXELS_API_KEY)
                .build();
    }

    @Bean
    public WebClient elevenLabWebClient(ObjectMapper objectMapper) {
        final var httpClient = HttpClient.create()
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, TIMEOUT)
                .responseTimeout(Duration.ofMillis(TIMEOUT))
                .doOnConnected(con ->
                        con.addHandlerLast(new ReadTimeoutHandler(TIMEOUT, TimeUnit.MILLISECONDS))
                                .addHandlerLast(new WriteTimeoutHandler(TIMEOUT, TimeUnit.MILLISECONDS)));


        return WebClient.builder()
                .baseUrl(ELEVENLABS_URL)
                .exchangeStrategies(buildDefaultExchangeStrategies(objectMapper))
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .defaultHeader("xi-api-key",ELEVENLABS_API_KEY)
                .build();
    }



    private ExchangeStrategies buildDefaultExchangeStrategies(ObjectMapper objectMapper) {
        return ExchangeStrategies
                .builder()
                .codecs(configurer -> {
                    configurer
                            .defaultCodecs()
                            .jackson2JsonEncoder(new Jackson2JsonEncoder(
                                    objectMapper,
                                    MediaType.APPLICATION_JSON
                            ));
                    configurer
                            .defaultCodecs()
                            .jackson2JsonDecoder(new Jackson2JsonDecoder(
                                    objectMapper,
                                    MediaType.APPLICATION_JSON
                            ));
                }).build();
    }


}
