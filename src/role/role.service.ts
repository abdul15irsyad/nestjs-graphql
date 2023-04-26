import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike, FindOneOptions } from 'typeorm';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { FindAllRoleOptions } from './interfaces/find-all-role-options.interface';
import slugify from 'slugify';

@Injectable()
export class RoleService {
    @InjectRepository(Role)
    private roleRepo: Repository<Role>;

    async create(createRoleInput: CreateRoleInput) {
        const createdRole = await this.roleRepo.save({
            ...createRoleInput,
            slug: slugify(createRoleInput.name, { lower: true, strict: true }),
        });
        return await this.findOneBy({ id: createdRole.id });
    }

    async findAll({ page = 1, limit = 10, search, orderBy, orderDir }: FindAllRoleOptions = {}) {
        const filter = {};
        const findOptionsWhere: FindOptionsWhere<Role> | FindOptionsWhere<Role>[] = search ? [
            { name: ILike(`%${search}%`), ...filter },
        ] : filter;
        const totalAllData = await this.roleRepo.countBy(findOptionsWhere);
        const totalPage = Math.ceil(totalAllData / limit);
        const data = await this.roleRepo.find({
            where: findOptionsWhere,
            take: limit,
            skip: (page - 1) * limit,
            order: { [orderBy]: { direction: orderDir, nulls: 'last' } },
        });
        return {
            totalPage,
            totalAllData,
            data
        }
    }

    async findOne(findOneOptions: FindOneOptions<Role>) {
        return await this.roleRepo.findOne(findOneOptions);
    }

    async findOneBy(findOptionsWhere: FindOptionsWhere<Role> | FindOptionsWhere<Role>[]) {
        return await this.roleRepo.findOne({
            where: findOptionsWhere,
        });
    }

    async update(id: string, updateRoleInput: UpdateRoleInput) {
        const updatedRole = await this.roleRepo.save({
            id,
            ...updateRoleInput,
            slug: slugify(updateRoleInput.name, { lower: true, strict: true }),
        });
        return await this.findOneBy({ id: updatedRole.id });
    }

    async delete(id: string) {
        return await this.roleRepo.softDelete(id);
    }
}
