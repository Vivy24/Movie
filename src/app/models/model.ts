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

export interface Movie {
    id: number // movie id
    adult: boolean;
    backdropImage: string; // need to concat with https://image.tmdb.org/t/p/original
    posterImage: string;  // need to concat with https://image.tmdb.org/t/p/original
    title: string;
    overview: string;
    release_date: string;
    languages: string;
    genres: Array<number>; // store genre ID 
    streamSection?: Array<streamInfo>,
    vote_average: number;
    vote_count: number;
    popularity: number;
}

