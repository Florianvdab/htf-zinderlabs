import "./App.css";
import { Datacenter } from "./Datacenter.jsx";
import { Authorization } from "./Authorization.jsx";

function getTokenFromCookie() {
  if (
    !!getCookie("token") &&
    JSON.parse(getCookie("token")).hasOwnProperty("access_token")
  ) {
    return JSON.parse(getCookie("token")).access_token;
  } else return null;
}

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function App() {
  if (getTokenFromCookie() != null) {
    return (
      <div className="App">
        <Datacenter />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Authorization />
      </div>
    );
  }
}

export default App;
