import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
//import { HEROES } from './mock-heroes'; reemplazada por otro origen de datos

@Injectable()
export class HeroService {

    private heroesUrl = 'app/heroes';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getHeroes(): Promise<Hero[]> {
        //return Promise.resolve(HEROES);
        return this.http.get(this.heroesUrl)
                .toPromise()
                .then(response => response.json().data as Hero[])
                .catch(this.handleError);
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]>(resolve =>
        setTimeout(resolve, 1000)) // delay 1 second
        .then(() => this.getHeroes());
    }

    getHero(id: number): Promise<Hero> {
        return this.getHeroes()
                .then(heroes => heroes.find(hero => hero.id === id));
    }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
        .put(url, JSON.stringify(hero), {headers: this.headers})
        .toPromise()
        .then(() => hero)
        .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        let url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}