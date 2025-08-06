import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartController } from './modules/controllers/part.controller';
import { CustomerController } from './modules/controllers/customer.controller';

@Module({
  imports: [],
  controllers: [AppController, PartController, CustomerController ],
  providers: [AppService],
})
export class AppModule {}
