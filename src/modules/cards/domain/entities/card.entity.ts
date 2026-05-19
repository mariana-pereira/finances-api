export class Card {
  constructor(
    public readonly id: string,
    public readonly card_number: string,
    public readonly expiration: Date,
    public readonly emitter: string,
    public readonly account_id: string,
  ) {}
}