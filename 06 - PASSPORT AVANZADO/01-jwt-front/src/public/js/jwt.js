const form = document.getElementById("form");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const boton = document.getElementById("boton");

form.onsubmit = (e) => {
  e.preventDefault();
  const user = {
    email: inputEmail.value,
    password: inputPassword.value,
  };
  // console.log(user);

  fetch("http://localhost:8080/users/login", {
    method: "POST",

    body: JSON.stringify(user),

    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      // localStorage.setItem("token", response.token);
    });
};

// boton.onclick = () => {
//   fetch("http://localhost:8080/users/private-headers", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });
// };

boton.onclick = () => {
  fetch("http://localhost:8080/users/private-cookies");
};
