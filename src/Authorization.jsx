import React from "react";

class Authorization extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: null,
    };
  }

  componentDidMount() {}

  async authorize(e) {
    e.preventDefault();

    const baseURL = `https://htf2020.zinderlabs.com/api`;

    let user = document.querySelectorAll("#username")[0].value;
    let pass = document.querySelectorAll("#password")[0].value;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ username: user, password: pass }),
    };
    const token = await fetch(
      `${baseURL}/auth/login`,
      requestOptions
    ).then((response) => response.json());

    setCookie("token", JSON.stringify(token), token.expires_in);

    window.location.reload();

    function setCookie(name, value, ttl) {
      let d = new Date();
      d.setTime(d.getTime() + ttl);
      document.cookie = `${name}=${value};expires=${d.toLocaleString()};path=/`;
    }
  }

  render() {
    const { accessToken } = this.state;
    return (
      <div className="card text-center">
        <p className="card-header">Login</p>
        <div className="card-body">
          <form onSubmit={this.authorize}>
            <label htmlFor="username">Username </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              defaultValue="zinderlabs7"
            ></input>
            <br />
            <label htmlFor="password">Password </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              defaultValue="q3Sk9RQW"
            ></input>
            <br />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export { Authorization };
