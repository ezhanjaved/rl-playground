import "../styling/style.css"
const Header = () => {
  return (
    <header className='header'>
        <h1>Reinforcement Learning Playground</h1>
        <div className='Window-Controls'>
            <span className='circle'></span>
            <span className='circle'></span>
            <span className='circle'></span>
        </div>
    </header>
  )
}

export default Header