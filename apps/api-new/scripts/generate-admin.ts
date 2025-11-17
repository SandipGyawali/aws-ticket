import AppDataSource from "src/data-source";
import { ROLE, User } from "src/users/entities/user.entity";
import "dotenv/config";
import * as bcrypt from 'bcrypt';

async function generateAdminUser() {
  console.log("Starting admin user generation script...");

  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
    process.exit(1);
  }

  const queryRunner = AppDataSource.createQueryRunner();

  try {
    await queryRunner.connect();

    const root_username = process.env.ROOT_USER;
    const root_password = process.env.ROOT_PASSWORD;
    const salt_rounds = process.env.SALT_ROUNDS

    if (!root_username || !root_password ) {
      console.error("ROOT_USER and ROOT_PASSWORD must be set in your .env file.");
      return; 
    }

    const userRepository = queryRunner.manager.getRepository(User);

    const existingAdmin = await userRepository.findOneBy({ username: root_username });

    if (existingAdmin) {
      console.log(`Admin user with username '${root_username}' already exists. Skipping creation.`);
      return;
    }

    if(!salt_rounds){
      throw new Error("Salt rounds not found in .env")
    }
    const saltRounds = parseInt(salt_rounds);
    const hashedPassword = await bcrypt.hash(root_password, saltRounds);

    const adminUser = userRepository.create({
      username: root_username, 
      password: hashedPassword, 
      role: ROLE.ADMIN
    });

    const savedUser = await userRepository.save(adminUser);

    console.log("Successfully created new admin user:");
    console.log(`Username: ${savedUser.username}`);
    console.log(`Role:    ${savedUser.role}`);

  } catch (error) {
    console.error("An error occurred during admin user creation:", error);
  } finally {
    console.log("Releasing database connection...");
    await queryRunner.release();

    await AppDataSource.destroy();
    console.log("Data Source has been destroyed.");
  }
}

generateAdminUser();
