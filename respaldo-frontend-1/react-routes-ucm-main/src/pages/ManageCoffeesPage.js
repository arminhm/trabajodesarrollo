import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { getCoffees, createCoffee, updateCoffee, deleteCoffee } from '../services/api';
import '../pages/style.css';

function ManageCoffeesPage() {
    const { auth } = useContext(AuthContext);
    const [coffees, setCoffees] = useState([]);
    const [newCoffee, setNewCoffee] = useState({ name: '', description: '', price: '', image: '' });
    const [editingCoffee, setEditingCoffee] = useState(null);

    const fetchCoffees = useCallback(async () => {
        const data = await getCoffees(auth.token);
        if (data) {
            setCoffees(data);
        }
    }, [auth.token]);

    useEffect(() => {
        fetchCoffees();
    }, [fetchCoffees]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCoffee({ ...newCoffee, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            if (editingCoffee) {
                setEditingCoffee({ ...editingCoffee, image: reader.result.split(',')[1] });
            } else {
                setNewCoffee({ ...newCoffee, image: reader.result.split(',')[1] });
            }
        };
        reader.readAsDataURL(file);
    };

    const handleCreateCoffee = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', newCoffee.name);
            formData.append('price', newCoffee.price);
            formData.append('description', newCoffee.description);
            if (newCoffee.image) {
                formData.append('foto', newCoffee.image);
            }

            await createCoffee(formData, auth.token);
            setNewCoffee({ name: '', description: '', price: '', image: '' });
            fetchCoffees();
        } catch (error) {
            console.error('Error creating coffee:', error);
        }
    };

    const handleEditCoffee = (coffee) => {
        setEditingCoffee(coffee);
    };

    const handleUpdateCoffee = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('idCoffee', editingCoffee.idCoffee);
            formData.append('name', editingCoffee.name);
            formData.append('price', editingCoffee.price);
            formData.append('description', editingCoffee.description);
            if (editingCoffee.image) {
                formData.append('foto', editingCoffee.image);
            }

            await updateCoffee(formData, auth.token);
            setEditingCoffee(null);
            fetchCoffees();
        } catch (error) {
            console.error('Error updating coffee:', error);
        }
    };

    const handleDeleteCoffee = async (id) => {
        try {
            await deleteCoffee(id, auth.token);
            fetchCoffees();
        } catch (error) {
            console.error('Error deleting coffee:', error);
        }
    };

    return (
        <div className="manage-coffees">
            
            <div className="form-and-table">
                <div className="form-manage">
                    <h2>Nuevo Caffee</h2>
                    <form onSubmit={editingCoffee ? handleUpdateCoffee : handleCreateCoffee}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            value={editingCoffee ? editingCoffee.name : newCoffee.name}
                            onChange={editingCoffee ? (e) => setEditingCoffee({ ...editingCoffee, name: e.target.value }) : handleInputChange}
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder="Descripción"
                            value={editingCoffee ? editingCoffee.description : newCoffee.description}
                            onChange={editingCoffee ? (e) => setEditingCoffee({ ...editingCoffee, description: e.target.value }) : handleInputChange}
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Precio"
                            value={editingCoffee ? editingCoffee.price : newCoffee.price}
                            onChange={editingCoffee ? (e) => setEditingCoffee({ ...editingCoffee, price: e.target.value }) : handleInputChange}
                        />
                        <input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                        />
                        <button type="submit">{editingCoffee ? 'Actualizar' : 'Crear'}</button>
                    </form>
                </div>
                <div className="form-manage">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Imagen</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coffees.map((coffee) => (
                                <tr key={coffee.idCoffee}>
                                    <td>{coffee.idCoffee}</td>
                                    <td>{coffee.name}</td>
                                    <td>{coffee.description}</td>
                                    <td>{coffee.price}</td>
                                    <td><img src={`data:image/png;base64,${coffee.image64}`} alt={coffee.name} width="50" /></td>
                                    <td className="table-actions">
                                        <button onClick={() => handleEditCoffee(coffee)}>Editar</button>
                                        <button onClick={() => handleDeleteCoffee(coffee.idCoffee)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export { ManageCoffeesPage };
