//We will add pages here and wrapped them using a UseContext
import Control from "./components/control"
import Header from "./components/header"
import { Onboarding } from "./components/Onboarding"
import Sidebar from "./components/sidebar"
import { Signup } from "./components/SignUp"
import TrainingENV from "./components/trainingENV"
import './styling/index.css';
import EnvironmentPage from "./pages/EnvironmentPage";

function App() {
return (
    // <div className="container">
    //     <Header/>
    //     {/* <EnvironmentPage /> */}
    //     <Sidebar/>
    //     <TrainingENV/>
    //     <Control/>
    // </div>
    // <Onboarding/>
    // <Signup/>
    <EnvironmentPage />
)
}

export default App