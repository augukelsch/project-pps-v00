import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/modules/auth/auth.controller';
import { AuthService } from '../src/modules/auth/auth.service';
import * as userRepo from '../src/storage/repositories/user.repositories';
import { HttpException } from '@nestjs/common';
import { AuthGuard, Public } from '../src/modules/auth/auth.guard';

jest.mock('../src/modules/auth/auth.guard', () => ({
  AuthGuard: jest.fn().mockImplementation(() => ({
    canActivate: jest.fn().mockReturnValue(true),
  })),
  Public: () => () => {},
}));

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    const mockUser = {
        _id: '123456',
        username: 'testuser',
        email: 'test@example.com',
        password: '12345',
        hidden: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    } as any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        signIn: jest.fn(),
                        register: jest.fn(),
                    },
                },
            ],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    describe('signIn', () => {
        it('should call AuthService.signIn', async () => {
            (authService.signIn as jest.Mock).mockResolvedValue(mockUser);
            const data = await authController.signIn({ username: 'testuser', password: '12345' });
            expect(data).toEqual(mockUser);
            expect(authService.signIn).toHaveBeenCalledWith('testuser', '12345');
        });
    });

    describe('register', () => {
        it('should call AuthService.register', async () => {
            (authService.register as jest.Mock).mockResolvedValue(mockUser);
            const data = await authController.register({ username: 'testuser', email: 'test@example.com', password: '12345', hidden: false });
            expect(data).toEqual(mockUser);
            expect(authService.register).toHaveBeenCalledWith('testuser', 'test@example.com', '12345', false);
        });
    });

    describe('remove', () => {
        it('should delete a user by username', async () => {
            jest.spyOn(userRepo, 'deleteOneByUsername').mockResolvedValue(mockUser);
            const data = await authController.remove('testuser');
            expect(data).toEqual(mockUser);
        });

        it('should throw BadRequest if username does not exist', async () => {
            jest.spyOn(userRepo, 'deleteOneByUsername').mockResolvedValue("This Username does not Exist, try a different Username!");
            await expect(authController.remove('nonexistent')).rejects.toThrow(HttpException);
        });
    });

    describe('getProfile', () => {
        it('should return the user from request', () => {
            const req = { user: mockUser };
            const data = authController.getProfile(req);
            expect(data).toEqual(mockUser);
        });
    });

    describe('getAllUsers', () => {
        it('should return all users', async () => {
            jest.spyOn(userRepo, 'readAllUser').mockResolvedValue([mockUser]);
            const data = await authController.getAllUsers();
            expect(data).toEqual([mockUser]);
        });
    });

    describe('updateUser', () => {
        it('should update a user successfully', async () => {
            jest.spyOn(userRepo, 'updateOneById').mockResolvedValue(mockUser);
            const data = await authController.updateUser('123456', { ...mockUser });
            expect(data).toEqual({ "User Updated Successfully!": { data: mockUser } });
        });

        it('should throw BadRequest if ID does not exist', async () => {
            jest.spyOn(userRepo, 'updateOneById').mockResolvedValue("This User ID does not Exist, try a different ID!" as any);
            await expect(authController.updateUser('123456', { ...mockUser })).rejects.toThrow(HttpException);

        });

        it('should throw Forbidden if a field cannot be changed', async () => {
            jest.spyOn(userRepo, 'updateOneById').mockResolvedValue("This field cannot be Changed!");
            await expect(authController.updateUser('123456', { ...mockUser })).rejects.toThrow(HttpException);
        });
    });
});
