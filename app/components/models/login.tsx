import React, { useState } from "react";
import { styled } from "styled-components";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { LoginViaPhone, OtpValidationForPhone } from "@/app/service/query";
import { LoginModelContainer, VerifyBox } from "@/app/assets/style";
import { useMutation } from "@apollo/client";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const getAllInputValues = () => {
  let combinedValue = "";
  const otpInputs = document.querySelectorAll(".otpInputBox");

  otpInputs.forEach((input: any) => {
    combinedValue += input.value;
  });

  return combinedValue;
};

function LoginCard({ onClose }: Readonly<{ onClose: any}>) {
  const [otpVerificationPage, setOtpVerificationPage] = useState(false);
  const [loginSuc, setLoginSuc] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const combinedOTP = getAllInputValues();
  console.log("comccccc", combinedOTP);

  const [LoginPhone] = useMutation(LoginViaPhone, {
    variables: { phoneNo: phoneNumber },
  });
  const [OtpVerifyPhone] = useMutation(OtpValidationForPhone);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const [fieldName, fieldIndex] = name.split("-");
    let fieldIntIndex = parseInt(fieldIndex, 10);

    if (value.length >= 1) {
      if (fieldIntIndex < 6) {
        const nextField: any = document.querySelector(
          `input[name=field-${fieldIntIndex + 1}]`
        );
        if (nextField !== null) {
          nextField.focus();
        }
      }
    } else {
      if (fieldIntIndex > 1) {
        const prevField: any = document.querySelector(
          `input[name=field-${fieldIntIndex - 1}]`
        );
        if (prevField !== null) {
          prevField.focus();
        }
      }
    }

    const combinedOTP = getAllInputValues();
    if (combinedOTP.length === 6 && phoneNumber.length === 10) {
      console.log("heyyyyyyyyyyyyyyyyy");
      OtpVerifyPhone({ variables: { phoneNo: phoneNumber, otp: combinedOTP } })
        .then((res: any) => {
          console.log("OTP verification response", res);
          let { data, accessToken, refreshToken } = res.data.loginPhoneNoOtpValidation;
          let Credentials: any = {
            userId:data?.id,
            phoneNo: data?.phoneNo,
            accessToken: accessToken,
            refreshToken: refreshToken,
          };
          localStorage.setItem("Credentials", JSON.stringify(Credentials));
          setLoginSuc(true);
          setTimeout(() => {
            onClose();
          }, 2000);

          // Proceed with logic after OTP verification
        })
        .catch((error: any) => {
          console.error("OTP verification error", error);
        });
    }
  };

  return (
    <LoginModelContainer>
      {!otpVerificationPage && !loginSuc && (
        <>
          <div className="imageBox">
            <img
              src="https://res.cloudinary.com/dmmsjhioj/image/upload/v1701078189/Grocery/shopping-basket-icon_1025-352_jyfiod.png"
              alt=""
            />
          </div>
          <h3>India's last minute app</h3>
          <h4>
            <a href="#">Log in</a> or <a href="#">Sign up</a>
          </h4>
          <div className="PhoneNoBox">
            <input
              className="PhoneNoInput"
              placeholder="Enter mobile number"
              type="text"
              maxLength={10}
              onInput={(e: any) => setPhoneNumber(e.target.value)}
            />
            <span className="phoneNoPrefix">+91</span>
          </div>

          <button
            onClick={() => {
              console.log("clcikii");
              if (phoneNumber.length === 10) {
                // Add validation for phone number length
                LoginPhone()
                  .then((res: any) => {
                    console.log("Login response", res);
                    alert(res?.data?.loginViaPhone?.otp);
                    setOtpVerificationPage(true);
                  })
                  .catch((error: any) => {
                    console.error("Login error", error);
                  });
              }
            }}
            className="loginButton"
          >
            Continue
          </button>
          <p className="policy">
            By continuing, you agree to our Terms of service & Privacy policy
          </p>
          <KeyboardBackspaceIcon onClick={onClose} className="backicon" />
        </>
      )}
      {otpVerificationPage && !loginSuc && (
        <VerifyBox>
          <div className="title">Otp Verification</div>
          <div className="verifyDetails">
            <p>We have a send a verification code to</p>
            <h3>+91 {phoneNumber}</h3>
            <div className="otpBox">
              <input
                maxLength={1}
                onChange={handleChange}
                name="field-1"
                className="otpInputBox"
                type="text"
              />
              <input
                maxLength={1}
                onChange={handleChange}
                name="field-2"
                className="otpInputBox"
                type="text"
              />
              <input
                maxLength={1}
                onChange={handleChange}
                name="field-3"
                className="otpInputBox"
                type="text"
              />
              <input
                maxLength={1}
                onChange={handleChange}
                name="field-4"
                className="otpInputBox"
                type="text"
              />
              <input
                maxLength={1}
                onChange={handleChange}
                name="field-5"
                className="otpInputBox"
                type="text"
              />
              <input
                maxLength={1}
                onChange={handleChange}
                name="field-6"
                className="otpInputBox"
                type="text"
              />
            </div>
            <a className="resentText" href="#">
              Resend Code
            </a>
          </div>
          <KeyboardBackspaceIcon
            onClick={() => setOtpVerificationPage(false)}
            className="backiconVerify"
          />
        </VerifyBox>
      )}
      {loginSuc && (
        <div className="successpage">
          <CheckCircleIcon className="successIcon" />
          <h3>Successfully logged in!</h3>
        </div>
      )}
    </LoginModelContainer>
  );
}

export default LoginCard;
