declare global {
  interface Window {
    ethereum: any;
  }
}

export type OptionInput = {
    addressFrom: string;
    addressTo: string;
    amountFrom: string;
    amountTo: string;
    expiration: number;
}

export type OptionCreationData = {
  to: string,
  path: string[],
  ratio: number[],
  expiration: number
}

export type MenuTabs =
  | "home"
  | "trade"
  | "exchange"
  | "invest"
  | "create"
  | "about"
  | "execute"
  | "withdraw";

export type account = string | null;

export type Request = {
  name: string;
  email: string;
  phone: string;
};

export type defaultAction = {
  type: string;
  payload: any;
};

export type menuItems = {
  name: string;
  link: string;
  subMenu: {
    name: string;
    link: string;
  }[];
}[];

export type infoScheme = {
  heading: string;
  description: string;
  image: string;
  imagePosition: "left" | "right";
};

export type infoContent = {
  title: string;
  description: string;
  timeline: boolean;
  content: infoScheme[];
};

