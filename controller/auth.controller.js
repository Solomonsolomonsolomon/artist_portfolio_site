const { User } = require("./../model/database");
const bcrypt = require("bcrypt");
const path = require("path");
module.exports.registerUser = async (req, res, next) => {
  try {
    const { username, password, password2, email, admin } = await req.body;
    if (!username || !password || !password2 || !email) {
      throw new Error("all fields should be filled");
    }
    let userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      throw new Error("user already exists");
    } else {
      let usernameAlreadyExists = await User.findOne({ username });
      if (usernameAlreadyExists) {
        throw new Error("user already exists,");
      } else {
        if (password !== password2) throw new Error("passwords do not match");
        if (password.length < 6) throw new Error("password too short");

        let hash = await bcrypt.hash(password, 10);
        let newUser = new User({
          email,
          password: hash,
          username,
          admin: typeof admin != "undefined" ? true : false,
        });
        await newUser.save().then((user) => {
          req.logIn(user, async (err) => {
            if (err) {
              throw err;
            }
            res.json({ msg: "successful login" });
          });
        });
      }
    }
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const { variable, password } = req.body;

    let loginWithUsername = await User.findOne({ username: variable });
    let loginWithEmail = await User.findOne({ email: variable });
    if (!loginWithEmail && !loginWithUsername) {
      throw new Error("invalid login credentials");
    }
    async function handleLogin(loginMethod) {
      if (loginMethod) {
        let isValid = await bcrypt.compare(password, loginMethod.password);
        if (isValid) {
          req.logIn(loginMethod, (err) => {
            if (err) {
              throw err;
            }
            res.json({ msg: "successful login" });
          });
        } else {
          throw new Error("invalid login credentials");
        }
      }
    }
    await handleLogin(loginWithUsername);
    await handleLogin(loginWithEmail);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};
module.exports.getRegisterPage = async (req, res, next) => {
  res.sendFile(
    path.join(__dirname, "..", "client", "auth", "signup.views.html")
  );
};
module.exports.getLoginPage = async (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "client", "auth", "signIn.views.html")
  );
};

module.exports.logout = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ err: "err in logout" });
    }
    return res.status(204);
  });
};
