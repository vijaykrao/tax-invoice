function LoginPage({ onLogin }) {
  const e = React.createElement;
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Simple validation - you can customize this
    if (username === "" || password === "") {
      setError("Please enter both username and password");
      return;
    }

    // Simple authentication - you can replace with real authentication
    if (username === "admin" && password === "admin") {
      setError("");
      onLogin(true);
    } else {
      setError("Invalid username or password");
    }
  };

  return e(
    "div",
    { className: "login-container" },
    e(
      "div",
      { className: "login-box" },
      e("h1", { className: "login-title" }, "Bill Generator"),
      e("h2", { className: "login-subtitle" }, "Login to Continue"),
      e(
        "form",
        { onSubmit: handleSubmit, className: "login-form" },
        e(
          "div",
          { className: "form-group" },
          e("label", { htmlFor: "username" }, "Username"),
          e("input", {
            type: "text",
            id: "username",
            className: "form-control",
            value: username,
            onChange: (e) => setUsername(e.target.value),
            placeholder: "Enter username",
            autoFocus: true,
          })
        ),
        e(
          "div",
          { className: "form-group" },
          e("label", { htmlFor: "password" }, "Password"),
          e("input", {
            type: "password",
            id: "password",
            className: "form-control",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            placeholder: "Enter password",
          })
        ),
        error &&
          e(
            "div",
            { className: "error-message" },
            e("span", null, "⚠️ " + error)
          ),
        e(
          "button",
          { type: "submit", className: "btn btn-primary btn-login" },
          "Login"
        ),
        e(
          "div",
          { className: "login-hint" },
          e("small", null, "Default credentials: admin / admin")
        )
      )
    )
  );
}

