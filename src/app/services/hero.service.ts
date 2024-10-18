import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import type { Heroe } from '@interfaces/req-response';
import { delay, map, tap } from 'rxjs';

interface State {
  heroes: Heroe[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private http = inject(HttpClient);

  #state = signal<State>({
    loading: true,
    heroes: [],
  });

  public heroes = computed(() => this.#state().heroes);
  public loading = computed(() => this.#state().loading);

  constructor() {
    this.loadHeroes();
  }

  private loadHeroes() {
    this.http
      .get<Heroe[]>('https://670e892b3e7151861654f57d.mockapi.io/api/heroes')
      .pipe(delay(1500))
      .subscribe((res) => {
        this.#state.update((state) => ({
          ...state,
          loading: false,
          heroes: res,
        }));
      });
  }

  getHeroeById(id: string) {
    return this.http
      .get<Heroe>(
        `https://670e892b3e7151861654f57d.mockapi.io/api/heroes/${id}`
      )
      .pipe(
        delay(1500),
        map((resp) => resp)
      );
  }

  deleteHeroe(id: any) {
    return this.http
      .delete<Heroe>(
        `https://670e892b3e7151861654f57d.mockapi.io/api/heroes/${id}`
      )
      .pipe(
        delay(1500),
        tap(() => {
          this.#state.update((state) => ({
            ...state,
            heroes: state.heroes.filter((hero) => hero.id !== id),
          }));
        })
      );
  }

  editHero(id: any, updatedHero: Partial<Heroe>) {
    return this.http
      .put<Heroe>(
        `https://670e892b3e7151861654f57d.mockapi.io/api/heroes/${id}`,
        updatedHero
      )
      .pipe(
        delay(1500),
        tap((updatedHero) => {
          this.#state.update((state) => ({
            ...state,
            heroes: state.heroes.map((hero) =>
              hero.id === id ? updatedHero : hero
            ),
          }));
        }),
        map((resp) => resp)
      );
  }

  createHero(newHero: Partial<Heroe>) {
    return this.http
      .post<Heroe>(
        `https://670e892b3e7151861654f57d.mockapi.io/api/heroes`,
        newHero
      )
      .pipe(
        delay(1500),
        tap((createdHero) => {
          this.#state.update((state) => ({
            ...state,
            heroes: [...state.heroes, createdHero], // Agregar el nuevo héroe a la lista
          }));
        }),
        map((resp) => resp)
      );
  }
}
