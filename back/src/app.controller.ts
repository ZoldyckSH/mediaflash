import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Controller('/pokedex')
export class AppController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  async findAll(): Promise<Observable<any>>{
    return this.httpService.get('https://pokeapi.co/api/v2/pokemon?limit=100')
      .pipe(map(response => response.data));
  }
}
