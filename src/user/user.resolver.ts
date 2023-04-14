import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { NotFoundException } from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { handleError } from '../global/utils/error.util';
import { FindAllUserInput } from './dto/find-all-user-input';
import { FindAllUserObject } from './object-types/find-all-user.object';
import { Meta } from 'src/global/object-types/find-all.object';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Mutation(() => User)
    async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        try {
            return await this.userService.create(createUserInput);
        } catch (error) {
            handleError(error);
        }
    }

    @Query(() => FindAllUserObject, { name: 'users' })
    async findAll(@Args('findAllUserInput') findAllUserInput: FindAllUserInput): Promise<FindAllUserObject> {
        try {
            const { totalPage, totalAllData, data } = await this.userService.findAll(findAllUserInput)
            return {
                meta: {
                    currentPage: findAllUserInput.page,
                    totalPage,
                    totalData: data.length,
                    totalAllData,
                },
                data
            };
        } catch (error) {
            handleError(error);
        }
    }

    @Query(() => User, { name: 'user' })
    async findOne(@Args('id', { type: () => String }) id: string) {
        try {
            return this.userService.findOneBy({ id });
        } catch (error) {
            handleError(error);
        }
    }

    @Mutation(() => User)
    async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
        try {
            return await this.userService.update(updateUserInput.id, updateUserInput);
        } catch (error) {
            handleError(error);
        }
    }

    @Mutation(() => String)
    async removeUser(@Args('id', { type: () => String }) id: string) {
        try {
            const user = await this.userService.findOneBy({ id });
            if (isEmpty(user)) throw new NotFoundException('user not found');

            await this.userService.delete(id);
            return `user deleted`;
        } catch (error) {
            handleError(error);
        }
    }
}
