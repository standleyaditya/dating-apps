import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package } from './entities/package.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
  ) {}

  async create(createPackageDto: CreatePackageDto) {
    try {
      const packages = await this.packageRepository.create(createPackageDto);
      this.packageRepository.save(createPackageDto);
      return { code: '201', message: 'Profile Created', Data: packages };
    } catch (error) {
      return { code: error.code, message: error.message };
    }
  }

  async findAll() {
    const packages = await this.packageRepository.find();
    if (packages) {
      return { code: '200', message: 'OK', Data: packages };
    } else {
      return { code: '400', message: 'Profile not found', Data: packages };
    }
  }

  async findOne(id: number) {
    const packages = await this.packageRepository.findOne({
      where: { package_id: id },
    });
    if (packages) {
      // return { code: '200', message: 'OK', Data: packages };
      return packages;
    } else {
      // return { code: '400', message: 'Profile not found', Data: packages };
      return packages;
    }
  }

  async update(id: number, updatePackageDto: UpdatePackageDto) {
    const packages = await this.packageRepository.findOne({
      where: { package_id: id },
    });
    if (packages) {
      Object.assign(packages, updatePackageDto);
      await this.packageRepository.save(packages);
      return { code: '201', message: 'Package Updated', Data: packages };
    } else {
      return { code: '400', message: 'Package not found', Data: packages };
    }
  }

  async softDelete(id: number): Promise<any> {
    // Soft delete by ID
    const result = await this.packageRepository.softDelete(id);

    if (result.affected === 0) {
      return { code: '400', message: 'Package not found', Data: result };
    }
    return { code: '200', message: 'Package removed', Data: result };
  }

  async restore(id: number): Promise<any> {
    const result = await this.packageRepository.restore(id);

    if (result.affected === 0) {
      return { code: '400', message: 'Package not found', Data: result };
    }
    return { code: '200', message: 'Package restored', Data: result };
  }
}
