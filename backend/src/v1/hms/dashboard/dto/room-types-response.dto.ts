// src/rooms/dto/room-types-response.dto.ts
export class RoomTypesResponseDto {
    success: boolean;
    data: {
      [type: string]: string[]; // Room type as key, array of room numbers as value
    };
  }