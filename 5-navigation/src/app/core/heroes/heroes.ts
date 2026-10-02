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
        </li>
      }
    </ul>
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
  `
})
export class Heroes implements OnInit {
  protected readonly heroStore = inject(HeroStore);

  ngOnInit() {
    this.heroStore.load();
  }
}
