export class CreateUserDto {
    username: String;
    email: String;
    password: String;
    hidden: Boolean;
}

export class UpdateUserDto {
    username: String;
    email: String;
    password: String;
    hidden: Boolean;
}