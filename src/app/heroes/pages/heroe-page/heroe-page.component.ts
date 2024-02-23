import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-heroe-page',
  templateUrl: './heroe-page.component.html',
  styleUrls: ['./heroe-page.component.css']
})
export class HeroePageComponent implements OnInit {

  public hero?:Hero;
  
  constructor(
    private heroesService:HeroesService,
    private activateRoute:ActivatedRoute,
    private router:Router
  ){}

  ngOnInit(): void {
     this.activateRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroById(id)),
      ).subscribe(hero => {
        
        if(!hero) return this.router.navigate(['/heroes/list']);

           this.hero = hero;
           return

        console.log({hero});
      })
  }
  
}
