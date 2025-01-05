import { PocketBaseClient } from '@/app/pocketbase.provider';
import { Car } from '@/app/products/cars';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { debounceTime, distinctUntilChanged, of, Subject, switchMap } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    readonly #pocketbase = inject(PocketBaseClient);
    title = 'servicar';
    cities = ["BRASILIA - ASA NORTE", "BRASILIA - ASA SUL", "BRASILIA - GRANJA DO TORTO", "BRASILIA - JARDIM BOTANICO", "BRASILIA - JARDINS MANGUEIRAL", "BRASILIA - LAGO NORTE", "BRASILIA - LAGO SUL", "BRASILIA - NOROESTE", "BRASILIA - OCTOGONAL", "BRASILIA - PARK SUL", "BRASILIA - PARK WAY", "BRASILIA - SUDOESTE", "BRASILIA - VILA PLANALTO", "AGUAS CLARAS - ADE", "AGUAS CLARAS - AREAL", "AGUAS CLARAS - ARNIQUEIRA", "AGUAS CLARAS - NORTE", "AGUAS CLARAS - SUL", "CEILANDIA - CEILANDIA NORTE", "CEILANDIA - CEILANDIA SUL", "CEILANDIA - CONDOMINIO PRIVE LUCENA RORIZ", "CEILANDIA - SETOR HABITACIONAL POR DO SOL", "CEILANDIA - SETOR HABITACIONAL SOL NASCENTE", "CRUZEIRO - NOVO", "CRUZEIRO - VELHO", "GAMA - AREA ALFA", "GAMA - CIDADE NOVA", "GAMA - PONTE ALTA", "GAMA - SETOR CENTRAL", "GAMA - SETOR INDUSTRIAL", "GAMA - SETOR LESTE", "GAMA - SETOR OESTE", "GAMA - SETOR SUL", "GUARA - GUARA I", "GUARA - GUARA II", "GUARA - QUADRAS ECONOMICAS LUCIO COSTA", "GUARA - SETOR INDUSTRIAL", "JARDIM BOTANICO - JARDIM BOTÂNICO V", "JARDIM BOTANICO - JARDIM BOTÂNICO VI", "JARDIM BOTANICO - PARQUE JARDIM DAS PAINEIRAS", "JARDIM BOTANICO - QUINTAS DO TREVO", "JARDIM BOTANICO - SAN DIEGO", "JARDIM BOTANICO - SANTA BÁRBARA", "JARDIM BOTANICO - SOLAR DE BRASÍLIA", "NUCLEO BANDEIRANTE - METROPOLITANA", "NUCLEO BANDEIRANTE - NUCLEO BANDEIRANTE", "NUCLEO BANDEIRANTE - SETOR PLACA DA MERCEDES", "PARANOA - DEL LAGO II", "PARANOA - ITAPOA PARQUE", "PARANOA - PARANOA", "PARANOA - PARANOA PARQUE", "RECANTO DAS EMAS - RECANTO DAS EMAS", "RIACHO FUNDO - RIACHO FUNDO", "RIACHO FUNDO - RIACHO FUNDO II", "RIACHO FUNDO - ZONA RURAL", "SAMAMBAIA - SAMAMBAIA NORTE", "SAMAMBAIA - SAMAMBAIA SUL", "SANTA MARIA - CONDOMINIO RESIDENCIAL SANTA MARIA", "SANTA MARIA - RESIDENCIAL SANTOS DUMONT", "SANTA MARIA - SANTA MARIA", "SANTA MARIA - SETOR MEIRELES", "SETOR INDUSTRIAL - SAAN", "SETOR INDUSTRIAL - SIA", "SETOR INDUSTRIAL - SOF SUL", "SOBRADINHO - ALTO DA BOA VISTA", "SOBRADINHO - CONDOMINIO COMERCIAL E RESIDENCIAL SOBRADINHO", "SOBRADINHO - CONDOMÍNIO IMPÉRIO DOS NOBRES", "SOBRADINHO - CONDOMINIO MANSOES SOBRADINHO", "SOBRADINHO - CONDOMINIO RK", "SOBRADINHO - GRANDE COLORADO", "SOBRADINHO - NOVA COLINA", "SOBRADINHO - REGIAO DOS LAGOS", "SOBRADINHO - SETOR DE MANSOES DE SOBRADINHO", "SOBRADINHO - SETOR HABITACIONAL CONTAGEM", "SOBRADINHO - SETOR OESTE", "SOBRADINHO - SOBRADINHO", "TAGUATINGA - SETOR INDUSTRIAL", "TAGUATINGA - TAGUATINGA CENTRO", "TAGUATINGA - TAGUATINGA NORTE", "TAGUATINGA - TAGUATINGA SUL", "TAGUATINGA - VIAL SAO JOSE", "VARJAO - VARJAO", "VICENTE PIRES - COLONIA AGRICOLA SAMAMBAIA", "VICENTE PIRES - VICENTE PIRES"]
    selectedCities: string[] = []

    addSelected(item: any) {
        const city = item.target.value;

        if (city && !this.selectedCities.includes(city)) {
            this.selectedCities.push(city)
            if (this.cities.includes(city)) {
                this.cities = this.cities.filter(c => c !== city)
            }
            item.target.value = ''
            return
        }
    }

    removeCity(city: string) {
        this.cities.push(city)
        this.selectedCities = this.selectedCities.filter(c => c !== city)
    }

    // Car search
    searchCar$ = new Subject<string>();
    searchedCars: any = undefined

    ngOnInit() {
        this.searchCar$.pipe(
            debounceTime(800),
            distinctUntilChanged(),
            switchMap((searchTerm: string) => {
                if (searchTerm === '') {
                    return of([])
                }
                return this.#pocketbase.collection('cars').getList(1, 30, {
                    filter: `name ~ '${searchTerm}' || company ~ '${searchTerm}'`,
                    fields: 'name, nameUrl, company, priority'
                })
            })
        ).subscribe((result: any) => {
            this.searchedCars = result.items.sort((a: any, b: any) => b.priority - a.priority);
        })
    }
}
