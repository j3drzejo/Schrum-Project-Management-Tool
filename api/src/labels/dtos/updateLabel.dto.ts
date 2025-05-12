import { PartialType } from '@nestjs/mapped-types';
import { CreateLabelDto } from './createLabel.dto';

export class UpdateLabelDto extends PartialType(CreateLabelDto) {}
