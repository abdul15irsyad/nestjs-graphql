import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hashPassword } from '../global/utils/password.util';
import { isNotEmpty } from 'class-validator';
import { IFindAllInput } from '../global/interfaces/find-all-input.interface';

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

    async findAll({ page = 1, limit = 10, search }: IFindAllInput = {}) {
        const findOptions: FindOptionsWhere<User> | FindOptionsWhere<User>[] = search && [
            { name: ILike(`%${search}%`) },
            { username: ILike(`%${search}%`) },
            { email: ILike(`%${search}%`) },
        ];
        const totalAllData = await this.userRepo.countBy(findOptions);
        const totalPage = Math.ceil(totalAllData / limit);
        const data = await this.userRepo.find({
            where: findOptions,
            take: limit,
            skip: (page - 1) * limit,
        });
        return {
            totalPage,
            totalAllData,
            data
        }
    }

    async findOneBy(findOneOptions: FindOptionsWhere<User>) {
        return await this.userRepo.findOneBy(findOneOptions);
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
