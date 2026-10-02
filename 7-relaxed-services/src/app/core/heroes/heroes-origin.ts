import { Component, inject, signal, OnInit } from '@angular/core';
import { HeroResource } from '../resources/hero-resource';
import { Hero } from '../resources/dto/hero';

@Component({
  selector: 'app-heroes-origin',
  imports: [],
  template: `
    <section>
      <h4>Original Data</h4>
      <ul class="origin-list">
        @for (hero of heroes(); track hero.id) {
          <li>{{hero.name}} - {{hero.strength}}</li>
        }
      </ul>
    </section>
  `,
  styles: `
    :host {
      display: block;
      font-size: 0.6rem;
    }
    .origin-list {
      display: flex;
      list-style-type: none;
      
      > li {
        margin-right: 0.6rem;
      }
    }
  `
})
export class HeroesOrigin implements OnInit {
  protected readonly heroes = signal<Hero[]>([]);
  private readonly heroResource = inject(HeroResource);

  ngOnInit() {
    this.heroResource.getHeroes().subscribe(heroes => {
      this.heroes.set(heroes);
    });
  }
}
