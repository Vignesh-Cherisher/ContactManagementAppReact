export type ContactItem = {
  id: number;
  fName: string;
  lName: string;
  Address: string;
  url: string;
  dob: string;
  phone: string;
  email: string;
  isFav: boolean;
}

export type ContactItemList = {
  [key: string]: ContactItem;
}