import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Component({
  selector: 'app-heroes',
  imports: [ FormsModule, UpperCasePipe ],
  template: `
    <h2>My Heroes</h2>
    <ul class="heroes">
      @for (hero of heroes; track hero.id) {
        <li [class.selected]="hero === selectedHero()">
          <button type="button" title="{{ hero.strength }}" (click)="onSelect(hero)">
            <span class="badge">{{hero.id}}</span>
            <span class="name">{{hero.name}}</span>
          </button>
        </li>
      }
    </ul>
    @if (selectedHero()) {
      <div>
        <h2>{{selectedHero()!.name | uppercase}} Details</h2>
        <div>id: {{selectedHero()!.id}}</div>
        <div>
          <label class="hero-label" for="hero-name">Hero name: </label>
          <input id="hero-name" [(ngModel)]="selectedHero()!.name" placeholder="name">
        </div>
        <div><span>Strength: </span>{{selectedHero()!.strength}}</div>
      </div>
    }
  `,
  styles: `
    /* Heroes component's private CSS styles */
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      width: 15em;
    }

    .heroes li {
      display: flex;

      .badge {
        display: inline-block;
        font-size: small;
        color: white;
        padding: 0.8em 0.7em 0 0.7em;
        background-color: #405061;
        line-height: 1em;
        margin-right: .8em;
        border-radius: 4px 0 0 4px;
      }

      .name {
        align-self: center;
      }

      button {
        flex: 1;
        cursor: pointer;
        position: relative;
        left: 0;
        background-color: #EEE;
        margin: .5em;
        padding: 0;
        border-radius: 4px;
        display: flex;
        align-items: stretch;
        height: 1.8em;
      }

      button:hover {
        color: #2c3a41;
        background-color: #e6e6e6;
        left: .1em;
      }

      button:active {
        background-color: #525252;
        color: #fafafa;
      }
    }

    .heroes li.selected {
      button {
        background-color: black;
        color: white;
      }

      button:hover {
        background-color: #505050;
        color: white;
      }

      button:active {
        background-color: black;
        color: white;
      }
    }

    .hero-label {
      color: #405061;
      font-weight: bold;
    }
  `
})
export class Heroes {
  protected readonly selectedHero = signal<Hero | null>(null);
  protected readonly heroes = HEROES;
  
  protected onSelect(hero: Hero): void {
    this.selectedHero.set(hero);
  }
}
