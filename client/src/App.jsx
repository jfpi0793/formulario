import { useState } from 'react'
import './App.css'

function App() {


  return (
    <div className='cuadro'>
      <div>
        <h1 className='titulo'>Formulario de registro</h1>
      </div>
      <div className='contenido'>
        <form>
          <label>Ingresar usuario:</label>
          <input 
            type="text"
            name="username"
          />
          <label>Ingresar contraseña:</label>
          <input 
            type="password"
            name="password"
          />
          <label>Confirmar contraseña:</label>
          <input 
            type="password"
            name="password"
          />              
        </form>
          <a href="#" class="cta">
            <span>Ingresar</span>
            <svg width="10px" height="10px" viewBox="0 0 13 10">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </a>
      </div>
    </div>
  )
}

export default App
