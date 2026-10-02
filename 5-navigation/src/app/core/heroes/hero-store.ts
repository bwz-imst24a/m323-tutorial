import { Injectable, signal, inject } from '@angular/core';
import { Hero } from './hero';
import { getHeroes } from './mock-heroes';
import { MessageHandler } from '../messaging/message-handler';

@Injectable({
  providedIn: 'root'
})
export class HeroStore {
  public readonly messageHandler = inject(MessageHandler);
  public readonly heroes = signal<Hero[]>([ ]);

  public load() {
    getHeroes().subscribe(heroes => {
      this.messageHandler.add(`HeroStore: fetched ${heroes.length} heroes`);
      this.heroes.set(heroes);
    });
  }
}
