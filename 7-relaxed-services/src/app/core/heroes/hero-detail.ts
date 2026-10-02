import { Component, input, inject, OnInit, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';
import { HeroStore } from './hero-store';
import { MessageHandler } from '../messaging/message-handler';

@Component({
  selector: 'app-hero-detail',
  imports: [ FormsModule, UpperCasePipe ],
  template: `
@if (hero()) {
  <div>
    <h2>{{hero()!.name | uppercase}} Details</h2>
    <div>id: {{hero()!.id}}</div>
    <div>
      <label class="hero-label" for="hero-name">Hero name: </label>
      <input id="hero-name" [(ngModel)]="hero()!.name" placeholder="name">
    </div>
    @if (hero()!.strength !== '') {
      <div><span>Strength: </span>{{hero()!.strength}}</div>
    }
    @else {
      <div><span>Strength: </span><i>unknown</i></div>
    }
  </div>
  <button type="button" (click)="save()">Save</button>
}
  `,
  styles: `
    .hero-label {
      color: #405061;
      font-weight: bold;
    }
  `
})
export class HeroDetail implements OnInit {
  public readonly id = input<string>();
  protected readonly hero = computed( () => this.heroStore.heroes().find(h => h.id === Number(this.id())) )
  private readonly heroStore = inject(HeroStore);
  private readonly messageHandler = inject(MessageHandler);

  ngOnInit() {
    this.messageHandler.add(`HeroDetail: fetch hero id=${this.id()}`);
    this.heroStore.load();
  }
  save(): void {
    this.heroStore.save(this.hero()!);
  }
}