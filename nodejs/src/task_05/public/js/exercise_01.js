const addUser = (btn) => {
  const inputs = btn.parentNode.querySelectorAll("input");
  const email = inputs[0].value;
  const surname = inputs[1].value;
  const phone = inputs[2].value;

  const pageBody = document.querySelector("main .centered");
  let result = pageBody.querySelector(".result");
  let resultField;

  if (!result) {
    result = document.createElement("div");
    result.className = "result";

    resultField = document.createElement("h1");

    result.appendChild(resultField);
    pageBody.appendChild(result);
  } else {
    resultField = result.querySelector("h1");
  }

  fetch(
    `/exercise_01/task?email=${encodeURI(email)}&surname=${encodeURI(surname)}&phone=${encodeURI(
      phone
    )}`,
    {
      method: "POST",
    }
  )
    .then((response) => {
      if (!response.ok) {
        result.classList.add("result-error");
        result.classList.remove("result-ok");
        resultField.textContent =
          "Произошла ошибка добавления данных. Возможно, пользователь с введенными данными уже существует";
      } else {
        result.classList.add("result-ok");
        result.classList.remove("result-error");
        resultField.textContent = "Данные успешно добавлены";
      }
    })
    .catch((err) => console.log(err));
};
