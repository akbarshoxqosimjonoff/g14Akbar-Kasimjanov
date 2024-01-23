
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");


  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-pass").value;



    44
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      "email": email,
      "pasword": password,


    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch('https://crudcrud.com/api/c78e9c1f83564740988b8a66216feb4e/todo', requestOptions)
      .then(response => response.text())
      .then(result => {
        window.location.href = "todo.html";
        console.log(result)

      })
      .catch(error => console.log('Sizda hatolik bor', error));
  });
});