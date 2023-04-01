package com.doodledoodle.backend.game.dto.request;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GameRequestDto {

  @Max(value = 6, message = "인원수의 범위는 1 ~ 6이여야 합니다.")
  @Min(value = 1, message = "인원수의 범위는 1 ~ 6이여야 합니다.")
  private Integer userNum;

  //주의
  public GameRequestDto (Integer userNum) {
    this.userNum = userNum;
  }
}