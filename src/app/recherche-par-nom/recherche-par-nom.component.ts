import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Entreprise } from '../model/entreprise.model';
import { EntrepriseService } from '../services/entreprise.service';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [RouterLink, DatePipe, FormsModule, CommonModule],
  templateUrl: './recherche-par-nom.component.html'
})
export class RechercheParNomComponent implements OnInit {
  entreprises: Entreprise[] = [];
  private allEntreprises: Entreprise[] = [];
  searchTerm = '';
  private activeSearchTerm = '';

  constructor(private entrepriseService: EntrepriseService) {}

  ngOnInit(): void {
    this.allEntreprises = this.entrepriseService.listeEntreprises();
    this.entreprises = this.allEntreprises;
  }

  rechercherParNom(): void {
    this.activeSearchTerm = this.searchTerm.trim().toLowerCase();
    this.rafraichirResultats();
  }

  supprimerEntreprise(ent: Entreprise): void {
    if (confirm('etes-vous sur ?')) {
      this.entrepriseService.supprimerEntreprise(ent);
      this.rafraichirResultats();
    }
  }

  private rafraichirResultats(): void {
    this.entreprises = this.activeSearchTerm
      ? this.allEntreprises.filter(entreprise =>
          entreprise.nomEntreprise.toLowerCase().includes(this.activeSearchTerm))
      : this.allEntreprises;
  }
}
