import { useState } from 'react'
import Page from './components/Page'
import IdForm from './components/IdForm'
import Navigation from './components/Navigation'

import './App.css'

function App() {
    const [sub, setSub] = useState('')
    const [prac, setPrac] = useState('')
    const [id, setId] = useState('')

    const navSymbol = '>'
    const sharp = '#'

    const Rid = localStorage.getItem('id') !== null ? localStorage.getItem('id') : null
    const Rbatch = localStorage.getItem('batch') !== null ? localStorage.getItem('batch') : null
    const Rbranch = localStorage.getItem('branch') !== null ? localStorage.getItem('batch') : null

    const removeId = () => {
        localStorage.removeItem('id')
        localStorage.removeItem('branch')
        localStorage.removeItem('batch')
    }
    
    return (
        <div className="App">
            {Rid && Rbatch && Rbranch && <p className = 'h3'>{localStorage.getItem('batch')} {navSymbol} {localStorage.getItem('branch')} {sub && navSymbol} {sub} {prac && navSymbol} {prac && sharp} {prac}</p>}
            {/* {Rid && <button onClick = {removeId}>Clear</button>} */}
            <Navigation setSub = {setSub} setPrac = {setPrac} />
            {Rid && Rbatch && Rbranch ? <Page sub = {sub} prac = {prac} /> : <IdForm setid = {setId} />}
        </div>
    );
}

export default App;
