export interface Product {
    _id: string;
    name: string;
    slug: {
      current: string;
    };
    description: string;
    price: number;
    rating: number;
    ratingCount: number;
    category: Category;
    tags: string[];
    sizes: string[];
    colors: Color[];
    images: Image[];
    stock: number;
  }
  
  export interface Category {
    _id: string;
    name: string;
    slug: {
      current: string;
    };
    image?: Image;
    description?: string;
  }
  
  export interface Color {
    name: string;
    hex: string;
  }
  
  export interface Image {
    _key?: string;
    asset: {
      _ref: string;
      _type: string;
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
  }
  
  export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    color?: string;
    size?: string;
  }
  
  