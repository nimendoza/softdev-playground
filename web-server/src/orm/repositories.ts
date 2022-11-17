import { AppDataSource } from 'orm/data-source';
import { User } from 'orm/entities';

export const UserRepository = AppDataSource.getRepository(User);