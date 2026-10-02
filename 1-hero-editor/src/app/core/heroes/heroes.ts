import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';
import { Hero } from './hero';

@Component({
  selector: 'app-heroes',
  imports: [ FormsModule, UpperCasePipe ],
  template: `
    <h2>{{hero.name | uppercase}} Details</h2>
    <div><span>id: </span>{{hero.id}}</div>
    <div>
      <label for="name">Hero name: </label>
      <input id="name" [(ngModel)]="hero.name" placeholder="name">
    </div>
    <div><span>Strength: </span>{{hero.strength}}</div>
  `,
  styles: ``
})
export class Heroes {
  protected readonly hero: Hero = {
    id: 1,
    name: 'Windstorm',
    strength: 'Wind manipulation',
  };
}
