import { Component, input, inject, OnInit, computed } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';
import { HeroStore } from './hero-store';
import { MessageHandler } from '../messaging/message-handler';

@Component({
  selector: 'app-hero-detail',
  imports: [ FormsModule, UpperCasePipe ],
  template: `
    <form #heroForm="ngForm">
    @if (hero()) {
      <div>
        <h2>{{hero()!.name | uppercase}} Details</h2>
        <div>id: {{hero()!.id}}</div>
        <div>
          <label class="hero-label" for="hero-name">Hero name: </label>
          <input #name="ngModel" id="hero-name" required placeholder="name" [(ngModel)]="hero()!.name" name="name">
          <span [hidden]="name.valid || name.pristine" class="validation-error">
            * Name is required
          </span>
        </div>
        <div>
          <label for="hero-strength">Strength: </label>
          <input #strength="ngModel" id="hero-strength" placeholder="strength" [(ngModel)]="hero()!.strength" name="strength">
        </div>
        <div>
          <label for="hero-alter-ego">Alter ego: </label>
          <input id="hero-alter-ego" placeholder="alter ego" [(ngModel)]="hero()!.alterEgo" name="alterEgo">
        </div>
        <div>
          <label for="power">Hero power:</label>
          <select id="power" required [(ngModel)]="hero()!.power" name="power">
            @for (pow of powers; track $index) {
              <option [value]="pow">{{pow}}</option>
            }
          </select>
        </div>
      </div>
      <button type="submit" [disabled]="!heroForm.form.valid" (click)="save(heroForm)">Save</button>
    }
    </form>
  `,
  styles: `
    label {
      display: inline-block;
      margin-top: 0.4rem;
      width: 200px;
    }

    .ng-valid[required], .ng-valid.required  {
      border-left: 5px solid #42A948; /* green */
    }

    .ng-invalid:not(form)  {
      border-left: 5px solid #a94442; /* red */
    }

    .validation-error  {
      color: #a94442;
      font-size: small;
      padding: 4px;
      margin: 4px;
    }

    .hero-label {
      color: #405061;
      font-weight: bold;
    }
  `
})
export class HeroDetail implements OnInit {
  protected readonly powers = [ 'Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer' ];

  public readonly id = input<string>();
  protected readonly hero = computed(() => {
    const hero = this.heroStore.heroes().find(h => h.id === Number(this.id()));  
    return (hero) ? { ...hero } : null;  // { ...hero } creates a copy of object 'hero'
  });
  private readonly heroStore = inject(HeroStore);
  private readonly messageHandler = inject(MessageHandler);

  ngOnInit() {
    this.messageHandler.add(`HeroDetail: fetch hero id=${this.id()}`);
    this.heroStore.load();
  }
  save(form: NgForm): void {
     if (form.valid) {
       this.heroStore.save(this.hero()!);
     }
  }
}