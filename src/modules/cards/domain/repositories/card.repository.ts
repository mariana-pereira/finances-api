import { Card } from "../entities/card.entity";



export abstract class CardRepository {
  abstract create(card : Card): Promise<Card>;
  abstract findById(id: string): Promise<Card | null>;
  abstract findAll(userId: string): Promise<Card[] | null>;
}