export const AddressValidation = async(values) => {
    let error = {};
    if (values.firstName === "") {
        error.firstName = "Required";
      }
    if (values.lastName === "") {
        error.lastName = "Required";
    }
    if (values.address1 === "") {
        error.address1 = "Required";
    }
    if (values.city === "") {
        error.city = "Required";
    }
    if (values.state === "") {
        error.state = "Required";
    }
    if (values.zip === "") {
        error.zip = "Required";
    }
    if (values.country === "") {
        error.country = "Required";
    }
      
    return error;
}

export const CardValidation = async(values) => {
    let error = {};
    const cardNumberPattern = /^[0-9]{16}$/;
    const cvvPattern = /^[0-9]{3,4}$/;
    const expirationPattern = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;

    if (values.cardNumber === "") {
        error.cardNumber = "Required";
    } else {
        const cardNumberWithoutSpaces = values.cardNumber.replace(/\s+/g, '');
        if (!cardNumberPattern.test(cardNumberWithoutSpaces)) {
            error.cardNumber = "Invalid card number";
        }
    }

    if (values.cvv === "") {
        error.cvv = "Required";
    } else if (!cvvPattern.test(values.cvv)) {
        error.cvv = "Invalid CVV";
    }
    if (values.name === "") {
        error.name = "Required";
    }
    if (values.expirationDate === "") {
        error.expirationDate = "Required";
    } else if (!expirationPattern.test(values.expirationDate)) {
        error.expirationDate = "Invalid expiration date";
    }
    return error;
}
  