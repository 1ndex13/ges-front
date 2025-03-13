import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../../../../api/UserStore";

export const Profile = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userStore.isAuthenticated) {
      navigate("/login");
    }
  }, [userStore.isAuthenticated, navigate]);

  const user = JSON.parse(localStorage.getItem("user"));

  if (!userStore.isAuthenticated) {
    return null;
  }

  return (
    <div>
      <h1>Профиль</h1>
      <p>Логин: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
});