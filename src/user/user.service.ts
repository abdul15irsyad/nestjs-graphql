import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hashPassword } from '../global/utils/password.util';
import { isNotEmpty } from 'class-validator';
import { FindAllUserOptions } from './interfaces/find-all-user-options.interface';

@Injectable()
export class UserService {
    @InjectRepository(User)
    private userRepo: Repository<User>;

    async create(createUserInput: CreateUserInput) {
        const createdUser = await this.userRepo.save({
            ...createUserInput,
            password: hashPassword(createUserInput.password),
        });
        return await this.findOneBy({ id: createdUser.id });
    }

    async findAll({ page = 1, limit = 10, search, orderBy, orderDir, roleId }: FindAllUserOptions = {}) {
        const filter = {
            roleId: roleId ?? undefined,
        };
        const findOptionsWhere: FindOptionsWhere<User> | FindOptionsWhere<User>[] = search ? [
            { name: ILike(`%${search}%`), ...filter },
            { username: ILike(`%${search}%`), ...filter },
            { email: ILike(`%${search}%`), ...filter },
        ] : filter;
        const totalAllData = await this.userRepo.countBy(findOptionsWhere);
        const totalPage = Math.ceil(totalAllData / limit);
        const data = await this.userRepo.find({
            where: findOptionsWhere,
            take: limit,
            skip: (page - 1) * limit,
            order: { [orderBy]: { direction: orderDir, nulls: 'last' } },
            relations: {
                role: true
            }
        });
        return {
            totalPage,
            totalAllData,
            data
        }
    }

    async findOne(findOneOptions: FindOneOptions<User>) {
        return await this.userRepo.findOne({
            relations: {
                role: true,
            },
            ...findOneOptions,
        });
    }

    async findOneBy(findOptionsWhere: FindOptionsWhere<User> | FindOptionsWhere<User>[]) {
        return await this.userRepo.findOne({
            where: findOptionsWhere,
            relations: {
                role: true,
            }
        });
    }

    async update(id: string, updateUserInput: UpdateUserInput) {
        const updatedUser = await this.userRepo.save({
            id,
            ...updateUserInput,
            password: isNotEmpty(updateUserInput.password) ? hashPassword(updateUserInput.password) : undefined,
        });
        return await this.findOneBy({ id: updatedUser.id });
    }

    async delete(id: string) {
        return await this.userRepo.softDelete(id);
    }
}
