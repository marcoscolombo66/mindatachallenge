import { CommonModule } from '@angular/common';
import { Component, inject, computed, signal, effect } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeroService } from '@services/hero.service';
import { TitleComponent } from '@shared/title/title.component';
import { Heroe } from '@interfaces/req-response';
import { PopupComponent } from '@dashboard/pages/heroes/popup/popup.component';
import { BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    RouterModule,
    PopupComponent,
    FormsModule,
  ],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export default class HeroesComponent {
  public searchTerm = signal('');
  isEditPopupOpen = new BehaviorSubject<boolean>(false);

  selectedHero = new BehaviorSubject<Heroe | undefined>(undefined);

  public heroService = inject(HeroService);

  public currentPage = signal(1);
  public pageSize = signal(5);

  loadingHeroId: string | null = null;

  constructor() {
    // permitir escrituras en señales dentro de efect
    effect(
      () => {
        this.searchTerm();
        this.currentPage.set(1);
      },
      { allowSignalWrites: true }
    );
  }
  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }
  public filteredHeroes = computed(() => {
    const search = this.searchTerm().toLowerCase();
    return this.heroService
      .heroes()
      .filter(
        (hero) =>
          hero.name.toLowerCase().includes(search) ||
          hero.alterEgo.toLowerCase().includes(search)
      );
  });
  public totalPages = computed(() =>
    Math.ceil(this.filteredHeroes().length / this.pageSize())
  );

  public paginatedHeroes = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.filteredHeroes().slice(start, end);
  });

  isEditMode!: boolean;

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((page) => page + 1);
    }
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update((page) => page - 1);
    }
  }
  openAddHeroPopup() {
    // Crear objeto vacío para nuevo héroe
    this.selectedHero.next({} as Heroe);
    // Abre el popup
    this.isEditPopupOpen.next(true);
    // Establece que está en modo de agregar
    this.isEditMode = false;
  }
  openEditPopup(hero: Heroe) {
    this.selectedHero.next(hero);
    this.isEditPopupOpen.next(true);
    this.isEditMode = true;
  }

  closeEditPopup() {
    this.isEditPopupOpen.next(false);
    this.selectedHero.next(undefined);
  }

  deleteHero(id: any) {
    if (confirm('¿Estás seguro de que quieres eliminar este héroe?')) {
      this.loadingHeroId = id;
      this.heroService.deleteHeroe(id).subscribe({
        next: () => {
          alert('Héroe eliminado con éxito');
          this.loadingHeroId = null;
        },
        error: (err) => {
          console.error('Error al eliminar el héroe:', err);
          alert('Hubo un error al eliminar el héroe');
          this.loadingHeroId = null;
        },
      });
    }
  }
}
