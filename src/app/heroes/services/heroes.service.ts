import { Injectable } from '@angular/core';
import { Observable, catchError, from, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { HttpClient } from '@angular/common/http';
import { enviroments } from 'src/enviroments/enviroments';

@Injectable({providedIn: 'root'})
export class HeroesService {

    private baseURL:string = enviroments.baseURL;

    constructor (private http:HttpClient) { }


    getHeroes():Observable<Hero[]>{
        return this.http.get<Hero[]>(`${ this.baseURL }/heroes`);
    }

    getHeroById(id:string):Observable<Hero | undefined>{
        return this.http.get<Hero>(`${ this.baseURL }/heroes/${id}`)
         .pipe(
            catchError(error => of(undefined))
         )
    }

    getSuggestions(query:string):Observable<Hero[]>{
        return this.http.get<Hero[]>(`${this.baseURL}/heroes?q=${query}&limit=6`)
    }


    addHeroe(hero:Hero):Observable<hero>{
        return this.http.post<Hero>(`${this.baseURL}/heroes`,hero);
    }

    updateHeroe(hero:Hero):Observable<hero>{
        if(!hero.id)throw Error('Hero id is required');
        return this.http.patch<Hero>(`${this.baseURL}/heroes/${hero.id}`,hero);
    }

    deleteHeroeById(id:string):Observable<boolean>{
        return this.http.delete<Hero>(`${this.baseURL}/heroes/${id}`)
            .pipe(
                catchError(err=> of(false)),
                map(resp => true)
            );
    }
    
}