//We will add pages here and wrapped them using a UseContext
<<<<<<< Updated upstream
import EnvironmentPage from "./pages/EnvironmentPage"

function App() {
return (
    <EnvironmentPage />
=======
import Control from "./components/control"
import Header from "./components/header"
import { Onboarding } from "./components/Onboarding"
import Sidebar from "./components/sidebar"
import { Signup } from "./components/SignUp"
import TrainingENV from "./components/trainingENV"
import "./styling/style.css"

function App() {
return (
    <div className="container">
        <Header/>
        <Sidebar/>
        <TrainingENV/>
        <Control/>
    </div>
    // <Onboarding/>
    // <Signup/>
>>>>>>> Stashed changes
)
}

export default App