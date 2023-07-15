interface Review {
    rating: number;
    comment: string;
  }

export interface IBook {
    title: string;
    author: string;
    genre: string;
    publication_date: string;
    image_url: string;
    reviews: Review[];
  }

  export type IFilterableFields = {
    searchTerm : string,
    genre: string,
    publicationYear:string
  }
  

  