import { PartialType } from '@nestjs/mapped-types';
import { CreateExamQandADto } from './create-exam-qand-a.dto';

export class UpdateExamQandADto extends PartialType(CreateExamQandADto) {}
