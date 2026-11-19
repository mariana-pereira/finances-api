export class Account {
  constructor(
    public readonly id: string,
    public readonly bank: string,
    public readonly branch: string,
    public readonly account_number: string,
    public readonly user_id: string,
  ) {}
}