import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from "../Home/Home"
import { Login } from '../Login/Login'
import { Register } from '../Register/Register'
import { Profile } from '../Profile/Profile'
import { Trips } from '../Trips/Trips'
import { Trip } from '../Trip/Trip'
import { UserTrips } from '../UserTrips/UserTrips'
import { Admin } from '../Admin/Admin'
import { Messages } from '../Messages/Messages'

export const Body = () => {

  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/trips" element={<Trips/>} />
        <Route path="/trip" element={<Trip/>} />
        <Route path="/user/trips" element={<UserTrips/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/messages" element={<Messages/>} />
    </Routes>
  )
}
