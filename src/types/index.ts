export type Platform = "ios" | "android";

export interface AppType {
  name: string;
  platform: Platform;
}

export interface Slide {
  appType: AppType;
  price: {
    original: string;
    discounted: string;
  };
  features: string[];
  videoSrc: string;
}
