import React from "react";
import { observer } from "mobx-react";
import { userStore } from "../../../api/UserStore";

export const AdminUsers = observer(() => {
  return (
    <div className="admin-users">
      <h1>Управление пользователями</h1>
      {/* Здесь будет логика управления пользователями */}
    </div>
  );
});