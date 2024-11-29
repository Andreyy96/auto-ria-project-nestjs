import { MockServiceType } from '../../../../test/types/mock-service.type';
import { BrandRepository } from '../services/brand.repository';

export const mockBrandRepository: MockServiceType<BrandRepository> = {
  average: jest.fn(),
  clear: jest.fn(),
  count: jest.fn(),
  countBy: jest.fn(),
  createQueryBuilder: jest.fn(),
  decrement: jest.fn(),
  delete: jest.fn(),
  exist: jest.fn(),
  exists: jest.fn(),
  existsBy: jest.fn(),
  extend: jest.fn(),
  find: jest.fn(),
  findAndCount: jest.fn(),
  findAndCountBy: jest.fn(),
  findBy: jest.fn(),
  findByIds: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  findOneById: jest.fn(),
  findOneByOrFail: jest.fn(),
  findOneOrFail: jest.fn(),
  getId: jest.fn(),
  hasId: jest.fn(),
  increment: jest.fn(),
  insert: jest.fn(),
  maximum: jest.fn(),
  merge: jest.fn(),
  minimum: jest.fn(),
  preload: jest.fn(),
  query: jest.fn(),
  restore: jest.fn(),
  softDelete: jest.fn(),
  sum: jest.fn(),
  target: jest.fn(),
  update: jest.fn(),
  upsert: jest.fn(),
  create: jest.fn(),
  recover: jest.fn(),
  remove: jest.fn(),
  save: jest.fn(),
  softRemove: jest.fn(),
  manager: undefined,
  metadata: undefined,
};
