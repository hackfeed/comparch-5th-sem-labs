const getUser = () => {
  const email = document.querySelector("input")!.value;

  const pageBody = document.querySelector("main .centered")!;
  let result = pageBody!.querySelector(".result")!;
  let resultField: HTMLHeadingElement,
    emailField: HTMLHeadingElement,
    surnameField: HTMLHeadingElement,
    phoneField: HTMLHeadingElement;

  if (!result) {
    result = document.createElement("div");
    result.className = "result";

    resultField = document.createElement("h1");
    emailField = document.createElement("h2");
    surnameField = document.createElement("h2");
    phoneField = document.createElement("h2");

    result.appendChild(resultField);
    const userFields = [emailField, surnameField, phoneField];
    userFields.forEach((field) => result.appendChild(field));
    pageBody.appendChild(result);
  } else {
    resultField = result.querySelector("h1")!;

    emailField = result.querySelectorAll("h2")[0];
    surnameField = result.querySelectorAll("h2")[1];
    phoneField = result.querySelectorAll("h2")[2];
  }

  fetch(`/exercise_02/task/${encodeURI(email)}`)
    .then((response) => {
      if (!response.ok) {
        result.classList.add("result-error");
        result.classList.remove("result-ok");
        resultField.textContent = "Пользователя с указанным Email не существует";
        emailField.textContent = "";
        surnameField.textContent = "";
        phoneField.textContent = "";
      } else {
        response.json().then((data) => {
          result.classList.add("result-ok");
          result.classList.remove("result-error");
          resultField.textContent = "Пользователь с указанным Email найден";
          emailField.textContent = `Email: ${data.user.email}`;
          surnameField.textContent = `Фамилия: ${data.user.surname}`;
          phoneField.textContent = `Телефон: ${data.user.phone}`;
        });
      }
    })
    .catch((err) => console.log(err));
};

const getUserBtn = document.querySelector("button")!;
getUserBtn.addEventListener("click", getUser);
