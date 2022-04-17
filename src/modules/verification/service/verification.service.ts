import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Verification } from '../../../database/entities/verification.entity';
import { CreateVerificationDto } from '../dtos/create.verification.dto';
import { VerificationRepository } from '../../../database/repositories/verification.repository';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(VerificationRepository)
    private verificationRepository: VerificationRepository,
  ) {}

  async createVerification(
    createVerification: CreateVerificationDto,
  ): Promise<Verification> {
    return this.verificationRepository.createVerification(createVerification);
  }

  async findAllVerification(): Promise<Verification[]> {
    return this.verificationRepository.findAllVerifications();
  }

  async findOneVerification(id: string): Promise<Verification> {
    const found = await this.verificationRepository.findOneVerification(id);
    if (!found) {
      throw new NotFoundException(`Verification with ID "${id}" not found`);
    }
    return found;
  }

  // async updateVerification(
  //   id: string,
  //   createVerification: CreateVerificationDto,
  // ): Promise<Verification> {
  //   return this.verificationRepository.updateVerification(
  //     id,
  //     createVerification,
  //   );
  // }

  // async deleteVerification(id: string): Promise<void> {
  //   const verification = await this.verificationRepository.findOneVerification(
  //     id,
  //   );
  //   if (!verification) {
  //     throw new NotFoundException(`Verification with ID "${id}" not found`);
  //   }
  //   await this.verificationRepository.deleteVerification(id);
  // }
}
