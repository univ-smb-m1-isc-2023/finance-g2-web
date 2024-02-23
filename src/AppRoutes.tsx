import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import LinePage from "./pages/LinePage"
import { PiePage } from "./pages/PiePage"

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    Component={HomePage}
                />
                <Route
                    path="/line"
                    Component={LinePage}
                />
                <Route
                    path="/pie"
                    Component={PiePage}
                />
            </Routes>
        </BrowserRouter>
    )
}