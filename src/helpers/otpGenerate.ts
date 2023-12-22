import speakeasy from "speakeasy";

// Function to pad OTP to 6 digits if it's less than 6 digits
function padOTPToSixDigits(otp: string): string {
  const otpLength = otp.length;
  if (otpLength < 6) {
    const padding = "0".repeat(6 - otpLength);
    return padding + otp;
  }
  return otp;
}

export const generateOTP = async (): Promise<{
  secret: any;
  otp: any;
}> => {
  // Generate a secret key
  const secret = speakeasy.generateSecret({
    length: 20,
  });

  // Generate a TOTP based on the secret key and current time
  const totp = speakeasy.time({
    secret: secret.base32,
    encoding: "base32",
    step: 240,
    counter: 123,
  });

  const otp = padOTPToSixDigits(totp);

  return {
    secret: secret.base32,
    otp: otp,
  };
};

export const verifyOtpWithSecret = (secret: string, otp: string) => {
  const isValid = speakeasy.totp.verify({
    secret: secret,
    encoding: "base32",
    token: otp,
    step: 240,
    window: 100,
    counter: 123,
  });

  if (isValid) {
    //console.log("The OTP is valid.");
    return true;
  } else {
    //console.log("The OTP is invalid.");
    return false;
  }
};
