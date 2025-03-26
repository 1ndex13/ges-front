import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { userStore } from '../../../api/UserStore';
import axiosInstance from '../../../api/axiosConfig';
import style from './AdminUsers.module.css'
import { Modal, Button, Table, Select, message } from 'antd';
import { div } from 'framer-motion/client';

const { Option } = Select;

export const AdminUsers = observer(() => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    roles: ['USER']
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/api/admin/users');
      setUsers(response.data);
    } catch (err) {
      message.error('Ошибка загрузки пользователей');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axiosInstance.put(`/api/admin/users/${userId}`, {
        roles: [newRole]
      });
      setUsers(users.map(user => 
        user.id === userId ? { ...user, roles: [newRole] } : user
      ));
      message.success('Роль обновлена');
    } catch (err) {
      message.error('Ошибка изменения роли');
    }
  };

  const handleStatusChange = async (userId, active) => {
    try {
      await axiosInstance.put(`/api/admin/users/${userId}`, { active });
      setUsers(users.map(user => 
        user.id === userId ? { ...user, active } : user
      ));
      message.success('Статус обновлен');
    } catch (err) {
      message.error('Ошибка изменения статуса');
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axiosInstance.delete(`/api/admin/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
      message.success('Пользователь удален');
    } catch (err) {
      message.error('Ошибка удаления пользователя');
    }
  };

  const showModal = (user = null) => {
    setCurrentUser(user);
    setFormData(user ? {
      username: user.username,
      email: user.email,
      password: '',
      roles: user.roles
    } : {
      username: '',
      email: '',
      password: '',
      roles: ['USER']
    });
    setIsModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      if (currentUser) {
        // Обновление пользователя
        await axiosInstance.put(`/api/admin/users/${currentUser.id}`, formData);
        message.success('Пользователь обновлен');
      } else {
        // Создание пользователя
        await axiosInstance.post('/api/admin/users', formData);
        message.success('Пользователь создан');
      }
      fetchUsers();
      setIsModalVisible(false);
    } catch (err) {
      message.error(err.response?.data?.message || 'Ошибка операции');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Имя пользователя',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Роль',
      key: 'roles',
      render: (_, user) => (
        <Select
          value={user.roles[0]}
          onChange={(value) => handleRoleChange(user.id, value)}
          style={{ width: 120 }}
        >
          <Option value="USER">Пользователь</Option>
          <Option value="ADMIN">Администратор</Option>
        </Select>
      ),
    },
    {
      title: 'Статус',
      key: 'active',
      render: (_, user) => (
        <Select
          value={user.active ? 'Активен' : 'Заблокирован'}
          onChange={(value) => handleStatusChange(user.id, value === 'Активен')}
          style={{ width: 120 }}
        >
          <Option value="Активен">Активен</Option>
          <Option value="Заблокирован">Заблокирован</Option>
        </Select>
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, user) => (
        <>
          <Button type="link" onClick={() => showModal(user)}>Редактировать</Button>
          {user.id !== userStore.userId && (
            <Button type="link" danger onClick={() => handleDelete(user.id)}>
              Удалить
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <div className={style.container}>
    <div className={style.admin_users}>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => showModal()}>
          Создать пользователя
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={users} 
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={currentUser ? 'Редактировать пользователя' : 'Создать пользователя'}
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
      >
        <div style={{ marginBottom: 16 }}>
          <label>Имя пользователя:</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Пароль:</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Роли:</label>
          <Select
            mode="multiple"
            value={formData.roles}
            onChange={(value) => setFormData({...formData, roles: value})}
            style={{ width: '100%' }}
          >
            <Option value="USER">Пользователь</Option>
            <Option value="ADMIN">Администратор</Option>
          </Select>
        </div>
      </Modal></div>
    </div>
  );
});