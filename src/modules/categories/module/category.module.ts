import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../../../modules/user/module/user.module';
import { CategoryService } from '../services/category.service';
import { CategoryRepository } from '../../../database/repositories/category.repository';
import { CategoryItemRepository } from '../../../database/repositories/category.item.repository';
import { CategoryController } from '../controller/category.controller';
import { Judges } from 'src/database/entities/judges.entity';
import { Category } from 'src/database/entities/category.entity';
import { Event } from 'src/database/entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoryRepository,
      CategoryItemRepository,
      Judges,
      Category,
      Event,
    ]),
    UserModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
