import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

// Pantallas 
import HomeScreen from '../pages/HomeScreen'
import PerfilScreen from '../pages/PerfilScreen'
import ProfesoresScreen from '../pages/ProfesoresScreen'
import CalendarioScreen from '../pages/CalendarioScreen'
import ServiciosScreen from '../pages/ServiciosScreen'
import LoginScreen from '../pages/LoginScreen'
import RegisterScreen from '../pages/RegisterScreen'
import ResetPasswordScreen from '../pages/ResetPasswordScreen'

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='' element={<Navigate to="/home" />} />
                <Route path='/home' element={<HomeScreen />} />
                <Route path='/profesores' element={<ProfesoresScreen />} />
                <Route path='/servicios' element={<ServiciosScreen />} />
                <Route path='/calendario' element={<CalendarioScreen />} />
                <Route path='/perfil' element={<PerfilScreen />} />
                <Route path='/register' element={<RegisterScreen />} />
                <Route path='/login' element={<LoginScreen />} />
                <Route path='/resetPassword' element={<ResetPasswordScreen />} />
            </Routes >
        </BrowserRouter >
    )
}
