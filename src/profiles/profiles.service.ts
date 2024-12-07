import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProfilesService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<any> {
    const { user_id } = createProfileDto;
    const user = await this.usersService.findOne(user_id);
    if (user) {
      try {
        this.profileRepository.create(createProfileDto);
        this.profileRepository.save(createProfileDto);
      } catch (error) {
        return { code: error.code, message: error.message };
      }
      const profile = this.profileRepository.create(createProfileDto);
      return { code: '201', message: 'Profile Created', Data: profile };
    } else {
      return { code: '400', message: 'User not existed' };
    }
  }

  async findAll() {
    const profile = await this.profileRepository.find({
      where: { deleted_at: IsNull() },
    });
    if (profile) {
      return { code: '200', message: 'OK', Data: profile };
    } else {
      return { code: '400', message: 'Profile not found', Data: profile };
    }
  }

  async findOne(id: number) {
    const profile = await this.profileRepository.findOne({
      where: { profile_id: id, deleted_at: IsNull() },
    });
    if (profile) {
      return { code: '200', message: 'OK', Data: profile };
    } else {
      return { code: '400', message: 'Profile not found', Data: profile };
    }
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileRepository.findOne({
      where: { profile_id: id, deleted_at: IsNull() },
    });
    if (profile) {
      Object.assign(profile, updateProfileDto);
      await this.profileRepository.save(profile);
      return { code: '201', message: 'Profile Updated', Data: profile };
    } else {
      return { code: '400', message: 'Profile not found', Data: profile };
    }

    // Update basic fields
  }

  async softDeleteProfile(id: number): Promise<any> {
    // Soft delete by ID
    const result = await this.profileRepository.softDelete(id);

    if (result.affected === 0) {
      return { code: '400', message: 'Profile not found', Data: result };
    }
  }

  async restoreProfile(id: number): Promise<any> {
    const result = await this.profileRepository.restore(id);

    if (result.affected === 0) {
      return { code: '400', message: 'Profile not found', Data: result };
    }
  }
}
