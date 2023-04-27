import { ObjectType, Field } from '@nestjs/graphql';
import { AfterLoad, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { BASE_URL } from '../../app.config';

@Entity('files')
@ObjectType()
export class File {
    @Field(() => String)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column('varchar')
    path: string;

    @Field(() => String)
    @Column('varchar')
    filename: string;

    @Field(() => String)
    file: string;

    @Field(() => String)
    @Column('varchar', { name: 'original_filename' })
    originalFilename: string;

    @Field(() => String)
    @Column('varchar')
    mime: string;

    @Field(() => String, { nullable: true })
    @Column('uuid', { name: 'user_id', nullable: true })
    userId?: string;

    @Field(() => User, { complexity: 2, nullable: true })
    @ManyToOne(() => User, (user: User) => user.files)
    @JoinColumn({ name: 'user_id' })
    user?: User;

    @Field(() => Date)
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Field(() => Date, { nullable: true })
    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt?: Date;

    @AfterLoad()
    setFile() {
        this.file = `${BASE_URL}/${this.path}/${this.filename}`;
    }
}
