import "./styles.css";

const form = document.querySelector("form");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email + span.error");
const postalCode = document.querySelector("#postal-code");
const postalCodeError = document.querySelector("#postal-code + span.error");
const password = document.querySelector("#password");
const passwordError = document.querySelector("#password + span.error");
const confirmPassword = document.querySelector("#confirm-password");
const confirmPasswordError = document.querySelector(
  "#confirm-password + span.error",
);
const submitBtn = document.querySelector("button");
const submitBtnError = document.querySelector("button + span.error");

email.addEventListener("blur", () => {
  if (email.validity.typeMismatch) {
    emailError.textContent = "Please enter a valid email address";
    emailError.className = "error active";
  } else {
    emailError.textContent = "";
    emailError.className = "error"; // removes active so no longer is error active
  }
});

postalCode.addEventListener("blur", () => {
  checkPostalCode();
});

function checkPostalCode() {
  const constraints = {
    us: [
      "^\\d{5}(-\\d{4})?$",
      "US postal codes must have 5 digits, followed by optional dash and 4 digits: e.g. 12345 or 12345-6789",
    ],
    ch: [
      "^(CH-)?\\d{4}$",
      "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
  };

  const country = document.querySelector("#country").value;
  const postalCode = document.querySelector("#postal-code");

  const constraint = new RegExp(constraints[country][0]);

  if (constraint.test(String(postalCode.value))) {
    postalCodeError.textContent = "";
    postalCodeError.className = "error";
    postalCode.className = "";
  } else {
    postalCodeError.textContent = constraints[country][1];
    postalCodeError.className = "error active";
    postalCode.classList.add("invalid");
  }
}

password.addEventListener("blur", () => {
  if (password.validity.tooShort) {
    passwordError.textContent =
      "Password must contain a minimum of 8 characters";
    passwordError.className = "error active";
  } else {
    passwordError.textContent = "";
    passwordError.className = "error";
  }
});

confirmPassword.addEventListener("blur", () => {
  if (confirmPassword.value === password.value) {
    confirmPasswordError.textContent = "";
    confirmPasswordError.className = "error";
    confirmPassword.className = "";
  } else {
    confirmPasswordError.textContent = "Passwords do not match";
    confirmPasswordError.className = "error active";
    confirmPassword.classList.add("invalid");
  }
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (form.checkValidity()) {
    console.log("High five! All elements were filled out correctly");
    submitBtnError.textContent =
      "High five! All elements were filled out correctly!";
    submitBtnError.className = "submit";
  } else {
    console.log("Required elements are still invalid");
    submitBtnError.textContent = "Required elements are invalid or missing";
    submitBtnError.className = "error active";
  }
});
