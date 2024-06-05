type Description = {
  title: string;
  text: string[];
};

export type ProductDetails = {
  description: Description[];
  id: string;
  category: string;
  namespaceId: string;
  images: string[];
  name: string;
  capacity: string;
  capacityAvailable: string[];
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
  camera?: string;
  zoom?: string;
};
