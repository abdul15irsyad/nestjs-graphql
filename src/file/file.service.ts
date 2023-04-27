import { Injectable } from '@nestjs/common';
import { File } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike, FindOneOptions, DeepPartial } from 'typeorm';
import { FindAllFileOptions } from './interfaces/find-all-file-options.interface';
import { createWriteStream, readFileSync } from 'fs';
import { join } from 'path';
import { UPLOAD_PATH } from './file.config';
import dayjs from 'dayjs';
import { FileUpload } from 'graphql-upload-ts';
import * as mime from 'mime-types';
import { isNotEmpty } from 'class-validator';

@Injectable()
export class FileService {
    @InjectRepository(File)
    private fileRepo: Repository<File>;

    async create(createFileInput: DeepPartial<File>) {
        const createdFile = await this.fileRepo.save({
            ...createFileInput,
        });
        return await this.findOneBy({ id: createdFile.id });
    }

    async moveFileToUploadFolder(fileUpload: FileUpload, filename?: string) {
        try {
            return new Promise<{
                file: Buffer,
                filename: string,
                originalFilename: string,
                mime: string,
            }>(async (resolve) => {
                const { createReadStream, mimetype, filename: originalFilename } = fileUpload;
                const ext = mime.extension(mimetype);
                filename = isNotEmpty(filename) ? `${filename}.${ext}` : `${dayjs().valueOf()}.${ext}`;
                const path = `${UPLOAD_PATH}/${filename}`;
                createReadStream()
                    .pipe(createWriteStream(join(process.cwd(), path)))
                    .on('finish', async () => {
                        return resolve({
                            file: readFileSync(path),
                            filename,
                            originalFilename,
                            mime: mimetype
                        });
                    })
                    .on('error', () => {
                        throw 'could not save image';
                    });
            });
        } catch (error) {
            throw error
        }
    }

    async findAll({ page = 1, limit = 10, search, orderBy, orderDir }: FindAllFileOptions = {}) {
        const filter = {};
        const findOptionsWhere: FindOptionsWhere<File> | FindOptionsWhere<File>[] = search ? [
            { filename: ILike(`%${search}%`), ...filter },
            { originalFilename: ILike(`%${search}%`), ...filter },
        ] : filter;
        const totalAllData = await this.fileRepo.countBy(findOptionsWhere);
        const totalPage = Math.ceil(totalAllData / limit);
        const data = await this.fileRepo.find({
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

    async findOne(findOneOptions: FindOneOptions<File>) {
        return await this.fileRepo.findOne({
            ...findOneOptions,
        });
    }

    async findOneBy(findOptionsWhere: FindOptionsWhere<File> | FindOptionsWhere<File>[]) {
        return await this.fileRepo.findOne({
            where: findOptionsWhere,
        });
    }

    async delete(id: string) {
        return await this.fileRepo.softDelete(id);
    }
}
