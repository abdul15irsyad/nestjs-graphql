import { ObjectType, Field } from '@nestjs/graphql';
import { Role } from '../../role/entities/role.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
    @Field(() => String)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column({
        type: 'varchar',
    })
    name: string;

    @Field(() => String)
    @Column({
        type: 'varchar',
    })
    email: string;

    @Field(() => String)
    @Column({
        type: 'varchar',
    })
    username: string;

    @Column({
        type: 'varchar',
    })
    password: string;

    @Column('uuid', { name: 'role_id' })
    roleId: string;

    @Field(() => Role, { complexity: 2 })
    @ManyToOne(() => Role, (role: Role) => role.users)
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @Field(() => Date)
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Field(() => Date, { nullable: true })
    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt?: Date;
}
