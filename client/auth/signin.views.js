let signupform = document.getElementById("signupform");
let email = document.getElementById("email");
let password = document.getElementById("password");
let password2 = document.getElementById("password2");
let username = document.getElementById("username");

signupform.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSignUp();
  async function handleSignUp() {
    let res = await fetch("/auth/signup", {
      method: "post",
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        password2: password2.value,
        username: username.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let json = await res.json();
    console.log(json);
    if (res.ok) {
      location.href = "/";
    } else {
      console.log("hit");
      email.value = "";
      password.value = "";
      username.value = "";
      username.value = "";
      document.getElementById("signuperr").textContent = json.err;
    }
  }
});
