package com.doodledoodle.backend.draw.controller.advice;

import com.doodledoodle.backend.draw.exception.InvalidFileConvertException;
import com.doodledoodle.backend.global.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;

@RestControllerAdvice
public class DrawErrorAdvice {
    @ExceptionHandler(IOException.class)
    public ResponseEntity<ErrorResponse> ioException(final IOException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(InvalidFileConvertException.class)
    public ResponseEntity<ErrorResponse> invalidFileConvertException(final InvalidFileConvertException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
    }
}
