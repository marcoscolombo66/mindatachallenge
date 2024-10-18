import { Component, Input, Output, EventEmitter, inject, ChangeDetectorRef} from '@angular/core';
import { Heroe } from '@interfaces/req-response';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeroService } from '@services/hero.service';
import { ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import { UppercaseDirective } from '@directives/uppercase.directive'
@Component({
  standalone: true,
  selector: 'app-edit-hero-popup',
  imports: [CommonModule, ReactiveFormsModule, UppercaseDirective], // Asegúrate de agregar esto
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  heroData: any;
  public heroService = inject(HeroService);
  heroForm: FormGroup;
  @Input() isEditMode = false;
  @Input() hero?: Heroe;
  @Output() close = new EventEmitter<void>();
  loadingHeroId!: boolean;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
    this.heroData = {};
    this.heroForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^[a-zA-Z\\s]+$'),
        ],
      ],
      alterEgo: ['', [Validators.required]],
      power: ['', [Validators.required]],
    });
  }
  saveChanges() {
    this.loadingHeroId = true;
    if (this.heroForm.valid) {
      if (this.isEditMode) {
        // Actualizar héroe
        this.updateChanges(this.heroForm.value);
      } else {
        //Agregar héroe
        this.addHeroe(this.heroForm.value);
      }
    }
  }
  addHeroe(addData: Heroe) {
    this.heroService.createHero(addData).subscribe({
      next: () => {
        alert('Héroe agregado con éxito');
        this.closePopup();
      },
      error: (err) => {
        console.error('Error al agregar el héroe:', err);
        alert('Hubo un error al agregar el héroe');
      },
    });
    this.loadingHeroId = false;
  }
  updateChanges(updatedHero: Heroe) {
    this.heroService.editHero(this.hero?.id, updatedHero).subscribe({
      next: () => {
        alert('Héroe actualizado con éxito');
        this.closePopup();
      },
      error: (err) => {
        console.error('Error al actualizar el héroe:', err);
        alert('Hubo un error al actualizar el héroe');
      },
    });
    this.loadingHeroId = false;
  }

  closePopup() {
    this.close.emit();
  }

  ngOnInit() {
    if (this.hero) {
      // En modo de edición, carga los datos del héroe seleccionado en el formulario
      this.heroForm.patchValue({
        name: this.hero.name,
        alterEgo: this.hero.alterEgo,
        power: this.hero.power,
      });
    }
    this.cd.detectChanges();
  }
}
