import { Connection } from 'typeorm';

const clearDb = async (connection: Connection): Promise<void> => {
  const entities = connection.entityMetadatas;

  entities.forEach(async (entity) => {
    const repository = connection.getRepository(entity.name);
    await repository.query(`DELETE FROM ${entity.tableName}`);
  });
};

export default clearDb;
