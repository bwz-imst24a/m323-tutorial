import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './dto/hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  public createDb() {
    const heroes = [
      { id: 12, name: 'Dr. Nice', strength: 'Healing' },
      { id: 13, name: 'Bombasto', strength: 'Explosive blasts' },
      { id: 14, name: 'Celeritas', strength: 'Super speed' },
      { id: 15, name: 'Magneta', strength: 'Magnetic manipulation' },
      { id: 16, name: 'RubberMan', strength: 'Elasticity' },
      { id: 17, name: 'Dynama', strength: '' },
      { id: 18, name: 'Dr. IQ', strength: 'Super intelligence' },
      { id: 19, name: 'Magma', strength: 'Lava manipulation' },
      { id: 20, name: 'Tornado', strength: 'Wind manipulation' }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  public genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}