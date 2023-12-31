interface Review {
    rating: number;
    comment: string;
  }

export interface IBook {
    title: string;
    author: string;
    genre: string;
    publication_date: number;
    image_url: string;
    user_email?: string;
    reviews?: Review[];
  }

  

  