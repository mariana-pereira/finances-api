import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAccount1622928236217 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'accounts',
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
              name: 'bank',
              type: 'varchar'
            },
            {
              name: 'branch',
              type: 'varchar'
            },
            {
              name: 'account_number',
              type: 'varchar',
            },
            {
              name: 'account_type',
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
          ]
        })
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('accounts');
    }

}
