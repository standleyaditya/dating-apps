import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsNull, Repository } from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Premium } from 'src/premiums/entities/premium.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Premium)
    private readonly premiumRepository: Repository<Premium>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password, profileId, premium_status, premium } =
      createUserDto;

    const user = this.userRepository.create({
      username,
      email,
      password,
      premium_status: premium_status ?? true,
    });

    // Assign profile if provided
    if (profileId) {
      const profile = await this.profileRepository.findOne({
        where: { profile_id: profileId },
      });
      if (!profile)
        throw new NotFoundException(`Profile with ID ${profileId} not found`);
      user.profile = profile;
    }

    // Assign premium packages if provided
    if (premium) {
      const premiumPackages = await this.premiumRepository.findByIds(premium);
      user.premium = premiumPackages;
    }

    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  findAll() {
    return this.userRepository.find({
      relations: ['profile', 'premium'],
      where: { deleted_at: IsNull() },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { user_id: id },
      relations: ['profile', 'premium'],
    });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { user_id: id } });

    // Update basic fields
    Object.assign(user, updateUserDto);

    // Update profile if provided
    if (updateUserDto.profileId) {
      const profile = await this.profileRepository.findOne({
        where: { profile_id: updateUserDto.profileId },
      });
      if (!profile)
        throw new NotFoundException(
          `Profile with ID ${updateUserDto.profileId} not found`,
        );
      user.profile = profile;
    }

    // Update premium packages if provided
    if (updateUserDto.premium) {
      const premiumPackages = await this.premiumRepository.findByIds(
        updateUserDto.premium,
      );
      user.premium = premiumPackages;
    }

    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async softDeleteUser(id: string): Promise<any> {
    // Soft delete by ID
    const result = await this.userRepository.softDelete(id);

    if (result.affected === 0) {
      return { message: 'User not found' };
    } else {
      return { message: 'User Removed' };
    }
  }

  async restoreUser(id: string): Promise<any> {
    const result = await this.profileRepository.restore(id);

    if (result.affected === 0) {
      return { message: 'User not found' };
    } else {
      return { message: 'User Restored' };
    }
  }
}
