import { Injectable } from '@nestjs/common';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Injectable()
export class UploadMulter {
    static MulterOption(): MulterModuleOptions {
        return {
            storage: diskStorage({
                destination: './uploads',
                filename(req, file, callback) {
                    // const filename = file.originalname;
                    const fileExtension = file.originalname.split('.').pop();
                    const filename = Date.now() + '-' + Math.round(Math.random() * 1e9) + '.' + fileExtension;
                    return callback(null, filename);
                },
            }),
            fileFilter(req, file, callback) {
                if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                    callback(null, true);
                } else {
                    return callback(
                        new Error('Only .png, .jpg, and .jpeg format allowed'),
                        false,
                    );
                }
            },
            limits: { fileSize: 1 * 1024 * 1024 },
        };
    }
}
