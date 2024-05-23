// customMiddleware.js or customThunk.js
import { PhoneNumberApi } from "./phoneNumberList.service";
import { EmailAddressListApi } from "./emailAddressList.service";
import { AppDispatch } from "../store";

export const invalidateTagsAcrossApis = () => async (dispatch: AppDispatch) => {
  dispatch(PhoneNumberApi.util.invalidateTags([{type: "phoneItem"}]));
  dispatch(EmailAddressListApi.util.invalidateTags([{type: "emailItem"}]));
};
