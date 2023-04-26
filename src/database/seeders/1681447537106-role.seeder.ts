import { DataSource } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import slugify from 'slugify';

export default class RoleSeeder extends Seeder {
    public async run(datasource: DataSource): Promise<void> {
        const roles: Partial<Role>[] = [
            {
                name: 'Super Admin',
            },
            {
                name: 'User',
            },
        ];
        await datasource
            .getRepository(Role)
            .save(roles.map(role => ({
                ...role,
                slug: slugify(role.name, { lower: true, strict: true })
            })));
    }
}
