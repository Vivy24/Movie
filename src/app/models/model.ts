export interface Genre {
    id: number;
    name: string;
}

export interface IMDBInfo {
    id: string;
    rating: number;
    voteCount: number;
}

export interface streamInfo {
    type: string;
    link: string;
}

export interface Movie {
    age: number;
    backdropImage: string;
    cast: Array<string>;
    genres: Array<Genre>;
    imdb: IMDBInfo;
    title: string;
    overview: string;
    posterImage: string;
    year: number;
    streamSection: Array<streamInfo>
}

