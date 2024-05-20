import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Publisher, Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, filter } from 'rxjs'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('',{ nonNullable: true}),
    publisher:        new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alt_img:          new FormControl('')
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

  constructor (
    private heroesService:HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ){}


    get currentHero():Hero{
      const hero = this.heroForm.value as Hero;
      return hero;
    }

    ngOnInit(): void {
        
      if(!this.router.url.includes('edit'))return;

      this.activatedRoute.params
       .pipe(
         switchMap(({id}) => this.heroesService.getHeroById(id)),
       )
       .subscribe(hero => {

            if(!hero){ 
              this.router.navigateByUrl('/');
            }
              this.heroForm.reset(hero);
              return;

       });

    }
    
  

  onSubmit():void{

    if( this.heroForm.invalid) return;

    if(this.currentHero.id){
      this.heroesService.updateHeroe(this.currentHero)
      .subscribe(hero => {
        this.showSnackbar('Listo! el heroe ' + `${hero.superhero}` + ' fue actualizado de manera correcta');
        this.router.navigateByUrl('/heroes/edit/hero.id');
      });
      return
    }

    this.heroesService.addHeroe(this.currentHero)
    .subscribe(hero=>{
      this.showSnackbar('Listo! el heroe ' + `${hero.superhero}` + ' fue creado de manera correcta');
      this.router.navigateByUrl('/heroes/edit/hero.id');
    })

  }

  onDeleteHero() {
    if ( !this.currentHero.id ) throw Error('Hero id is required');

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.heroesService.deleteHeroeById( this.currentHero.id )),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
      .subscribe(() => {
        this.router.navigate(['/heroes']);
      });
}

  showSnackbar(message:string):void{
      this.snackBar.open( message, 'Aceptar', {
        duration:2500
      })
  }

  

// function currentHero() {
//   throw new Error('Function not implemented.');
// }

// function susbscribe(arg0: (wasDeleted: any) => void) {
//   throw new Error('Function not implemented.');
// }
}
