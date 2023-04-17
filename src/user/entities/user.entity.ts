import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
