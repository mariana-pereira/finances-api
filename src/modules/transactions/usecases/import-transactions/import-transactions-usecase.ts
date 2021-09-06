import readline from 'readline';
import { Readable } from 'stream';
import { getRepository } from 'typeorm';

import { Transaction } from '@modules/transactions/model/transaction';

interface Request {
  file: any;
  account_id: string;
  user_id: string;
}

class ImportTransactionsUseCase {
  public async execute({ file, account_id, user_id }: Request): Promise<void> {
    const buffer = file?.buffer;

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const transactionsLine = readline.createInterface({
      input: readableFile
    });

    const transactions = [];

    for await(const line of transactionsLine) {
      const transactionLineSplit = line.split(',');

      transactions.push({
        date: new Date(transactionLineSplit[0]),
        amount: Number(transactionLineSplit[1]),
        type: transactionLineSplit[2],
        category: transactionLineSplit[3],
        source: transactionLineSplit[4]
      });
    }

    const transactionsRepository = getRepository(Transaction);

    for await(const { date, amount, type, category, source } of transactions) {
      const transaction = transactionsRepository.create({
        date,
        amount,
        type,
        category,
        source,
        account_id,
        user_id
      });

      await transactionsRepository.save(transaction);
    }
  }
}

export { ImportTransactionsUseCase };
