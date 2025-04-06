import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../../common/entities/user.entity';
import { Staff } from '../../common/entities/staff.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupDto } from './dto/signup.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  // Inject the Guest_Auth repository and JwtService via dependency injection
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,

    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,

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



  // Validate staff credentials.
  async validateStaff(email: string, password: string): Promise<Staff | null> {
    // Retrieve the staff record by email.
    const staff = await this.staffRepository.findOne({ where: { email } });
    // Compare the provided password with the stored hashed password.
    
    console.log("existing pssword", staff ? staff.password : 'null');
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("entered Password",hashedPassword);
    console.log('password', password)
    if (staff && (await bcrypt.compare(password, staff.password))) {
      return staff;
    }
    return null;
  }

  // Generates a JWT token for an authenticated staff member.
  loginStaff(staff: Staff): { token: string } {
    // Create a payload with the staff's unique identifier and email.
    const payload = { sub: staff.id, email: staff.email };
    // Return a signed JWT token with an expiration time, using the secret from environment variables.
    return {
      token: this.jwtService.sign(payload, {
        secret: process.env.STAFF_JWT_SECRET, // The secret key for staff JWT tokens.
        expiresIn: process.env.STAFF_JWT_EXPIRATION, // Token expiration is set to 1 hour.
      }),
    };
  }

  // Changes the password for a given staff member.
  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    // Find the staff by their unique staffId.
    const staff = await this.staffRepository.findOne({ where: { id } });
    if (!staff) throw new Error('Staff not found');

    console.log('old password bcrypt', staff.password);
    console.log('old password', changePasswordDto.oldPassword);
    bcrypt.hash(
      changePasswordDto.oldPassword,10)
    // Validate the old password provided by the staff.
    const isOldPasswordValid = await bcrypt.compare(
      changePasswordDto.oldPassword,
      staff.password,
    );
    if (!isOldPasswordValid) throw new Error('Invalid old password');

    // Hash the new password.
    staff.password = await bcrypt.hash(changePasswordDto.newPassword, 10);

    // Save the updated staff entity with the new password.
    await this.staffRepository.save(staff);
  }
}
