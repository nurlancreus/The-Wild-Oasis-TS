import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";

import { SpinnerFullPage, ProtectedRoute, AppLayout } from "./ui";
import { Dashboard, Login, PageNotFound } from "./pages";

import DarkModeProvider from "./context/DarkModeContext";
import ToastProvider from "./lib/react-toastify/ToastProvider";

const Bookings = lazy(() => import("./pages/Bookings"));
const Cabins = lazy(() => import("./pages/Cabins"));
const Booking = lazy(() => import("./pages/Booking"));
const Checkin = lazy(() => import("./pages/Checkin"));
const Users = lazy(() => import("./pages/Users"));
const Account = lazy(() => import("./pages/Account"));
const Settings = lazy(() => import("./pages/Settings"));

function App() {
  return (
    <>
      <DarkModeProvider>
        <GlobalStyles />
        <ToastProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate replace to="dashboard" />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="bookings" element={<Bookings />} />
                  <Route path="bookings/:bookingId" element={<Booking />} />
                  <Route path="checkin/:bookingId" element={<Checkin />} />
                  <Route path="cabins" element={<Cabins />} />
                  <Route path="users" element={<Users />} />
                  <Route path="account" element={<Account />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ToastProvider>
      </DarkModeProvider>
    </>
  );
}

export default App;
