import { Injectable } from '@nestjs/common';
import { CreatePremiumDto } from './dto/create-premium.dto';
import { UpdatePremiumDto } from './dto/update-premium.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Premium } from './entities/premium.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { PackagesService } from 'src/packages/packages.service';
import { User } from 'src/users/entities/user.entity';
import { Package } from 'src/packages/entities/package.entity';

@Injectable()
export class PremiumsService {
  constructor(
    private readonly usersService: UsersService, // Ensure UsersService is correctly injected
    private readonly packagesService: PackagesService, // Ensure PackagesService is correctly injected
    @InjectRepository(Premium) // Inject the PremiumRepository
    private readonly premiumRepository: Repository<Premium>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
  ) {}

  async create(createPremiumDto: CreatePremiumDto) {
    try {
      const { user_id, package_id } = createPremiumDto;
      const packages = await this.packageRepository.findOneBy({
        package_id: package_id,
      });
      if (!packages) {
        return { code: 400, message: 'Package not found' };
      }
      const user = await this.userRepository.findOneBy({ user_id: user_id });
      if (!user) {
        return { code: 400, message: 'User not found' };
      }
      const payload = this.premiumRepository.save({
        user,
        packages,
        subscriptionDate: new Date(),
        status: 'active',
        user_id,
        package_id,
      });
      // const premium = await this.premiumRepository.save(payload);
      return { code: '201', message: 'Premium Created', Data: payload };
    } catch (error) {
      return { code: error.code, message: error.message };
    }
  }

  async findAll() {
    const premiums = await this.premiumRepository.find({
      relations: ['user', 'packages'],
    });
    if (premiums) {
      return { code: '200', message: 'OK', Data: premiums };
    } else {
      return { code: '400', message: 'Premium not found', Data: premiums };
    }
  }

  async findOne(id: number) {
    const premiums = await this.premiumRepository.findOne({
      relations: ['user', 'packages'],
      where: { premium_id: id },
    });
    if (premiums) {
      return { code: '200', message: 'OK', Data: premiums };
    } else {
      return { code: '400', message: 'Premium not found', Data: premiums };
    }
  }

  // async update(id: number, updatePremiumDto: UpdatePremiumDto) {
  //   const { user_id, package_id } = updatePremiumDto;
  //   const packages = await this.packageRepository.findOneBy({
  //     package_id: package_id,
  //   });
  //   if (!packages) {
  //     return { code: 400, message: 'Package not found' };
  //   }
  //   const user = await this.userRepository.findOneBy({ user_id: user_id });
  //   if (!user) {
  //     return { code: 400, message: 'User not found' };
  //   }
  //   const premium = await this.premiumRepository.findOne({
  //     where: { premium_id: id },
  //   });
  //   if (premium) {
  //     premium.user = user;
  //     premium.packages = packages;
  //     await this.premiumRepository.save(premium);
  //     return { code: '201', message: 'Premium Updated', Data: premium };
  //   } else {
  //     return { code: '400', message: 'Premium not found', Data: premium };
  //   }
  // }

  async update(id: number, updatePremiumDto: UpdatePremiumDto) {
    const { status } = updatePremiumDto;
    const premium = await this.premiumRepository.findOne({
      where: { premium_id: id },
    });
    if (premium) {
      premium.status = status;
      await this.premiumRepository.save(premium);
      return { code: '201', message: 'Premium Updated', Data: premium };
    } else {
      return { code: '400', message: 'Premium not found', Data: premium };
    }
  }

  async softDelete(id: number): Promise<any> {
    // Soft delete by ID
    const result = await this.premiumRepository.softDelete(id);

    if (result.affected === 0) {
      return { code: '400', message: 'Premium not found', Data: result };
    }
    return { code: '200', message: 'Premium removed', Data: result };
  }

  async restore(id: number): Promise<any> {
    const result = await this.premiumRepository.restore(id);

    if (result.affected === 0) {
      return { code: '400', message: 'Premium not found', Data: result };
    }
    return { code: '200', message: 'Premium restored', Data: result };
  }
}
