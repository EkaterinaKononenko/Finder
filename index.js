
const formText = document.querySelector(".form-text");
const textarea = document.querySelector(".form-text__textarea");
const button = document.querySelector("button");
const arrInput = document.querySelector(".array__input");
const letterInput = document.querySelector(".letter__input");
const text = document.querySelector(".text");
const btnReset = document.querySelector(".form-text__reset");

formText.addEventListener("submit", onFormSubmit);
textarea.addEventListener("input", onTextareaInputChange);
button.addEventListener("click", onButtonSubmitClick);
btnReset.addEventListener("click", onBtnResetClick);

const formData = {
  message: "",
};

function onTextareaInputChange() {
  formData.message = textarea.value;
  const value = JSON.stringify(formData);
  localStorage.setItem("formData", value);
}

function onFormSubmit(e) {
  e.preventDefault();
  formData.message = textarea.value;
  const value = JSON.stringify(formData);
  localStorage.setItem("formData", value);
  const analyseText = localStorage.getItem("formData");
  console.log(analyseText);
  const string = Object.values(formData.message).join("");
  console.log(string);
  let words = string.split(" ");
  console.log(words);
  let a = [];
  words.map((word) => {
    let letter = word.slice(0, 1);
    let wordForCompare = word.substr(1);
    if (!wordForCompare.includes(letter.toLowerCase())) {
      a.push(letter);
      console.log(a);
    }
    arrInput.value = a;
  });
  let symbolsObj = a.reduce((acc, symbol) => {
    acc[symbol] = acc[symbol] ? acc[symbol] + 1 : 1;
    return acc;
  }, {});
  console.log(symbolsObj);
  let uniqLetter = a.find((letter) => symbolsObj[letter] === 1);
  if (!uniqLetter) {
    letterInput.value = "";
  } else {
    letterInput.value = uniqLetter;
  }
  console.log(uniqLetter);
}

function onButtonSubmitClick() {
  if (textarea.value === "") {
    return alert("Your form has empty fields. Add information and try again.");
  }
}

function onBtnResetClick() {
  letterInput.innerHTML = "";
  formText.reset();
  localStorage.removeItem("formData");
}
