export type Platform = "ios" | "android";

export interface AppType {
  name: string;
  platform: Platform;
}

export interface Slide {
  appType: AppType;
  price: string;
  features: string[];
  videoSrc: string;
}
