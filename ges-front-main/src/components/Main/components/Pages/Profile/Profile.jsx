import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Profile = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const user = JSON.parse(localStorage.getItem("user"));

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <h1>Профиль</h1>
      <p>Логин: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};