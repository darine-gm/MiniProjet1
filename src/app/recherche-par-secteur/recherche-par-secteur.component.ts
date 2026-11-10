import { Component, OnInit } from '@angular/core';
import { Entreprise } from '../model/entreprise.model';
import { CommonModule, DatePipe } from '@angular/common';
import { EntrepriseService } from '../services/entreprise.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Secteur } from '../model/secteur.models';
@Component({
  selector: 'app-recherche-par-secteur',
  standalone: true,
 imports: [RouterLink, DatePipe, FormsModule, CommonModule],
  templateUrl: './recherche-par-secteur.component.html',
  styles: ``
  
})
export class RechercheParSecteurComponent implements OnInit {
  entreprises: Entreprise[] = [];
  secteurs: Secteur[] = [];
  IdSecteur: number | null = null;
  allEntreprises!: Entreprise[];
  private activeSectorId: number | null = null;

  constructor(private entrepriseService: EntrepriseService) {}

  ngOnInit(): void {
    this.secteurs = this.entrepriseService.listeSecteurs();
    this.allEntreprises = this.entrepriseService.listeEntreprises();
    this.entreprises = this.allEntreprises;
  }

  supprimerEntreprise(ent: Entreprise) {
    let conf = confirm("etes-vous sur ?");

    if (conf) {
      this.entrepriseService.supprimerEntreprise(ent);
      this.rafraichirResultats();
    }
  }

  rechercherParSecteur(): void {
    if (this.IdSecteur === null) {
      return;
    }

    this.activeSectorId = this.IdSecteur;
    this.entreprises = this.entrepriseService.rechercheParSecteur(this.activeSectorId);
  }

  private rafraichirResultats(): void {
    if (this.activeSectorId !== null) {
      this.entreprises = this.entrepriseService.rechercheParSecteur(this.activeSectorId);
    } else {
      this.entreprises = this.allEntreprises;
    }
  }
}