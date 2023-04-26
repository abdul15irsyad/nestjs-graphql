import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'roles' })
@ObjectType()
export class Role {
    @Field(() => String)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column({
        type: 'varchar',
    })
    name: string;

    @Field(() => String)
    @Column('varchar')
    slug: string;

    // @Field(() => [User])
    @OneToMany(() => User, (user: User) => user.role)
    users: User[];

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
