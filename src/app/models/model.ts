import { NumberValueAccessor } from "@angular/forms";

export enum movieType {
    Movie,
    Tvshow,

}
export interface Genre {
    id: number;
    name: string;
}

// export interface IMDBInfo {
//     id: string;
//     rating: number;
//     voteCount: number;
// }

export interface streamInfo {
    type: string;
    link: string;
}

export interface ProductionCompanies {
    logo_path?: string; // need to concat with https://image.tmdb.org/t/p/original
    name?: string;
    country?: string;
}

export interface Movie {
    id: number // movie id
    adult: boolean;
    backdropImage: string; // need to concat with https://image.tmdb.org/t/p/original
    posterImage: string;  // need to concat with https://image.tmdb.org/t/p/original
    title: string;
    overview?: string;
    release_date: string;
    languages: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    type: movieType;
}

export interface MovieDetail {
    genres: Array<Genre>;
    homepage?: string;
    country?: string;
    status?: string;
    tagline?: string;
    productions: Array<ProductionCompanies>;
    streamSection?: Array<streamInfo>,

}

export interface Trailer {
    source: string;     // need to concat key with https://www.youtube.com/watch?v=qtVobvo7AVo 
    type: string;
}

export interface Cast {
    profilePath?: string;
    character: string;
    department: string;
    name: string;
    id: number;
}

export interface Review {
    author: string,
    authorAvatar?: string,
    rating: number,
    content: string,
    createdAt: Date,
    id: string,
    url: string,
}