import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
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
    
}