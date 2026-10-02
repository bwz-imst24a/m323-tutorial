import { Injectable, signal, inject } from '@angular/core';
import { Hero } from '../resources/dto/hero';
import { HeroResource } from '../resources/hero-resource';
import { MessageHandler } from '../messaging/message-handler';

@Injectable({
  providedIn: 'root'
})
export class HeroStore {
  public readonly resource = inject(HeroResource);
  public readonly messageHandler = inject(MessageHandler);
  public readonly heroes = signal<Hero[]>([ ]);

  public load() {
    this.resource.getHeroes().subscribe(heroes => {
      this.messageHandler.add(`HeroStore: fetched ${heroes.length} heroes`);
      this.heroes.set(heroes);
    });
  }
  save(hero: Hero) {
    this.resource.put(hero).subscribe(() => {
      this.messageHandler.add(`HeroStore: updated hero id=${hero.id}`);

      const updatedCache = this.heroes().map(h => h.id !== hero.id ? h : hero);
      this.heroes.set(updatedCache);
    });
  }
  add(name: string, strength: string) {
    this.resource.post( { name, strength: strength } ).subscribe((hero) => {
      if (hero) {
        this.heroes.set( [ ...this.heroes(), hero ] );
        this.messageHandler.add(`HeroStore: added hero id=${hero.id}`);
      }
    });
  }
  remove(id: number) {
    this.heroes.set(this.heroes().filter(hero => hero.id !== id));
    this.resource.delete(id).subscribe((hero) => {
      this.messageHandler.add(`HeroStore: removed hero id=${id}`);
    });
  }
}
