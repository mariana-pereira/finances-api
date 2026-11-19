export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid email or password.');
  }
}

export class EmailAlreadyUsedError extends Error {
  constructor() {
    super('Email is already in use.');
  }
}