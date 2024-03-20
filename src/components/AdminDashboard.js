import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//admin dash for User/Event CRUD.
const AdminDashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users');
                setUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }, []);
     

    const handleEditUser = async (userId, updatedUserData) => {
        try {
                    const response = await axios.put(`http://localhost:5000/users/${userId}`, updatedUserData);
                    console.log(response.data);
                } catch (error) {
                    console.log(error);
                }
            };

            const handleDeleteUser = async (userId) => {
                try {
                    await axios.delete(`http://localhost:5000/users/${userId}`);
                    setUsers(users.filter(user => user.id!== userId));
                    console.log('User deleted');
                } catch (error) {
                    console.error('User Not Deleted');
                                    }
                                };

return(
    <div className='container'>
        <br></br>
        <h1>Admin Dashboard</h1>
        <table className='table'>

            <thead>
                <tr>
                 <th scope='col'>Id</th>
                 <th scope='col'>Name</th>
                 <th scope='col'>Email</th>
                 <th scope='col'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <button onClick={() => handleEditUser(user.id,{isAdmin: ! user.isAdmin})}> {user.isAdmin? 'Revoke Admin' : 'Make Admin'} </button>
                            <button onClick={() => handleDeleteUser(user.id)}> Delete </button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>

    </div>



                                        
);

};
export default AdminDashboard;


