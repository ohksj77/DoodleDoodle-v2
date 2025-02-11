package com.doodledoodle.backend.draw.mapper;

import com.doodledoodle.backend.draw.dto.response.DrawResponse;
import com.doodledoodle.backend.draw.entity.Draw;
import com.doodledoodle.backend.game.entity.Game;
import org.springframework.stereotype.Component;

@Component
public class DrawMapper {
    public Draw toEntity(final Integer playerNo, final Game game) {
        return Draw.builder()
                .game(game)
                .playerNo(playerNo)
                .build();
    }

    public DrawResponse toResponse(final Draw draw) {
        return DrawResponse.builder()
                .drawId(draw.getId())
                .build();
    }
}
