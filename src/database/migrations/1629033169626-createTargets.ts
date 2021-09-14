import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTargets1629033169626 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'targets',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              isPrimary: true,
              generationStrategy: 'uuid',
            },
            {
              name: 'user_id',
              type: 'varchar'
            },
            {
              name: 'name',
              type: 'varchar'
            },
            {
              name: 'deadline',
              type: 'timestamp'
            },
            {
              name: 'necessary_amount',
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
                name: 'FKUserTarget',
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
      await queryRunner.dropTable('targets');
    }

}
