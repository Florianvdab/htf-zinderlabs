import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Zinlab</h1>
        <form>
          <p>Username: </p>
          <input type="text" id="username" name="username"></input>
          <p>Password: </p>
          <input type="password" id="password" name="password"></input>
          <br></br>
          <br></br>

          <a href="#" class="login-button">
            Login
          </a>
        </form>
      </header>
    </div>
  );
}

export default App;
