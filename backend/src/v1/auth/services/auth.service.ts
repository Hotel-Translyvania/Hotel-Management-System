import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../../../common/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupDto } from '../dto/signup.dto';

@Injectable()
export class AuthService {
  // Inject the Guest_Auth repository and JwtService via dependency injection
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  //Handles user signup by creating a new user record.
  async signup(
    signupDto: SignupDto,
  ): Promise<{ userId: string; email: string }> {
    // Hash the plaintext password from the signup data with a salt factor of 10.
    //const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    // Create a new user entity, merging signup data with the hashed password.
    const user = this.userRepository.create({
      ...signupDto, 
    });

    // Save the newly created user entity into the database.
    await this.userRepository.save(user);

    // Return the user's ID and email as confirmation of successful signup.
    return { userId: user.id, email: user.email };
  }

  //  Validates user credentials during login.
  async validateUser(email: string, password: string): Promise<User | null> {
    // Retrieve the user record from the database by email.
    const user = await this.userRepository.findOne({ where: { email } });

    // Compare the provided password with the stored hashed password.
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    // Return null if the user is not found or the password does not match.
    return null;
  }

  //Generates a JSON Web Token (JWT) for an authenticated user.
  login(user: User): { token: string } {
    // Create a JWT payload containing the unique user identifier and email.
    const payload = { sub: user.id, email: user.email };

    // Sign and generate a JWT token with the payload.
    // The token uses the secret defined in the environment variable `JWT_SECRET`
    // and has an expiration time of 1 hour Wchich can also be changed in the environment variable(process.env.--variable name--).
    return {
      token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET, // JWT secret key loaded from the environment.
        expiresIn: process.env.JWT_EXPIRATION, // Token expiration time set to 1 hour.
      }),
    };
  }
}
