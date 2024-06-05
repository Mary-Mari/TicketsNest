import { ITour } from "src/interfaces/Tour";

export class TourDto implements ITour {
  name: string;
  description: string;
  tourOperator: string;
  price: string;
  img: string;
  id: string;
  type: string;
  date: string;

  constructor(
    name: string,
    description: string,
    tourOperator: string,
    price: string,
    img: string,
    type: string,
    date: string,
     
  ) 
  {
    this.name = name;
    this.description = description;
    this.tourOperator = tourOperator;
    this.price = price;
    this.img = img;
    this.type = type;
    this.date = date;
    this.img = img;

  }
}