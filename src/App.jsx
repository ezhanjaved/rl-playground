//We will add pages here and wrapped them using a UseContext
import Control from "./components/control"
import Header from "./components/header"
import Sidebar from "./components/sidebar"
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
)
}

export default App