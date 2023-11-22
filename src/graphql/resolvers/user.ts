import { prisma } from "../../config/prisma.config";
import createGraphQLError from "../../errors/graphql.error";
import { sign, verify } from "jsonwebtoken";
import { generateOTP, verifyOtpWithSecret } from "../../helpers/otpGenerate";
import * as EmailValidator from "email-validator";
import user from "../typedefs/user";
import {
  JwtPayload,
  LoginStatus,
  updateUserInput,
} from "../../types/user.type";
import { photoUpload } from "../../helpers/cloudnary.photoUpload";
import { sendMail } from "../../utils/common";

export default {
  Query: {
    getUserById: async (_: any, { userId }: { userId: string }) => {
      let user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          Address: true
        }
      });
      // console.dir(user, { depth: null })
      if (user) {
        return user;
      } else {
        throw createGraphQLError("User not found", 404);
      }
    },
    getUsers: async () => {
      let users = await prisma.user.findMany({
        include: {
          Address: true
        }
      });
      return users;
    },
  },
  Mutation: {
    loginViaEmail: async (_: any, { email }: { email: string }) => {
      let emailVerify = await EmailValidator.validate(email);
      if (emailVerify) {
        const { otp, secret } = await generateOTP();
        //SEND MAIL OTP
        sendMail(email, otp)
        await prisma.otpValidationEmail.create({
          data: {
            email: email,
            secret: secret,
            otp: otp,
          },
        });

        return {
          message: "Otp  successfully send on your email",
          otp: otp,
        };
      }
      throw createGraphQLError("Enter a valid email", 400);
    },

    loginViaPhone: async (_: any, { phoneNo }: { phoneNo: string }) => {
      if (phoneNo.length === 10) {
        const { otp, secret } = await generateOTP();

        await prisma.otpValidationPhone.create({
          data: {
            phoneNo: phoneNo,
            secret: secret,
            otp: otp,
          },
        });
        return {
          message: "Otp successfully send on your phone",
          otp: otp,
        };
      }
      throw createGraphQLError("Enter a valid number", 400);
    },

    loginEmailOtpValidation: async (
      _: any,
      { email, otp }: { email: string; otp: string }
    ) => {
      let existData = await prisma.otpValidationEmail.findFirst({
        where: { email: email },
      });

      let limit = existData!.countLimit;

      if (limit < 5) {
        let otpValid = verifyOtpWithSecret(existData!.secret, otp);

        if (!otpValid) {
          await prisma.otpValidationEmail.update({
            where: {
              id: existData?.id,
            },
            data: {
              countLimit: limit + 1,
            },
          });

          throw createGraphQLError(
            `you have a ${4 - limit} remaining attempt`,
            400
          );
        } else {
          let deleteOtp = await prisma.otpValidationEmail.delete({
            where: { id: existData?.id },
          });
          if (deleteOtp) {
            let userExist = await prisma.user.findUnique({
              where: {
                email: email,
              },
            });
            if (!userExist) {
              let user = await prisma.user.create({
                data: {
                  email: email,
                },
              });
              let accessToken = sign(
                { id: user.id, email: user.email, role: user.role },
                "secret",
                {
                  expiresIn: "1h",
                }
              );

              let refreshToken = sign(
                { id: user.id, email: user.email, role: user.role },
                "secret",
                { expiresIn: "1d" }
              );

              return {
                message: "Login successfully",
                accessToken: accessToken,
                refreshToken: refreshToken,
                data: user,
              } as unknown as LoginStatus;
            } else {
              let accessToken = sign(
                {
                  id: userExist.id,
                  email: userExist.email,
                  role: userExist.role,
                },
                "secret",
                {
                  expiresIn: "1h",
                }
              );

              let refreshToken = sign(
                {
                  id: userExist.id,
                  email: userExist.email,
                  role: userExist.role,
                },
                "secret",
                { expiresIn: "1d" }
              );
              return {
                message: "Login successfully",
                accessToken: accessToken,
                refreshToken: refreshToken,
                data: userExist,
              };
            }
          }
        }
      } else {
        throw createGraphQLError(
          `you have reached the maximum number of attempt, Try again`,
          400
        );
      }
    },

    loginPhoneNoOtpValidation: async (
      _: any,
      { phoneNo, otp }: { phoneNo: string; otp: string }
    ) => {
      let existData = await prisma.otpValidationPhone.findFirst({
        where: { phoneNo: phoneNo },
      });

      let limit = existData!.countLimit;

      if (limit < 5) {
        let otpValid = verifyOtpWithSecret(existData!.secret, otp);

        if (!otpValid) {
          await prisma.otpValidationPhone.update({
            where: {
              id: existData?.id,
            },
            data: {
              countLimit: limit + 1,
            },
          });

          throw createGraphQLError(
            `you have a ${4 - limit} remaining attempt`,
            400
          );
        } else {
          let deleteOtp = await prisma.otpValidationPhone.delete({
            where: { id: existData?.id },
          });
          if (deleteOtp) {
            let userExist = await prisma.user.findUnique({
              where: {
                phoneNo: phoneNo,
              },
            });
            if (!userExist) {
              let user = await prisma.user.create({
                data: {
                  phoneNo: phoneNo,
                },
              });
              let accessToken = sign(
                { id: user.id, email: user.phoneNo, role: user.role },
                "secret",
                {
                  expiresIn: "1h",
                }
              );

              let refreshToken = sign(
                { id: user.id, email: user.email, role: user.role },
                "secret",
                { expiresIn: "1d" }
              );

              return {
                message: "Login successfully",
                accessToken: accessToken,
                refreshToken: refreshToken,
                data: user,
              };
            } else {
              let accessToken = sign(
                {
                  id: userExist.id,
                  email: userExist.phoneNo,
                  role: userExist.role,
                },
                "secret",
                {
                  expiresIn: "1h",
                }
              );

              let refreshToken = sign(
                {
                  id: userExist.id,
                  email: userExist.phoneNo,
                  role: userExist.role,
                },
                "secret",
                { expiresIn: "1d" }
              );
              return {
                message: "Login successfully",
                accessToken: accessToken,
                refreshToken: refreshToken,
                data: user,
              };
            }
          }
        }
      } else {
        throw createGraphQLError(
          `you have reached the maximum number of attempt, Try again`,
          400
        );
      }
    },
    updateUserProfile: async (
      _: any,
      { userId, input }: { userId: string; input: updateUserInput }
    ) => {
      let userExist = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (userExist) {
        let { firstName, lastName, profileImage, addressInput } = input;

        let userProfileUpdate: any = {
          ...(firstName ? { firstName: firstName } : {}),
          ...(lastName ? { lastName: lastName } : {}),
          ...(profileImage
            ? { profileImage: await photoUpload(profileImage) }
            : {}),
        };

        if (addressInput != undefined) {
          let { apartment, address, label, pincode } = addressInput;
          let addressCreate = await prisma.address.create({
            data: {
              address,
              apartment: apartment,
              label: label,
              pincode: pincode,
              user: { connect: { id: userId } },
            },
          });
          userProfileUpdate = {
            ...userProfileUpdate,
            ...(addressInput
              ? { Address: { connect: { id: addressCreate.id } } }
              : {}),
          }
        }
        let updateUser = await prisma.user.update({
          where: {
            id: userId,
          },

          data: userProfileUpdate,
          include: {
            Address: true
          }
        });
        if (updateUser) {
          return {
            message: "Profile Updated Successfully",
            data: updateUser,
          };
        }
      }
      throw createGraphQLError("user not found", 404);
    },
    updateEmail: async (_: any, { email }: { email: string }) => {
      console.log("yesssssssss");
      let emailVerify = EmailValidator.validate(email);
      console.log(emailVerify);

      if (emailVerify) {
        const { otp, secret } = await generateOTP();
        //SEND MAIL OTP
        sendMail(email, otp)
        await prisma.otpValidationEmail.create({
          data: {
            email: email,
            secret: secret,
            otp: otp,
          },
        });

        return {
          message: "Otp  successfully send on your email",
          otp: otp,
        };
      }
      throw createGraphQLError("Enter a valid email", 400);
    },
    emailVerifyUpdate: async (
      _: any,
      { userId, otp, email }: { userId: string; otp: string; email: string }
    ) => {
      let existData = await prisma.otpValidationEmail.findFirst({
        where: { email: email },
      });

      let limit = existData!.countLimit;

      if (limit < 5) {
        let otpValid = verifyOtpWithSecret(existData!.secret, otp);

        if (!otpValid) {
          await prisma.otpValidationEmail.update({
            where: {
              id: existData?.id,
            },
            data: {
              countLimit: limit + 1,
            },
          });

          throw createGraphQLError(
            `you have a ${4 - limit} remaining attempt`,
            400
          );
        } else {
          let deleteOtp = await prisma.otpValidationEmail.delete({
            where: { id: existData?.id },
          });
          if (deleteOtp) {
            let userUpdate = await prisma.user.update({
              where: {
                id: userId,
              },
              data: {
                email: existData?.email,
              },
            });
            if (userUpdate) {
              return {
                message: "Email updated successfully",
                data: userUpdate,
              };
            }
          }
        }
      } else {
        throw createGraphQLError(
          `you have reached the maximum number of attempt, Try again`,
          400
        );
      }
    },

    updatePhoneNo: async (_: any, { phoneNo }: { phoneNo: string }) => {
      console.log("yesssssssss");
      if (phoneNo.length === 10) {
        const { otp, secret } = await generateOTP();

        await prisma.otpValidationPhone.create({
          data: {
            phoneNo: phoneNo,
            secret: secret,
            otp: otp,
          },
        });
        return {
          message: "Otp successfully send on your phone",
          otp: otp,
        };
      }
      throw createGraphQLError("Enter a valid number", 400);
    },

    phoneNoVerifyUpdate: async (
      _: any,
      { userId, otp, phoneNo }: { userId: string; otp: string; phoneNo: string }
    ) => {
      let existData = await prisma.otpValidationPhone.findFirst({
        where: { phoneNo: phoneNo },
      });

      let limit = existData!.countLimit;

      if (limit < 5) {
        let otpValid = verifyOtpWithSecret(existData!.secret, otp);

        if (!otpValid) {
          await prisma.otpValidationPhone.update({
            where: {
              id: existData?.id,
            },
            data: {
              countLimit: limit + 1,
            },
          });

          throw createGraphQLError(
            `you have a ${4 - limit} remaining attempt`,
            400
          );
        } else {
          let deleteOtp = await prisma.otpValidationPhone.delete({
            where: { id: existData?.id },
          });
          if (deleteOtp) {
            let userUpdate = await prisma.user.update({
              where: {
                id: userId,
              },
              data: {
                phoneNo: existData?.phoneNo,
              },
            });
            if (userUpdate) {
              return {
                message: "PhoneNo updated successfully",
                data: userUpdate,
              };
            }
          }
        }
      } else {
        throw createGraphQLError(
          `you have reached the maximum number of attempt, Try again`,
          400
        );
      }
    },

    accessTokenGenerate: async (
      _: any,
      { refreshToken }: { refreshToken: string }
    ) => {
      if (!refreshToken) {
        throw createGraphQLError(
          "Access Denied. No refresh token provided.",
          401
        );
      }

      let decoded = verify(refreshToken, "secret") as JwtPayload;

      let accessToken = sign(
        { id: decoded.id, email: decoded.email, role: decoded.role },
        "secret",
        { expiresIn: "1h" }
      );

      return accessToken;
    },
  },
};
