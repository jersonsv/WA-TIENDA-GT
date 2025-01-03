import "./App.css";
import Profile from "./components/Profile.jsx";
import UserList from "./components/UserList.jsx";
import UserState from "./context/User/UserState.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <UserState>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-7">
            <UserList />
          </div>
          <div className="col-md-5">
            <Profile />
          </div>
        </div>
      </div>
    </UserState>
  );
}

export default App;
