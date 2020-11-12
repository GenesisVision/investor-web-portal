import ImageBaseElement from "components/avatar/image-base.element";
import Deposit1 from "media/guides/guides-1/Deposit1.png";
import Deposit2 from "media/guides/guides-1/Deposit2.png";
import Deposit3 from "media/guides/guides-1/Deposit3.png";
import Withdrawal1 from "media/guides/guides-1/Withdrawal1.png";
import React from "react";

export type TGuide = {
  id: string;
  canonicalName: string;
  name: string;
  content: JSX.Element;
  button?: JSX.Element;
};

export type TNavGuide = {
  id: string;
  name: string;
  guides: TGuide[];
};

export const navGuides: TNavGuide[] = [
  {
    id: "guides-1",
    name: "Deposit & Withdrawal",
    guides: [
      {
        id: "deposit-1",
        canonicalName: "deposit-via-crypto-wallet",
        name: "Deposit via crypto wallet",
        content: (
          <>
            <h3>
              In order to deposit via crypto wallet simply follow the steps
              below:
            </h3>
            <ol>
              <li>Log in to your account.</li>

              <li>
                Open your <strong>GV wallet</strong>.
              </li>

              <li>Press “+” for the deposit through the crypto wallet</li>

              <li>
                Copy your wallet address and head over to your external crypto
                wallet to use it for the transfer.
              </li>
            </ol>
            <p>The deposit will appear in your GV wallet instantly.</p>
            <ImageBaseElement
              alt={"Deposit via crypto wallet"}
              src={Deposit1}
            />
          </>
        )
      },
      {
        id: "deposit-2",
        canonicalName: "deposit-via-bank-card",
        name: "Deposit via bank card",
        content: (
          <>
            <h3>To deposit using a fiat bank card follow the steps:</h3>
            <ol>
              <li>Log in to your account.</li>
              <li>
                Open your <strong>GV wallet</strong>.
              </li>
              <li>
                Click “<strong>Buy with card</strong>”. You will be redirected
                to the
                <strong>
                  <a href="https://www.moonpay.io/">
                    Moonpay payment processor.
                  </a>
                </strong>
              </li>
              <li>
                Fill in all the required details. The system will remember this
                information for future deposits.
              </li>
            </ol>
            <ImageBaseElement alt={"Deposit via bank card"} src={Deposit2} />
            <ImageBaseElement alt={"Deposit via bank card"} src={Deposit3} />
          </>
        )
      },
      {
        id: "deposit-3",
        canonicalName: "withdrawal",
        name: "Withdrawal",
        content: (
          <>
            <h3>To withdraw from your GV wallet follow the simple steps:</h3>
            <ol>
              <li>Log in to your account.</li>
              <li>
                Open your <strong>GV wallet</strong>.
              </li>
              <li>
                Press the “<strong>↑</strong>” sign and fill in the data in the
                window opened: your crypto wallet address and the amount to
                withdraw.
              </li>
              <li>
                <strong>Confirm</strong> your withdrawal in the confirmation
                email sent to your e-mail address.
              </li>
            </ol>
            <ImageBaseElement alt={"Deposit via bank card"} src={Withdrawal1} />
          </>
        )
      }
    ]
  }
];
