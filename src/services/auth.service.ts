import {
  EActionTokenType,
  EEmailActions,
  ESmsActionEnum,
  EUserStatus,
} from "../enums";
import { ApiError } from "../errors";
import { ActionToken, OldPassword, Token, User } from "../models";
import {
  emailService,
  passwordService,
  smsService,
  tokenService,
} from "../services";
import { ICredentials, ITokenPair, ITokenPayload, IUser } from "../types";

class AuthService {
  public async register(body: IUser): Promise<void> {
    try {
      const { password } = body;
      const hashedPassword = await passwordService.hash(password);

      await User.create({
        ...body,
        password: hashedPassword,
      });
      await Promise.all([
        emailService.sendMail(
          "artemkhilchenko09@gmail.com",
          EEmailActions.WELCOME
        ),
        smsService.sendSms("+447453313060", ESmsActionEnum.WELCOME),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async login(
    credentials: ICredentials,
    user: IUser
  ): Promise<ITokenPair> {
    try {
      const isMatched = await passwordService.compare(
        credentials.password,
        user.password
      );

      if (!isMatched) {
        throw new ApiError("Invalid email or password", 400);
      }

      const tokenPair = await tokenService.generateTokenPair({
        _id: user._id,
        name: user.name,
      });

      await Token.create({
        _user_id: user._id,
        ...tokenPair,
      });

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async refresh(
    tokenInfo: ITokenPair,
    jwtPayload: ITokenPayload
  ): Promise<ITokenPair> {
    try {
      const tokenPair = tokenService.generateTokenPair({
        _id: jwtPayload._id,
        name: jwtPayload.name,
      });

      await Promise.all([
        Token.create({ _user_id: jwtPayload._id, ...tokenPair }),
        Token.deleteOne({ refreshToken: tokenInfo.refreshToken }),
      ]);

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      const user = await User.findById(userId);

      const isMatched = await passwordService.compare(
        oldPassword,
        user.password
      );

      if (!isMatched) {
        throw new ApiError("Old password is invalid", 400);
      }

      const hashedPassword = await passwordService.hash(newPassword);
      await User.updateOne({ _id: user._id }, { password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async forgotPassword(user: IUser): Promise<void> {
    try {
      const actionToken = tokenService.generateActionToken(
        { _id: user._id },
        EActionTokenType.forgot
      );

      await ActionToken.create({
        actionToken,
        tokenType: EActionTokenType.forgot,
        _user_id: user._id,
      });

      await emailService.sendMail(
        "artemkhilchenko09@gmail.com",
        EEmailActions.FORGOT_PASSWORD,
        { token: actionToken }
      );

      await OldPassword.create({
        _user_id: user._id,
        password: user.password,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async setForgotPassword(password: string, id: string): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(password);

      await User.updateOne({ _id: id }, { password: hashedPassword });

      await ActionToken.deleteMany({
        _user_id: id,
        tokenType: EActionTokenType.forgot,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async sendActivateToken(user: IUser): Promise<void> {
    try {
      const actionToken = tokenService.generateActionToken(
        { _id: user._id },
        EActionTokenType.activate
      );

      await ActionToken.create({
        actionToken,
        tokenType: EActionTokenType.activate,
        _user_id: user._id,
      });

      await emailService.sendMail(
        "artemkhilchenko09@gmail.com",
        EEmailActions.ACTIVATE,
        { token: actionToken }
      );
    } catch (e) {
      throw new ApiError(e.messsage, e.status);
    }
  }
  public async activate(userId: string): Promise<void> {
    try {
      await Promise.all([
        User.updateOne(
          { _id: userId },
          { $set: { status: EUserStatus.active } }
        ),
        ActionToken.deleteMany({
          _user_id: userId,
          tokenType: EActionTokenType.activate,
        }),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
