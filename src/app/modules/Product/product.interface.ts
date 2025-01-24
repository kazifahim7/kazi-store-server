export type Product = {
    name: string;
    brand: string;
    price: number;
    category:
    | 'file'
    | 'ball Pen'
    | 'sticker'
    | 'tape'
    | 'eraser';
    description: string;
    quantity: number;
    inStock: boolean;
    img:string
};