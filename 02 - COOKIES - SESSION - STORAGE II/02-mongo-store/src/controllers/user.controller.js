const users = [
  {
    username: "juan",
    password: "123456",
    admin: true,
  },
  {
    username: "jose",
    password: "1234",
    admin: false,
  },
];

export const login = (req, res) => {
  const { username, password } = req.body;
  const index = users.findIndex(
    (user) => user.username === username && user.password === password
  );
  if (index < 0) res.status(401).json({ msg: "Credenciales incorrectas" });
  else {
    const user = users[index];
    req.session.info = {
      loggedIn: true,
      count: 1,
      username: user.username,
      admin: user.admin,
    };

    //req.session.leggedIn = true
    //req.session.admin = user.admin
    res.json({ msg: "bienvenido!" });
  }
};

export const secretEndpoint = (req, res) => {
  req.session.info.count++;
  res.json({
    msg: "endpoint secreto",
    contador: req.session.info.count,
    session: req.session,
    sessionId: req.sessionID,
    cookies: req.cookies
  });
};

export const logout = (req, res) => {
  req.session.destroy();
  res.json({ msg: "logout ok" });
};
