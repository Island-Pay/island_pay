export const validateInput = (type, value) => {
  switch (type) {
    case "firstName":
    case "lastName":
      return value.trim().length > 0;
    case "username":
      return /^[a-zA-Z0-9_]{3,20}$/.test(value);
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    case "phoneNumber":
      return /^\+?[1-9]\d{1,14}$/.test(value);
    case "password":
      return value.length >= 8;
    default:
      return true;
  }
};
