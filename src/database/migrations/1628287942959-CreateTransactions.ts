import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransactions1628287942959 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'transactions',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'user_id',
              type: 'uuid'
            },
            {
              name: 'account_id',
              type: 'uuid'
            },
            {
              name: 'date',
              type: 'timestamp'
            },
            {
              name: 'amount',
              type: 'decimal(10,2)'
            },
            {
              name: 'type',
              type: 'varchar',
            },
            {
              name: 'category',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'source',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()'
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()'
            }
          ],
          foreignKeys: [
            {
              name: 'FKUser',
              referencedTableName: 'users',
              referencedColumnNames: ['id'],
              columnNames: ['user_id'],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE'
            },
            {
              name: 'FKAccount',
              referencedTableName: 'accounts',
              referencedColumnNames: ['id'],
              columnNames: ['account_id'],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE'
          },
          ]
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('transactions');
    }

}
