import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroStore } from './hero-store';

@Component({
  selector: 'app-heroes',
  imports: [ RouterLink ],
  template: `
    <h2>My Heroes</h2>
    <ul class="heroes">
      @for (hero of heroStore.heroes(); track hero.id) {
        <li>
          <button type="button" title="{{ hero.strength }}" [routerLink]="['/detail', hero.id ]">
            <span class="badge">{{hero.id}}</span>
            <span class="name">{{hero.name}}</span>
          </button>
          <button type="button" title="remove hero" class="remove-action" (click)="remove(hero.id)">X</button>
        </li>
      }
    </ul>
    <div>
      <h2>Create a Hero</h2>
      <label for="new-hero">Name: </label>
      <input id="new-hero" #heroName />&nbsp;
      <label for="new-strength">Strength: </label>
      <input id="new-strength" #heroStrength />
      
      <div>
        <!-- (click) passes input value to add() and then clears the input -->
        <button type="button" (click)="add(heroName.value, heroStrength.value); heroName.value=''; heroStrength.value='';">Add hero</button>
      </div>
    </div>
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

      button.remove-action {
        flex: none;
        padding: 0.5rem;
      }

      button.remove-action:hover {
        background-color: #e3c6c6ff;
        color: red;
      }
    }
  `
})
export class Heroes implements OnInit {
  protected readonly heroStore = inject(HeroStore);

  ngOnInit() {
    this.heroStore.load();
  }
  add(name: string, strength: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroStore.add(name, strength);
  }
  remove(id: number): void {
    this.heroStore.remove(id);
  }
}
