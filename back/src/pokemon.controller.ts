import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Controller('/pokemon')
export class PokemonController {
  constructor(private readonly httpService: HttpService) {}

  @Get(':id')
  async findAll(@Param('id') id: string): Promise<Observable<any>>{
    return this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(map(response => response.data));
  }
}