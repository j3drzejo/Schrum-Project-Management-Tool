import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsHexColor } from 'class-validator';

export class CreateLabelDto {
  @ApiProperty({
    description: 'Human-readable name for the label',
    example: 'Bug',
    minLength: 1,
    maxLength: 50,
  })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Hex color code for the label (e.g. used to style UI badges)',
    example: '#ff0000',
    pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
  })
  @IsHexColor({ message: 'Color must be a valid hex color code' })
  color: string;
}
