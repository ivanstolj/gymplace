import React from "react";
import AuthProvider from "./context/AuthContext";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <div>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
}
