import React from "react";
import styled from "styled-components";
const AddressBox = styled.section`
  .userHeaderInfo {
    padding-bottom: 16px;
    h4 {
      color: #666;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 4px;
    }
    h6 {
      color: #666;
      font-size: 12px;
    }
  }
  .UserInfo li {
    color: #666;
    font-size: 12px;
    padding:8px 0;
    cursor:pointer
  }

  #userWallet {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .QrInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:16px 0 0 0;

    .QrInfoImage {
      width: 100px;
      height: 100px;
      object-fit: cover;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .QrInfoDetails {
    width:50%;

  }
`;
function AddressModel({onClose}:{onClose:any}) {
  let userDta: any = localStorage.getItem("Credentials");
  let data: any = JSON.parse(userDta);

  const Logout = () => {
    localStorage.clear();
    onClose();
  }

  return (
    <AddressBox>
      <div className="userHeaderInfo">
        <h4>My Account</h4>
        <h6>{data?.phoneNo}</h6>
      </div>
      <div>
        <ul className="UserInfo">
          <li className="UserInfoList">My Orders</li>
          <li className="UserInfoList">Saved Address</li>
          <li className="UserInfoList">
            <div id="userWallet">
              <p>My Wallet</p>
              <p>$0</p>
            </div>
          </li>
          <li className="UserInfoList">FAQ's</li>
          <li onClick={() => Logout()} className="UserInfoList">Log Out</li>
        </ul>
      </div>
      <div className="QrInfo">
        <div className="QrInfoImage">
          <img
            src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg"
            alt=""
          />
        </div>
        <div className="QrInfoDetails">
          <p>Simple way to get groceries in minutes</p>
          <h6>Scan the QR code and download blinkit app</h6>
        </div>
      </div>
    </AddressBox>
  );
}

export default AddressModel;
