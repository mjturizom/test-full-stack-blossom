
import { graphql } from 'graphql';
import schema from '../schemas/characterSchema';
import { dbMock as db } from './__mocks__/sequelize';
import { redisClient } from './__mocks__/redis';

jest.mock('../models');

//jest.mock('../services/redisCache');
jest.mock('redis', () => {
    return {
        createClient: jest.fn().mockReturnValue(() => redisClient),
    }
    });
describe('Character Queries', () => {
  beforeAll(async () => {
    await db.sequelize.sync();
  });

  afterAll(async () => {
    await db.sequelize.close();
    await redisClient.quit();
  });

  it('should return all characters', async () => {
    const query = `
      {
        characters {
          id
          name
          status
          species
          gender
          origin
          location
          image
        }
      }
    `;

    const result = await graphql({
      schema,
      source: query,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.characters).toHaveLength(2);
  });

  it('should return characters filtered by status', async () => {
    const query = `
      {
        characters(status: "Alive") {
          id
          name
          status
        }
      }
    `;

    const result = await graphql({
      schema,
      source: query,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.characters).toHaveLength(2);
  });
});
