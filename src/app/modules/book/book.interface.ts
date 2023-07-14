interface Review {
    rating: number;
    comment: string;
  }

interface Book {
    title: string;
    author: string;
    genre: string;
    publication_date: string;
    image_url: string;
    reviews: Review[];
  }
  

  