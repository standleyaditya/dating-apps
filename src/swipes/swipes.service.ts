import { Injectable } from '@nestjs/common';
import { CreateSwipeDto } from './dto/create-swipe.dto';
import { UpdateSwipeDto } from './dto/update-swipe.dto';
// import { UsersService } from 'src/users/users.service';
// import { PackagesService } from 'src/packages/packages.service';
// import { Premium } from 'src/premiums/entities/premium.entity';
import { Brackets, Repository } from 'typeorm';
// import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { Package } from 'src/packages/entities/package.entity';
// import { ProfilesService } from 'src/profiles/profiles.service';
import { Profile } from 'src/profiles/entities/profile.entity';
import dayjs from 'dayjs';
import { Swipe } from './entities/swipe.entity';

@Injectable()
export class SwipesService {
  constructor(
    // private readonly usersService: UsersService, // Ensure UsersService is correctly injected
    // private readonly packagesService: PackagesService, // Ensure PackagesService is correctly injected
    // private readonly profileService: ProfilesService,
    // @InjectRepository(Premium) // Inject the PremiumRepository
    // private readonly premiumRepository: Repository<Premium>,
    // @InjectRepository(User) private readonly userRepository: Repository<User>,
    // @InjectRepository(Package)
    // private readonly packageRepository: Repository<Package>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Swipe)
    private readonly swipeRepository: Repository<Swipe>,
  ) {}
  async create(createSwipeDto: CreateSwipeDto) {
    const { profile_id } = createSwipeDto;
    // const profile = await this.profileRepository.findOne({
    //   where: { profile_id: profile_id, packages.name : 'Unlimited Swipes' },
    //   relations: ['user', 'user.premium', 'user.premium.packages'],
    // });
    const profile = await this.profileRepository
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .leftJoinAndSelect(
        'user.premium',
        'premium',
        'premium.userUserId = user.user_id AND premium.status = :status',
        {
          status: 'active',
        },
      )
      .leftJoinAndSelect(
        'premium.packages',
        'packages',
        'premium.packagesPackageId = packages.package_id AND packages.name = :name',
        {
          name: 'Unlimited Swipes',
        },
      )
      .where('profile.profile_id = :profile_id', { profile_id })
      .getOne();
    let isToday: boolean;
    let checkPremium = false;
    profile.user.premium.forEach((element) => {
      if (element.packages) {
        checkPremium = true;
      }
    });
    if (profile.last_swiped_at) {
      isToday = dayjs(profile.last_swiped_at).isSame(dayjs(), 'day');
    } else {
      isToday = false;
    }
    if (profile.swipe_count == 0 && !checkPremium) {
      return { message: 'You runout of swipe today!' };
    } else if (profile.swipe_count == 0 && !isToday) {
      profile.last_swiped_at = null;
      profile.swipe_count = 10;
      await this.profileRepository.save(profile);
    }
    if (profile.swipe_count > 0 || profile.user.premium) {
      const allProfile = await this.profileRepository
        .createQueryBuilder('profile')
        .leftJoin(
          'profile.swipedProfiles',
          'swiped',
          'swiped.profileProfileId = :profile_id',
          {
            profile_id: profile_id,
          },
        )
        .where('profile.profile_Id != :profile_id', {
          profile_id: profile_id,
        })
        .andWhere('swiped.swipe_id IS NULL')
        .getMany();
      console.log(allProfile);
      const randomIndex = Math.floor(Math.random() * allProfile.length);
      const swiped = allProfile[randomIndex];
      if (!swiped) {
        return { message: 'No Profile to Swipe' };
      }
      const result = this.swipeRepository.create({
        profile,
        swiped,
      });
      await this.swipeRepository.save(result);
      profile.swipe_count = profile.swipe_count - 1;
      await this.profileRepository.save(profile);
      return { Data: result };
    }
  }
  async findAll() {
    return this.swipeRepository
      .createQueryBuilder('swipe')
      .leftJoinAndSelect('swipe.profile', 'swipes')
      .leftJoinAndSelect('swipes.swipedProfiles', 'swiped')
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} swipe`;
  }

  update(id: number, updateSwipeDto: UpdateSwipeDto) {
    return `This action updates a #${id} swipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} swipe`;
  }
}
