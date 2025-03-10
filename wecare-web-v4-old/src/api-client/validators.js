
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    return password.length >= 6;
};
export const validateContact = (contact) => {
    return contact.length=== 10;
};

export function validateName(name) {
    return (/^[A-Z a-z]+$/.test(name) || name === '')
}

export function validateNumber(params) {
    return (/^\d*$/.test(params))
}

export function validateIndianMobileNumber(number) {
    number = number.replace(/\D/g, '');
  
    if (number.length === 10) {
      if (/^[6-9]/.test(number)) {
        return true;
      }
    }
    return false;
  }