import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createCards1633210432257 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cards',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'user_id',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'number',
            type: 'varchar',
          },
          {
            name: 'limit',
            type: 'decimal(10,2)',
          },
          {
            name: 'expiry_day',
            type: 'integer',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKUserCard',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('cards');
    }
  }
