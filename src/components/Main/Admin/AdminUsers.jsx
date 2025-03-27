import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { userStore } from '../../../api/UserStore';
import axiosInstance from '../../../api/axiosConfig';
import style from './AdminUsers.module.css'
import { Modal, Button, Table, Select, Input, message, Row, Col } from 'antd';

const { Option } = Select;
const { Search } = Input;

export const AdminUsers = observer(() => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    username: '',
    email: '',
    active: null,
  });


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (params = {}) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/admin/users/search', { params });
      setUsers(response.data);
    } catch (err) {
      message.error('Ошибка загрузки пользователей');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    // Убираем пустые параметры
    const params = Object.fromEntries(
      Object.entries(searchParams).filter(([_, v]) => v !== null && v !== '')
    );
    fetchUsers(params);
  };

  
  const handleStatusChange = async (userId, active) => {
    try {
      if (userId === userStore.userId) {
        message.warning("Вы не можете изменить свой статус!");
        return;
      }
  
      // Находим пользователя в списке
      const user = users.find(u => u.id === userId);
      
      // Отправляем обновлённые данные
      await axiosInstance.put(`/api/admin/users/${userId}`, {
        ...user,
        active
      });
  
      // Обновляем локальное состояние
      setUsers(users.map(u => 
        u.id === userId ? { ...u, active } : u
      ));
      
      message.success("Статус обновлён!");
    } catch (err) {
      message.error("Ошибка: " + err.response?.data?.message);
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
      dataIndex: 'roles',
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
       <div className={style.admin_users}>
      <div className={style.admin_users}>
    <Row gutter={16} align="middle" style={{ marginBottom: 16 }}>
      <Col span={7}>
        <Input
          placeholder="Поиск по имени"
          value={searchParams.username}
          onChange={(e) => setSearchParams({ ...searchParams, username: e.target.value })}
          onPressEnter={handleSearch}
        />
      </Col>
      <Col span={7}>
        <Input
          placeholder="Поиск по email"
          value={searchParams.email}
          onChange={(e) => setSearchParams({ ...searchParams, email: e.target.value })}
          onPressEnter={handleSearch}
        />
      </Col>
      <Col span={7}>
        <Select
          placeholder="Статус"
          style={{ width: '100%' }}
          value={searchParams.active}
          onChange={(value) => setSearchParams({ ...searchParams, active: value })}
          allowClear
        >
          <Option value={true}>Активен</Option>
          <Option value={false}>Заблокирован</Option>
        </Select>
      </Col>
      <Col span={3}>
        <Button 
          type="default"  // Серый цвет кнопки
          onClick={handleSearch}
          style={{ width: '100%' }}
        >
          Найти
        </Button>
      </Col>
    </Row>
      <Table 
        columns={columns} 
        dataSource={users} 
        rowKey="id"
        loading={loading}
      />
    </div></div>
  );
});