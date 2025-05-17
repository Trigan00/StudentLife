import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  BadRequestException,
} from '@nestjs/common';
import { ExamQandAService } from './exam-qand-a.service';
import { CreateExamQandADto } from './dto/create-exam-qand-a.dto';
import { UpdateExamQandADto } from './dto/update-exam-qand-a.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('exam-qand-a')
export class ExamQandAController {
  constructor(private readonly examQandAService: ExamQandAService) {}

  @UsePipes(ValidationPipe)
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './QandA-uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  create(
    @Request() req,
    @UploadedFiles()
    files: Express.Multer.File[],
    @Body() createExamQandADto: CreateExamQandADto,
  ) {
    return this.examQandAService.create(
      +req.user.id,
      createExamQandADto,
      files,
    );
  }

  @Get(':id')
  findAll(@Param('id') classId: string) {
    return this.examQandAService.findAll(+classId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examQandAService.findOne(+id);
  }

  @UsePipes(ValidationPipe)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExamQandADto: UpdateExamQandADto,
  ) {
    return this.examQandAService.update(+id, updateExamQandADto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examQandAService.remove(+id);
  }
}
