// src/pages/UserListPage.js
import React, { useEffect, useState, useContext } from 'react';
import { getUsers, updateUserStatus } from '../services/api';
import { AuthContext } from '../auth/AuthContext';
import './style.css';

const UserListPage = () => {
    const { auth } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getUsers(auth.token);
            if (data) {
                setUsers(data);
            }
        };

        fetchUsers();
    }, [auth.token]);

    const toggleUserStatus = async (username, newLocked, newDisabled) => {
        const updatedUsers = users.map(user => 
            user.username === username ? { ...user, locked: newLocked, disabled: newDisabled } : user
        );
        setUsers(updatedUsers);

        try {
            const updatedUser = await updateUserStatus(username, newLocked, newDisabled, auth.token);
            if (!updatedUser) {
                setUsers(users);
            }
        } catch (error) {
            console.error('Error updating user status:', error);
            setUsers(users);
        }
    };

    return (
        <div>
            <h1>Lista de Usuarios</h1>
            <ul className="users-list">
                {users.map(user => (
                    <li key={user.username} className="user-item">
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Full Name: {user.fullName}</p>
                        <p>Locked: {user.locked ? 'Yes' : 'No'}</p>
                        <p>Disabled: {user.disabled ? 'Yes' : 'No'}</p>
                        <button onClick={() => toggleUserStatus(user.username, !user.locked, user.disabled)}>Toggle Lock</button>
                        <button onClick={() => toggleUserStatus(user.username, user.locked, !user.disabled)}>Toggle Disable</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { UserListPage };
