import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Inject, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { handleError } from '../global/utils/error.util';
import { FindAllUserInput } from './dto/find-all-user-input';
import { FindAllUserObject } from './object-types/find-all-user.object';

@Resolver(() => User)
export class UserResolver {
    @Inject(UserService)
    private userService: UserService;

    @Mutation(() => User, { name: 'createUser' })
    async create(@Args('createUserInput', { type: () => CreateUserInput }) createUserInput: CreateUserInput) {
        try {
            return await this.userService.create(createUserInput);
        } catch (error) {
            handleError(error);
        }
    }

    @Query(() => FindAllUserObject, { name: 'users' })
    async findAll(
        @Args('findAllUserInput', { nullable: true, type: () => FindAllUserInput }) findAllUserInput: FindAllUserInput
    ): Promise<FindAllUserObject> {
        try {
            const { totalPage, totalAllData, data } = await this.userService.findAll(findAllUserInput)
            return {
                meta: {
                    currentPage: findAllUserInput?.page ?? 1,
                    totalPage,
                    totalData: data.length,
                    totalAllData,
                },
                data,
            };
        } catch (error) {
            handleError(error);
        }
    }

    @Query(() => User, { name: 'user' })
    async findOne(@Args('id', { type: () => String }, ParseUUIDPipe) id: string) {
        try {
            const user = await this.userService.findOneBy({ id });
            if (isEmpty(user)) throw new NotFoundException('user not found');
            return user;
        } catch (error) {
            handleError(error);
        }
    }

    @Mutation(() => User, { name: 'updateUser' })
    async update(@Args('updateUserInput', { type: () => UpdateUserInput }) updateUserInput: UpdateUserInput) {
        try {
            const user = await this.userService.findOneBy({ id: updateUserInput.id });
            if (isEmpty(user)) throw new NotFoundException('user not found');
            return await this.userService.update(updateUserInput.id, updateUserInput);
        } catch (error) {
            handleError(error);
        }
    }

    @Mutation(() => String, { name: 'deleteUser' })
    async delete(@Args('id', { type: () => String }) id: string) {
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
