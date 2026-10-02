import { Observable, of } from 'rxjs';
import { Hero } from '../resources/dto/hero';

const HEROES: Hero[] = [
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

export function getHeroes(): Observable<Hero[]> {
  return of(HEROES);
}