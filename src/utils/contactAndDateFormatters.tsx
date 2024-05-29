export const getDobValue = (dobValue: string) => {
  const [dobDay, dobMonth, dobYear] = dobValue.split("-").map(Number);

  const dob = new Date(`${dobMonth}-${dobDay}-${dobYear}`);

  const year = dob.getFullYear();
  const month = (dob.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so we add 1
  const day = dob.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const dateComparer = (dateObject: string): boolean => {
  const dob = new Date(dateObject).getTime();
  const currentDate = new Date().getTime();
  return dob > currentDate;
};

export const convertDate = (dateObject: string): string => {
  const dob = new Date(dateObject);

  const year = dob.getFullYear();
  const month = (dob.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so we add 1
  const day = dob.getDate().toString().padStart(2, "0");
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

export const phoneNumberCheck = (phoneNumber: string): boolean => {
  const pattern = /^[0-9]+$/;
  if (phoneNumber) {
    return !pattern.test(phoneNumber.trim());
  }
  return false;
};