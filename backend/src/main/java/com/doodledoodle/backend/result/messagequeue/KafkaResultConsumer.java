package com.doodledoodle.backend.result.messagequeue;

import com.doodledoodle.backend.global.kafka.KafkaConsumer;
import com.doodledoodle.backend.result.dto.kafka.ResultKafkaResponse;
import com.doodledoodle.backend.result.service.ResultServiceImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.experimental.FieldDefaults;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class KafkaResultConsumer implements KafkaConsumer<ResultKafkaResponse> {
    ResultServiceImpl resultService;
    ObjectMapper objectMapper;

    @Transactional
    @KafkaListener(topics = "doodledoodle.to.backend.result", containerFactory = "kafkaListenerContainerFactory")
    public void consume(final String message) {
        resultService.saveResults(readMessage(message));
    }

    @Override
    @SneakyThrows(JsonProcessingException.class)
    public ResultKafkaResponse readMessage(final String message) {
        return objectMapper.readValue(message, ResultKafkaResponse.class);
    }
}
