export type DogsType = {
    id:number,
    name:string,
    temperament?:string,
    life_span?:string,
    origin?:string,
    breed_group?:string,
    bred_for?:string,
    weight?: {
        metric?: string;   
    };
    height?: {
        metric?: string;   
    };
    reference_image_id?:string
}