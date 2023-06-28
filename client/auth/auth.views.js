console.log("hi");

const signInform = document.getElementById("signinform");
let loginVariable = document.getElementById("userorpass");
let signinpassword = document.getElementById("signinpass");
signInform.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSignIn();
  async function handleSignIn() {
    let res = await fetch("/auth/signin", {
      method: "post",
      body: JSON.stringify({
        variable: loginVariable.value,
        password: signinpassword.value,
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
      loginVariable.value = "";
      signinpassword.value = "";
      document.getElementById("signinerr").textContent = json.err;
    }
  }
});



