import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInvestments1629635624758 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'investments',
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
              name: 'target_id',
              type: 'uuid'
            },
            {
              name: 'name',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'type',
              type: 'varchar',
            },
            {
              name: 'tax',
              type: 'varchar',
            },
            {
              name: 'application_date',
              type: 'timestamp'
            },
            {
              name: 'redeem_date',
              type: 'timestamp'
            },
            {
              name: 'amount',
              type: 'decimal(10,2)'
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
            {
              name: 'FKTarget',
              referencedTableName: 'targets',
              referencedColumnNames: ['id'],
              columnNames: ['target_id'],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE'
            },
          ]
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('investments');
    }

}
