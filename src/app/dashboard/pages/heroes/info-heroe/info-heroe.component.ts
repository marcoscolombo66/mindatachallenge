import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroService } from '@services/hero.service';
import { TitleComponent } from '@shared/title/title.component';
import { switchMap } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, TitleComponent, RouterTestingModule],
  templateUrl: './info-heroe.component.html',
})
export default class InfoComponent {
  private route = inject(ActivatedRoute);
  private heroesService = inject(HeroService);

  public titleLabel = computed(() => {
    if (this.heroe()) {
      return `Información: ${this.heroe()?.name}`;
    }
    return `Espere por favor.`;
  });

  public heroe = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.heroesService.getHeroeById(id))
    )
  );

  goBack(): void {
    window.history.back();
  }
}
