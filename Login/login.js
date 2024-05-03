function doLogin() {
  var username = document.getElementsByName("username")[0].value;
  var password = document.getElementsByName("password")[0].value;

  console.log(username + " - " + password);

  if (username == "admin" && password == "admin") {
    window.location.href = "../index.html";
  } else {
    alert("Usuário ou Senha inválidos!! tente admin admin");
  }
}
