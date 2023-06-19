let years = document.getElementById("dateYears");
let months = document.getElementById("dateMonths");
let days = document.getElementById("dateDays");

let dayInput = document.getElementById("dayInput");
let monthInput = document.getElementById("monthInput");
let yearInput = document.getElementById("yearInput");

let inputNameDay = document.getElementById("inputNameDay");
let inputNameMonth = document.getElementById("inputNameMonth");
let inputNameYear = document.getElementById("inputNameYear");

let dayError = document.getElementById("dayError");
let monthError = document.getElementById("monthError");
let yearError = document.getElementById("yearError");

let submit = document.getElementById("arrowContainer");

let fieldRequired = "this field is required";

let pastMessage = "Must be in the past";

let validDateMessage = "Must be a valid date";

let actualYear = 2023;

let day = 0;

let month = 0;

let year = 0;

let regex = /^[0-9]{2}$/;

let regexYear = /^[0-9]{1,4}$/;

const resetStyle = () => {
  dayError.textContent = "";
  inputNameDay.classList.remove("error");
  dayInput.classList.remove("error");
  monthError.textContent = "";
  inputNameMonth.classList.remove("error");
  monthInput.classList.remove("error");
  yearError.textContent = "";
  inputNameYear.classList.remove("error");
  yearInput.classList.remove("error");
  years.textContent = "";
  months.textContent = "";
  days.textContent = "";
  dateOfBirth = "";
  correctInput = 0;
};

let dateOfBirth = "";

let correctInput = 0;

const handleClick = () => {
  resetStyle();
  if (parseInt(dayInput.value) > 31) {
    dayError.textContent = validDateMessage;
    inputNameDay.classList.add("error");
    dayInput.classList.add("error");
  } else if (!regex.test(dayInput.value)) {
    dayError.textContent = fieldRequired;
    inputNameDay.classList.add("error");
    dayInput.classList.add("error");
  } else {
    day = dayInput.value;
    correctInput += 1;
  }
  if (parseInt(monthInput.value) > 12) {
    monthError.textContent = validDateMessage;
    inputNameMonth.classList.add("error");
    monthInput.classList.add("error");
  } else if (!regex.test(monthInput.value)) {
    monthError.textContent = fieldRequired;
    inputNameMonth.classList.add("error");
    monthInput.classList.add("error");
  } else {
    month = monthInput.value;
    correctInput += 1;
  }
  if (parseInt(yearInput.value) > actualYear) {
    yearError.textContent = pastMessage;
    inputNameYear.classList.add("error");
    yearInput.classList.add("error");
  } else if (!regexYear.test(yearInput.value)) {
    yearError.textContent = fieldRequired;
    inputNameYear.classList.add("error");
    yearInput.classList.add("error");
  } else {
    year = yearInput.value;
    correctInput += 1;
  }
  if (correctInput === 3) {
    dateOfBirth = new Date(year, month - 1, day);

    const age = calculateAge(dateOfBirth);

    years.textContent = age.years;
    months.textContent = age.months;
    days.textContent = age.days;
  }
};

function calculateAge(dateOfBirth) {
  const currentDate = new Date();
  const differenceInMilliseconds = currentDate - dateOfBirth;

  // Convert milliseconds to seconds, minutes, hours, and days
  const millisecondsPerSecond = 1000;
  const secondsPerMinute = 60;
  const minutesPerHour = 60;
  const hoursPerDay = 24;
  const millisecondsPerDay =
    millisecondsPerSecond * secondsPerMinute * minutesPerHour * hoursPerDay;

  const differenceInDays = Math.floor(
    differenceInMilliseconds / millisecondsPerDay
  );

  // Calculate years
  const years = Math.floor(differenceInDays / 365);

  // Calculate months and remaining days
  const remainingDays = differenceInDays % 365;
  const months = Math.floor(remainingDays / 30);
  const days = remainingDays % 30;

  return { years, months, days };
}

submit.addEventListener("click", handleClick);
