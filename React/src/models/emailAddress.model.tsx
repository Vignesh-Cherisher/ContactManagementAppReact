export type EmailAddressGroup = {
  id: string;
  work?: string;
  personal?: string;
}

export type EmailAddressGroupList = {
  [key: string] : EmailAddressGroup;
}