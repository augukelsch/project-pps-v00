import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartController } from './modules/controllers/part.controller';
import { CustomerController } from './modules/controllers/customer.controller';
import { OrderController } from './modules/controllers/order.controller';
import { AuthModule } from './modules/auth/auth.module'

@Module({
  imports: [AuthModule],
  controllers: [AppController, PartController, CustomerController, OrderController ],
  providers: [AppService],
})
export class AppModule {}
