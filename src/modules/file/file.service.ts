import { Injectable, BadRequestException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class FileService {
  private readonly AWS_S3_BUCKET: string;
  private readonly s3: AWS.S3;

  constructor(private readonly configService: ConfigService) {
    this.AWS_S3_BUCKET = this.configService.get<string>('S3_BUCKET_NAME');
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get<string>('S3_ACCESS_KEY'),
      secretAccessKey: this.configService.get<string>('S3_SECRET_KEY'),
    });
  }

  // Método para fazer o upload do arquivo
  async uploadFile(file: Express.Multer.File): Promise<S3.ManagedUpload.SendData> {
    if (!file || !file.buffer) {
      throw new BadRequestException('File is missing or invalid');
    }

    console.log('Uploading file:', file);

    const { originalname, mimetype } = file;

    return await this.s3_upload(file.buffer, this.AWS_S3_BUCKET, originalname, mimetype);
  }

  // Função que realiza o upload para o S3
  private async s3_upload(file, bucket, name, mimetype): Promise<S3.ManagedUpload.SendData> {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',  // Ou altere para 'private' se necessário
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'us-east-2',  // Ajuste a região do seu bucket, se necessário
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      console.error('S3 Upload Error:', e);
      throw new BadRequestException('Failed to upload file to S3');
    }
  }
}
