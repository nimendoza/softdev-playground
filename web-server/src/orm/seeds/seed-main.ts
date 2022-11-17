import { User } from 'orm/entities/User';
import { UserRepository } from 'orm/repositories';
import { AppDataSource } from 'orm/data-source';

(async () => {
await AppDataSource.initialize();

  let user = new User();
  user.email = 'b2023nimendoza@pshs.edu.ph';
  user.setPassword('password');
  await UserRepository.save(user);
})();