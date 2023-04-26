import { DataSource } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { hashPassword } from '../../global/utils/password.util';
import { getRandomNumber } from '../../global/utils/string.util';
import { faker } from '@faker-js/faker/locale/id_ID';
import slugify from 'slugify';
import { Role } from '../../role/entities/role.entity';

export default class UserSeeder extends Seeder {
    public async run(datasource: DataSource): Promise<void> {
        const roles = await datasource.getRepository(Role).find();
        const users: Partial<User>[] = [
            {
                name: 'Irsyad Abdul',
                username: 'irsyadabdul',
                email: 'irsyadabdul@gmail.com',
                roleId: roles.find((role: Role) => role.slug == 'super-admin').id,
            },
        ];
        for (let i = users.length; i < 50; i++) {
            const fullName = faker.name.fullName();
            users.push({
                name: fullName,
                username: slugify(fullName, { lower: true, strict: true, replacement: '' }),
                email: faker.internet.email(fullName.split(' ')[0], fullName.split(' ')[1]).split('@').map((item, index) => index === 0 ? `${item}${getRandomNumber({ min: 0, max: 100 })}` : item).join('@').toLowerCase(),
                roleId: roles.find((role: Role) => role.slug == 'user').id,
            });
        }
        await datasource
            .getRepository(User)
            .save(users.map(user => ({
                ...user,
                password: hashPassword('Qwerty123')
            })));
    }
}
