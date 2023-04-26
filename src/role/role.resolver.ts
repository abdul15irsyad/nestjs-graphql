import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Inject, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { handleError } from '../global/utils/error.util';
import { isEmpty } from 'class-validator';
import { FindAllRoleObject } from './object-types/find-all-role.object';
import { FindAllRoleInput } from './dto/find-all-user.input';

@Resolver(() => Role)
export class RoleResolver {
    @Inject(RoleService)
    private roleService: RoleService;

    @Mutation(() => Role, { name: 'createRole' })
    async create(@Args('createRoleInput', { type: () => CreateRoleInput }) createRoleInput: CreateRoleInput) {
        try {
            return await this.roleService.create(createRoleInput);
        } catch (error) {
            handleError(error);
        }
    }

    @Query(() => FindAllRoleObject, { name: 'roles' })
    async findAll(
        @Args('findAllRoleInput', { nullable: true, type: () => FindAllRoleInput }) findAllRoleInput: FindAllRoleInput,
    ): Promise<FindAllRoleObject> {
        try {
            const { totalPage, totalAllData, data } = await this.roleService.findAll(findAllRoleInput);
            return {
                meta: {
                    currentPage: findAllRoleInput?.page ?? 1,
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

    @Query(() => Role, { name: 'role' })
    async findOne(@Args('id', { type: () => String }, ParseUUIDPipe) id: string) {
        try {
            const role = await this.roleService.findOneBy({ id });
            if (isEmpty(role)) throw new NotFoundException('role not found');
            return role;
        } catch (error) {
            handleError(error);
        }
    }

    @Mutation(() => Role, { name: 'updateRole' })
    async update(@Args('updateRoleInput', { type: () => UpdateRoleInput }) updateRoleInput: UpdateRoleInput) {
        try {
            const role = await this.roleService.findOneBy({ id: updateRoleInput.id });
            if (isEmpty(role)) throw new NotFoundException('role not found');
            return await this.roleService.update(updateRoleInput.id, updateRoleInput);
        } catch (error) {
            handleError(error);
        }
    }

    @Mutation(() => String, { name: 'deleteRole' })
    async delete(@Args('id', { type: () => String }) id: string) {
        try {
            const role = await this.roleService.findOneBy({ id });
            if (isEmpty(role)) throw new NotFoundException('role not found');
            await this.roleService.delete(id);
            return `role deleted`;
        } catch (error) {
            handleError(error);
        }
    }
}