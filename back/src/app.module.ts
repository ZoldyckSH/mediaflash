import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PokemonController } from './pokemon.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios'
@Module({
  imports: [HttpModule.registerAsync({
    useFactory: () => ({
      timeout: 5000,
    }),
  })],
  controllers: [AppController, PokemonController],
  providers: [AppService],
})
export class AppModule {}
