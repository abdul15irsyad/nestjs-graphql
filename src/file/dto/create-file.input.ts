import { InputType, Field } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

@InputType()
export class CreateFileInput {
    @Field(() => GraphQLUpload!)
    file: Promise<FileUpload>;
}
