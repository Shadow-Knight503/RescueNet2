import { StrictMode } from "react";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Nav from "./components/Nav.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Event from "./components/Event.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <main className="bg-slate-900 min-h-screen h-full py-14 px-24">
                <Nav/>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/events/:id" element={<Event />} />
                </Routes>
            </main>
        </BrowserRouter>
    </StrictMode>,
)
