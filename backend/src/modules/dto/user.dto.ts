export class CreateUserDto {
    userId: Number;
    username: String;
    email: String;
    password: String;
    createdAt: Date;
    updatedAt: Date;
    hidden: Boolean;
}

export class UpdateUserDto {
    userId: Number;
    username: String;
    email: String;
    password: String;
    updatedAt: Date;
    hidden: Boolean;
}