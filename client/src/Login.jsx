import axios from 'axios'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

function Login() {
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [usuario, setUsuario] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [confirmarContraseña, setConfirmarContraseña] = useState('')
  const [mostrarContraseña, setMostrarContraseña] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (usuario === '' || contraseña === '' || confirmarContraseña === '') {
      setError('Debe llenar todos los campos.');
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }

    if (contraseña.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      setTimeout(() => {
        setError('');
      }, 2000); 
      return;
    }

    if (contraseña !== confirmarContraseña) {
      setError('Las contraseñas no coinciden.');
      setTimeout(() => {
        setError('');
      }, 2000); 
      return;
    }
    setError('');

    try {
      const response = await axios.post('http://localhost:3002/api/form', {
        usuario,
        contraseña,
        confirmar_contraseña: confirmarContraseña,
      });

      console.log(response.data);
      setRegistroExitoso(true);
      
      setTimeout(() => {
        setRegistroExitoso(false);
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('El usuario ya está registrado.');
        setTimeout(() => {
          setError('');
        }, 2000);
      } else {
        console.error('Error al enviar el formulario:', error);
      }
    }
  }

  return (
    <div className='cuadro'>
      <div>
        <h1 className='titulo'>Formulario de registro</h1>
      </div>
      <div className='contenido'>
        <form>
          <label>Ingresar usuario:</label>
          <input 
            type="name"
            name="username"
            onChange={(e) => setUsuario(e.target.value)}
          />
          <label>Ingresar contraseña:</label>
          <input
            type={mostrarContraseña ? "text" : "password"}
            name="password"
            onChange={(e) => setContraseña(e.target.value)}
          />
          <label>Confirmar contraseña:</label>
          <input
            type={mostrarContraseña ? "text" : "password"}
            name="confirmPassword"
            onChange={(e) => setConfirmarContraseña(e.target.value)}
          />
          <button
            type="button"
            className='mostrar'
            onClick={() => setMostrarContraseña(!mostrarContraseña)}
          >
            Mostrar Contraseña
          </button>            
        </form>
          <button type='submit' className="cta" onClick={handleSubmit}>
            <span>Ingresar</span>
            <svg width="10px" height="10px" viewBox="0 0 13 10">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>
          {error && (
          <div className="alert alert-danger mt-3">
            {error}
          </div>
        )}
          {registroExitoso && (
            <div className="alert alert-success mt-3">
              ¡Registro exitoso!
            </div>
          )}
      </div>
    </div>
  )
}

export default Login;
