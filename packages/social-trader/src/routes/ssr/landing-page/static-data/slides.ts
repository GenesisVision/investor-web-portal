import { WALLET_TOTAL_PAGE_ROUTE } from "pages/wallet/wallet.routes";
import ImgCreditCard from "routes/ssr/landing-page/images/slider/credit-card.svg";
import ImgPeople from "routes/ssr/landing-page/images/slider/people.svg";
import { REFERRAL_PROGRAM_ROUTE } from "routes/ssr/landing-page/static-data/nav-links";

export type TSlides = {
  id: number;
  title: string;
  text: string;
  image: string;
  link: string;
};

export const slides: TSlides[] = [
  {
    id: 0,
    title: "Pay with card",
    text:
      "Use your credit or debit card to buy crypto - get started right away as a trader, an investor or a manager on the Genesis Vision platform.",
    image: ImgCreditCard,
    link: WALLET_TOTAL_PAGE_ROUTE
  },
  {
    id: 1,
    title: "Enticing invitations",
    text:
      "Use the Genesis Vision two-level Affiliate Network to receive a percentage of the commission paid by your referrals… and your referrals’ referrals!",
    image: ImgPeople,
    link: REFERRAL_PROGRAM_ROUTE
  }
];
