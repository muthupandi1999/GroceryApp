import React from "react";
import { styled } from "styled-components";
// const Loader = styled.section`
//   .preloader {
//     text-align: center;
//     max-width: 20em;
//     width: 100%;
//     .cartLoader {
//       display: block;
//       margin: 0 auto 1.5em auto;
//       width: 8em;
//       height: 8em;
//       .cart__track {
//         stroke: hsla(var(--hue), 10%, 10%, 0.1);
//         transition: stroke var(--trans-dur);
//       }
//       .cart__lines {
//         stroke: var(--primary);
//         animation: cartLines 2s ease-in-out infinite;
//         .cart__top {
//           animation-name: cartTop;
//           animation: cartLines 2s ease-in-out infinite;
//         }
//       }
//       .cart__wheel1 {
//         animation-name: cartWheel1;
//         transform: rotate(-0.25turn);
//         transform-origin: 43px 111px;
//         animation: cartLines 2s ease-in-out infinite;
//         .cart__wheel-stroke {
//           animation-name: cartWheelStroke;
//           animation: cartLines 2s ease-in-out infinite;
//         }
//       }
//       .cart__wheel2 {
//         animation-name: cartWheel2;
//         transform: rotate(0.25turn);
//         transform-origin: 102px 111px;
//         animation: cartLines 2s ease-in-out infinite;
//         .cart__wheel-stroke {
//           animation-name: cartWheelStroke;
//           animation: cartLines 2s ease-in-out infinite;
//         }
//       }
//     }
//   }

// `;
function PageLoader() {
  return (
  
      <div className="preloader">
        <svg
          className="cartLoader"
          aria-label="Shopping cart line animation"
          viewBox="0 0 128 128"
          width="128px"
          height="128px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
          >
            <g className="cart__track" stroke="hsla(0,10%,10%,0.1)">
              <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
              <circle cx="43" cy="111" r="13" />
              <circle cx="102" cy="111" r="13" />
            </g>
            <g className="cart__lines" stroke="currentColor">
              <polyline
                className="cart__top"
                points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"
                strokeDasharray="338 338"
                strokeDashoffset="-338"
              />
              <g className="cart__wheel1" transform="rotate(-90,43,111)">
                <circle
                  className="cart__wheel-stroke"
                  cx="43"
                  cy="111"
                  r="13"
                  strokeDasharray="81.68 81.68"
                  strokeDashoffset="81.68"
                />
              </g>
              <g className="cart__wheel2" transform="rotate(90,102,111)">
                <circle
                  className="cart__wheel-stroke"
                  cx="102"
                  cy="111"
                  r="13"
                  strokeDasharray="81.68 81.68"
                  strokeDashoffset="81.68"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
  );
}

export default PageLoader;
