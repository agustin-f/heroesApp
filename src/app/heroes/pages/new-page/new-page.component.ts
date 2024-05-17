import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Publisher, Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent {

  public heroForm = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('',{ nonNullable: true}),
    publisher:        new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alt_img:         new FormControl('')
  });

  public publishers = [
    {
      id: 'DC Comics',
      desc: 'DC-Comics'
    },
    {
      id: 'MARVEL Comics',
      desc: 'MARVEL-Comics'
    }
  ];

  constructor (private heroesService:HeroesService){}
    get currentHero():Hero{
      const hero = this.heroForm.value as Hero;
      return hero;
    }
    
  

  onSubmit():void{
    if( this.heroForm.invalid) return;
    if(this.currentHero.id){
      this.heroesService.updateHeroe(this.currentHero)
      .subscribe(hero => {
        //FALTA MOSRTAR SNACKBAR
      });

      return
    }
    
    this.heroesService.addHeroe(this.currentHero)
      .subscribe(hero=>{
        //FALTA MOSTRAR SNACKBAR CON HEROE CREADO Y LLEVAR A /heroes/edit/hero.id
      })
    
  }

}
function currentHero() {
  throw new Error('Function not implemented.');
}

