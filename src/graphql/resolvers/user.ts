import { prisma } from "../../config/prisma.config";
import createGraphQLError from "../../errors/graphql.error";
import { sign, verify } from "jsonwebtoken";
import transporter from "../../services/mail.service";
import { generateOTP, verifyOtpWithSecret } from "../../helpers/otpGenerate";
import * as EmailValidator from "email-validator";
import user from "../typedefs/user";
import {
  JwtPayload,
  LoginStatus,
  updateUserInput,
} from "../../types/user.type";
import { photoUpload } from "../../helpers/cloudnary.photoUpload";
export default {
  Query: {
    getUserById: async (_: any, { userId }: { userId: string }) => {
      let user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (user) {
        return user;
      } else {
        throw createGraphQLError("User not found", 404);
      }
    },
    getUsers: async () => {
      let users = await prisma.user.findMany();
      return users;
    },
  },
  Mutation: {
    loginViaEmail: async (_: any, { email }: { email: string }) => {
      let emailVerify = await EmailValidator.validate(email);
      if (emailVerify) {
        const { otp, secret } = await generateOTP();

        const mailConfigurations = {
          // It should be a string of sender/server email
          from: "mahespandi0321@gmail.com",
          to: email,
          // Subject of Email
          subject: "Email Verification",
          // This would be the text of email body
          html: `<!DOCTYPE html>
          <html>
            <head>
              <title></title>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <style type="text/css">
                /* FONTS */
                @media screen {
                  @font-face {
                    font-family: 'Lato';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Lato Regular'), local('Lato-Regular'),
                      url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff)
                        format('woff');
                  }
          
                  @font-face {
                    font-family: 'Lato';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Lato Bold'), local('Lato-Bold'),
                      url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff)
                        format('woff');
                  }
          
                  @font-face {
                    font-family: 'Lato';
                    font-style: italic;
                    font-weight: 400;
                    src: local('Lato Italic'), local('Lato-Italic'),
                      url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff)
                        format('woff');
                  }
          
                  @font-face {
                    font-family: 'Lato';
                    font-style: italic;
                    font-weight: 700;
                    src: local('Lato Bold Italic'), local('Lato-BoldItalic'),
                      url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff)
                        format('woff');
                  }
                }
          
                /* CLIENT-SPECIFIC STYLES */
                body,
                table,
                td,
                a {
                  -webkit-text-size-adjust: 100%;
                  -ms-text-size-adjust: 100%;
                }
                p {
                  margin: 0;
                }
          
                table,
                td {
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                }
          
                img {
                  -ms-interpolation-mode: bicubic;
                }
          
                /* RESET STYLES */
                img {
                  border: 0;
                  height: auto;
                  line-height: 100%;
                  outline: none;
                  text-decoration: none;
                }
          
                table {
                  border-collapse: collapse !important;
                }
          
                body {
                  height: 100% !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  width: 100% !important;
                }
          
                a {
                  color: #a1a1a1;
                }
                a:hover {
                  color: #a1a1a1;
                }
                a:active {
                  color: #a1a1a1;
                }
                a:visited {
                  color: #a1a1a1;
                }
          
                /* iOS BLUE LINKS */
                a[x-apple-data-detectors] {
                  color: inherit !important;
                  text-decoration: none !important;
                  font-size: inherit !important;
                  font-family: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
                }
          
                /* ANDROID CENTER FIX */
                div[style*='margin: 16px 0'] {
                  margin: 0 !important;
                }
              </style>
            </head>
          
            <body
              style="
                background-color: #ededed;
                margin: 0 !important;
                padding: 20px 0 !important;
              "
            >
              <table
                style="font-family: 'Lato'"
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
              >
                <tr>
                  <td bgcolor="#ededed" align="center">
                    <!-- 컨텐츠 영역 -->
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="max-width: 600px"
                    >
                      <tr>
                        <td bgcolor="#f74658" align="center">
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="max-width: 540px"
                          >
                            <!-- 최상단 ENDAND 로고 -->
                            <tr>
                              <td style="padding: 24px 6px">
                                <a href="https://endand.com" target="_blank">
                                  <img
                                    alt="Logo"
                                    src="https://s3cf.endand.com/assets/logo-white.png"
                                    width="120"
                                    border="0"
                                    style="
                                      display: block;
                                      width: 120px;
                                      max-width: 120px;
                                      min-width: 120px;
                                    "
                                  />
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="#f74658">
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="max-width: 600px"
                          >
                            <tr>
                              <td align="center">
                                <img
                                  alt="Logo"
                                  src="https://s3cf.endand.com/assets/verification-email.png"
                                  width="120"
                                  border="0"
                                  style="
                                    display: block;
                                    width: 120px;
                                    max-width: 120px;
                                    min-width: 120px;
                                  "
                                />
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td
                          bgcolor="#f74658"
                          align="center"
                          style="
                            font-size: 36px;
                            font-weight: bold;
                            color: white;
                            padding: 14px 0 50px;
                          "
                        >
                         Verify your email address
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="#ffffff" align="center" style="padding: 28px 6px">
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="max-width: 540px"
                          >
                            <tr>
                              <td
                                align="center"
                                style="
                                  color: #262626;
                                  font-size: 20px;
                                  font-weight: bold;
                                  padding-bottom: 8px;
                                "
                              >
                                Just one more step...
                              </td>
                            </tr>
                            <tr align="center" style="color: #262626">
                              <td style="font-size: 14px">
                                Click the button below to activate your ENDAND account.
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="center"
                                style="padding: 44px 0 60px; font-weight: bold"
                              >
                                <!-- ### 이메일 인증 URL -->
                                <h5>Your Password verification code</h5>
                                <h3>${otp}</h3>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr >
                      
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>`,
        };

        transporter.sendMail(mailConfigurations, (error: any, _info: any) => {
          if (error) throw Error(error);
        });

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
        const { firstName, lastName, profileImage } = input;
        let userProfileUpdate: any = {
          ...(firstName ? { firstName: firstName } : {}),
          ...(lastName ? { lastName: lastName } : {}),
          ...(profileImage
            ? { profileImage: await photoUpload(profileImage) }
            : {}),
        };
        let updateUser = await prisma.user.update({
          where: {
            id: userId,
          },
          data: userProfileUpdate,
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

        const mailConfigurations = {
          // It should be a string of sender/server email
          from: "mahespandi0321@gmail.com",
          to: email,
          // Subject of Email
          subject: "Email Verification",
          // This would be the text of email body
          html: `<!DOCTYPE html>
          <html>
            <head>
              <title></title>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <style type="text/css">
                /* FONTS */
                @media screen {
                  @font-face {
                    font-family: 'Lato';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Lato Regular'), local('Lato-Regular'),
                      url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff)
                        format('woff');
                  }
          
                  @font-face {
                    font-family: 'Lato';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Lato Bold'), local('Lato-Bold'),
                      url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff)
                        format('woff');
                  }
          
                  @font-face {
                    font-family: 'Lato';
                    font-style: italic;
                    font-weight: 400;
                    src: local('Lato Italic'), local('Lato-Italic'),
                      url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff)
                        format('woff');
                  }
          
                  @font-face {
                    font-family: 'Lato';
                    font-style: italic;
                    font-weight: 700;
                    src: local('Lato Bold Italic'), local('Lato-BoldItalic'),
                      url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff)
                        format('woff');
                  }
                }
          
                /* CLIENT-SPECIFIC STYLES */
                body,
                table,
                td,
                a {
                  -webkit-text-size-adjust: 100%;
                  -ms-text-size-adjust: 100%;
                }
                p {
                  margin: 0;
                }
          
                table,
                td {
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                }
          
                img {
                  -ms-interpolation-mode: bicubic;
                }
          
                /* RESET STYLES */
                img {
                  border: 0;
                  height: auto;
                  line-height: 100%;
                  outline: none;
                  text-decoration: none;
                }
          
                table {
                  border-collapse: collapse !important;
                }
          
                body {
                  height: 100% !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  width: 100% !important;
                }
          
                a {
                  color: #a1a1a1;
                }
                a:hover {
                  color: #a1a1a1;
                }
                a:active {
                  color: #a1a1a1;
                }
                a:visited {
                  color: #a1a1a1;
                }
          
                /* iOS BLUE LINKS */
                a[x-apple-data-detectors] {
                  color: inherit !important;
                  text-decoration: none !important;
                  font-size: inherit !important;
                  font-family: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
                }
          
                /* ANDROID CENTER FIX */
                div[style*='margin: 16px 0'] {
                  margin: 0 !important;
                }
              </style>
            </head>
          
            <body
              style="
                background-color: #ededed;
                margin: 0 !important;
                padding: 20px 0 !important;
              "
            >
              <table
                style="font-family: 'Lato'"
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
              >
                <tr>
                  <td bgcolor="#ededed" align="center">
                    <!-- 컨텐츠 영역 -->
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="max-width: 600px"
                    >
                      <tr>
                        <td bgcolor="#f74658" align="center">
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="max-width: 540px"
                          >
                            <!-- 최상단 ENDAND 로고 -->
                            <tr>
                              <td style="padding: 24px 6px">
                                <a href="https://endand.com" target="_blank">
                                  <img
                                    alt="Logo"
                                    src="https://s3cf.endand.com/assets/logo-white.png"
                                    width="120"
                                    border="0"
                                    style="
                                      display: block;
                                      width: 120px;
                                      max-width: 120px;
                                      min-width: 120px;
                                    "
                                  />
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="#f74658">
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="max-width: 600px"
                          >
                            <tr>
                              <td align="center">
                                <img
                                  alt="Logo"
                                  src="https://s3cf.endand.com/assets/verification-email.png"
                                  width="120"
                                  border="0"
                                  style="
                                    display: block;
                                    width: 120px;
                                    max-width: 120px;
                                    min-width: 120px;
                                  "
                                />
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td
                          bgcolor="#f74658"
                          align="center"
                          style="
                            font-size: 36px;
                            font-weight: bold;
                            color: white;
                            padding: 14px 0 50px;
                          "
                        >
                         Verify your email address
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="#ffffff" align="center" style="padding: 28px 6px">
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="max-width: 540px"
                          >
                            <tr>
                              <td
                                align="center"
                                style="
                                  color: #262626;
                                  font-size: 20px;
                                  font-weight: bold;
                                  padding-bottom: 8px;
                                "
                              >
                                Just one more step...
                              </td>
                            </tr>
                            <tr align="center" style="color: #262626">
                              <td style="font-size: 14px">
                                Click the button below to activate your ENDAND account.
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="center"
                                style="padding: 44px 0 60px; font-weight: bold"
                              >
                                <!-- ### 이메일 인증 URL -->
                                <h5>Your Password verification code</h5>
                                <h3>${otp}</h3>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr >
                      
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>`,
        };

        transporter.sendMail(mailConfigurations, (error: any, _info: any) => {
          if (error) throw Error(error);
        });

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
