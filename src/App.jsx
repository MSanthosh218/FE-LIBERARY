import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./component/Register";
import Dashboard from "./component/Dashboard";
import Login from "./component/Login";
import './App.css'
import AdminPage from "./component/AdminPage";
import User from "./component/User";
import NavigationBar from "./component/NavigationBar";



function App() {
    return (
        <Router>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path = '/admin' element = {<AdminPage/>} />
                <Route path="/user/:id" element = {<User />} />
            </Routes>
        </Router>
    );
}

export default App;



// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Register from "./components/Register";
// import Dashboard from "./components/Dashboard";
// import Login from "./components/Login";
// import AdminPage from "./components/AdminPage";
// import User from "./components/User";
// import './App.css';

// function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Login />} />
//                 <Route path="/register" element={<Register />} />
//                 <Route path="/dashboard" element={<Dashboard />} />
//                 <Route path="/admin" element={<AdminPage />} />
//                 <Route path="/user" element={<User />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;

