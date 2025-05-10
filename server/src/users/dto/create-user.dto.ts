export class CreateUserDto {
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly activationLink: string;
  readonly studyStartDate: Date;
  // readonly secret2fa: string;
}
