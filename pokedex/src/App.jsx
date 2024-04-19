import "./styles.css"
import Login from "./Login"
import Layout from "./Layout"
import Pokemons from "./Pokemons"
import PokemonDetails from "./PokemonDetails"
import ProtectedRoutes from "./ProtectedRoutes"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={
            <ProtectedRoutes>
              <Pokemons />
            </ProtectedRoutes>
          } />
          <Route path='/pokemon/:name' element={
            <ProtectedRoutes>
              <PokemonDetails />
            </ProtectedRoutes>
          } />
        </Route>

      </Routes>
    </Router>

  )
}

