import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiController } from './api/api.controller';
import { MysqlService } from './services/mysql/mysql.service';
import { ServeStaticModule } from '@nestjs/serve-static';


@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: '/root/DatabasesHY1001-frontend/dist',
    serveRoot: '/root/DatabasesHY1001-frontend/index.html'
  })],
  controllers: [AppController, ApiController],
  providers: [AppService, MysqlService],
})
export class AppModule {}
