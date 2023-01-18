import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import 'dotenv/config';
import { User } from './user/user.entity';
import { readFileSync } from 'fs';

const {
	MYSQL_HOST: HOST,
	MYSQL_HOST_FILE: HOST_FILE,
	MYSQL_USER: USER,
	MYSQL_USER_FILE: USER_FILE,
	MYSQL_PASSWORD: PASSWORD,
	MYSQL_PASSWORD_FILE: PASSWORD_FILE,
	MYSQL_DB: DB,
	MYSQL_DB_FILE: DB_FILE,
} = process.env;

const host = HOST_FILE ? readFileSync(HOST_FILE).toString() : HOST;
const user = USER_FILE ? readFileSync(USER_FILE).toString() : USER;
const password = PASSWORD_FILE ? readFileSync(PASSWORD_FILE).toString() : PASSWORD;
const database = DB_FILE ? readFileSync(DB_FILE).toString() : DB;

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: host,
			port: 3306,
			username: user,
			password: password,
			database: database,
			entities: [User],
			synchronize: true,
			charset: 'utf8mb4',
		}),
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
