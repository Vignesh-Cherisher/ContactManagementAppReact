export type PhoneNumberGroup = {
  id: string;
  home?: string;
  work?: string;
  main?: string;
  other?: string;
}

export type PhoneNumberGroupList = {
  [key: string]: PhoneNumberGroup;
}