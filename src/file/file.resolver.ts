import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FileService } from './file.service';
import { File } from './entities/file.entity';
import { CreateFileInput } from './dto/create-file.input';
import { Inject } from '@nestjs/common';
import { FindAllFileObject } from './object-types/find-all-file.object';
import { FindAllFileInput } from './dto/find-all-file.input';
import { handleError } from '../global/utils/error.util';
import dayjs from 'dayjs';

@Resolver(() => File)
export class FileResolver {
    @Inject(FileService)
    private fileService: FileService;

    @Mutation(() => File, { name: 'createFile' })
    async create(@Args('createFileInput') createFileInput: CreateFileInput) {
        try {
            const { originalFilename, mime, filename } = await this.fileService.moveFileToUploadFolder(await createFileInput.file);
            return await this.fileService.create({
                path: 'uploads',
                filename: filename,
                originalFilename,
                mime,
            });
        } catch (error) {
            handleError(error);
        }
    }

    @Query(() => FindAllFileObject, { name: 'files' })
    async findAll(
        @Args('findAllFileInput', { nullable: true, type: () => FindAllFileInput }) findAllFileInput: FindAllFileInput,
    ): Promise<FindAllFileObject> {
        try {
            const { totalPage, totalAllData, data } = await this.fileService.findAll(findAllFileInput);
            return {
                meta: {
                    currentPage: findAllFileInput?.page ?? 1,
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

    @Query(() => File, { name: 'file' })
    findOne(@Args('id', { type: () => String }) id: string) {
        return this.fileService.findOneBy({ id });
    }

    @Mutation(() => File)
    removeFile(@Args('id', { type: () => String }) id: string) {
        return this.fileService.delete(id);
    }
}
