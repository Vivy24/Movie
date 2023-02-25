import { movieType } from 'src/app/models/model';

export const sampleMovie = {
  adult: false,
  backdropImage:
    'https://image.tmdb.org/t/p/original/5gPQKfFJnl8d1edbkOzKONo4mnr.jpg',
  id: 76600,
  languages: 'en',
  popularity: 5332.225,
  posterImage:
    'https://image.tmdb.org/t/p/original/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
  release_date: '2022-12-14',
  title: 'Avatar: The Way of Water',
  vote_average: 7.7,
  vote_count: 3497,
  type: movieType.Movie,
};

// GET: https://api.themoviedb.org/3/movie/76600?api_key=ccca420ee41f1022a903c341a3fa53c6&language=en-US
export const sampleMovieDetail = {
  adult: false,
  backdropImage:
    'https://image.tmdb.org/t/p/original/5gPQKfFJnl8d1edbkOzKONo4mnr.jpg',
  genres: [
    {
      id: 878,
      name: 'Science Fiction',
    },
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 28,
      name: 'Action',
    },
  ],
  homepage: 'https://www.avatar.com/movies/avatar-the-way-of-water',
  id: 76600,
  language: 'en',
  title: 'Avatar: The Way of Water',
  overview:
    'Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.',
  popularity: 5332.225,
  production_companies: [
    {
      id: 574,
      logo_path:
        'https://image.tmdb.org/t/p/original/iB6GjNVHs5hOqcEYt2rcjBqIjki.png',
      name: 'Lightstorm Entertainment',
      origin_country: 'US',
    },
    {
      id: 127928,
      logo_path:
        'https://image.tmdb.org/t/p/original/cxMxGzAgMMBhTXkcpYYCxWCOY90.png',
      name: '20th Century Studios',
      origin_country: 'US',
    },
  ],
  production_countries: [
    {
      iso_3166_1: 'US',
      name: 'United States of America',
    },
  ],
  release_date: '2022-12-14',
  spoken_languages: [
    {
      english_name: 'English',
      iso_639_1: 'en',
      name: 'English',
    },
  ],
  status: 'Released',
  tagline: 'Return to Pandora.',
  video: false,
  vote_average: 7.7,
  vote_count: 3531,
};

// GET https://api.themoviedb.org/3/movie/76600/recommendations?api_key=ccca420ee41f1022a903c341a3fa53c6&language=en-US&page=1

export const recommendationsMovie = [
  {
    adult: false,
    backdropImage:
      'https://image.tmdb.org/t/p/original/c1bz69r0v065TGFA5nqBiKzPDys.jpg',
    id: 830784,
    title: 'Lyle, Lyle, Crocodile',
    language: 'en',
    // "overview": "When the Primm family moves to New York City, their young son Josh struggles to adapt to his new school and new friends. All of that changes when he discovers Lyle — a singing crocodile who loves baths, caviar and great music — living in the attic of his new home. But when Lyle’s existence is threatened by evil neighbor Mr. Grumps, the Primms must band together to show the world that family can come from the most unexpected places.",
    posterImage:
      'https://image.tmdb.org/t/p/original/irIS5Tn3TXjNi1R9BpWvGAN4CZ1.jpg',

    popularity: 526.877,
    release_date: '2022-10-07',
    vote_average: 7.69,
    vote_count: 239,
  },
  {
    adult: false,
    backdropImage:
      'https://image.tmdb.org/t/p/original/2Ft4xmWa1Edgj2P1OYmoSAoYRqz.jpg',
    id: 663712,
    title: 'Terrifier 2',
    language: 'en',
    posterImage:
      'https://image.tmdb.org/t/p/original/8gLhu8UFPZfH2Hv11JhTZkb9CVl.jpg',
    popularity: 826.014,
    release_date: '2022-10-06',
    vote_average: 6.993,
    vote_count: 837,
  },
  {
    adult: false,
    backdropImage:
      'https://image.tmdb.org/t/p/original/rpZFknesBbZL4uqESFcJ0aTnBo5.jpg',
    id: 676701,
    title: 'Tad, the Lost Explorer and the Emerald Tablet',
    language: 'es',
    // overview: "Tad accidentally unleashes an ancient spell, endangering the lives of his friends Mummy, Jeff, and Belzoni. With everyone against him and only helped by Sara, he sets off on an adventure to end the Curse of the Mummy.",
    posterImage:
      'https://image.tmdb.org/t/p/original/eEWi0ptaVSwLUs84rhZjtNIhgbp.jpg',
    popularity: 334.289,
    release_date: '2022-08-24',
    vote_average: 7.793,
    vote_count: 176,
  },
  {
    adult: false,
    backdropImage:
      'https://image.tmdb.org/t/p/original/au4HUSWDRadIcl9CqySlw1kJMfo.jpg',
    id: 829799,
    title: 'Paradise City',
    language: 'en',
    // overview: "Renegade bounty hunter Ryan Swan must carve his way through the Hawaiian crime world to wreak vengeance on the kingpin who murdered his father.",
    posterImage:
      'https://image.tmdb.org/t/p/original/xdmmd437QdjcCls8yCQxrH5YYM4.jpg',
    popularity: 452.896,
    release_date: '2022-11-11',
    vote_average: 5.716,
    vote_count: 51,
  },
  {
    adult: false,
    backdropImage:
      'https://image.tmdb.org/t/p/original/vNuHqmOJRQXY0PBd887DklSDlBP.jpg',
    id: 315162,
    title: 'Puss in Boots: The Last Wish',
    language: 'en',
    // overview: "Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.",
    posterImage:
      'https://image.tmdb.org/t/p/original/lmf0zzR7ritjOL3qumRh3hfvOFK.jpg',

    popularity: 1397.696,
    release_date: '2022-12-07',
    vote_average: 7.989,
    vote_count: 181,
  },
];
