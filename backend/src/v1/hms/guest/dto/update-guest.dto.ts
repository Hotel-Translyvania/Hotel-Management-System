import { PartialType } from "@nestjs/mapped-types";
import { CreateGuestDto } from "./create-guest.dto";

export class UpdateGuestDto extends PartialType(CreateGuestDto) {
    // All properties from CreateGuestDto are optional in UpdateGuestDto
}