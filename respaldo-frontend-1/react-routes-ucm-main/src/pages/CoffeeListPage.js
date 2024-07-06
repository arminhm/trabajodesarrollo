import React, { useState, useEffect, useContext } from "react";
import { getCoffees, searchCoffeeByName, createTestimonial } from "../services/api";
import { AuthContext } from "../auth/AuthContext";
import {jwtDecode} from 'jwt-decode'; // Importación correcta sin llaves
import "../pages/style.css";

function CoffeeListPage() {
    const { auth } = useContext(AuthContext);
    const [coffees, setCoffees] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCoffee, setSelectedCoffee] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [testimonialModalVisible, setTestimonialModalVisible] = useState(false);
    const [newTestimonial, setNewTestimonial] = useState("");
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const fetchCoffees = async () => {
            const data = await getCoffees(auth.token);
            if (data) {
                setCoffees(data);
            }
        };

        fetchCoffees();
    }, [auth.token]);

    const handleSearch = async (e) => {
        setSearch(e.target.value);
        if (e.target.value) {
            const coffee = await searchCoffeeByName(e.target.value, auth.token);
            if (coffee) {
                setCoffees(coffee);
            }
        } else {
            const data = await getCoffees(auth.token);
            if (data) {
                setCoffees(data);
            }
        }
    };

    const handleShowComments = (coffee) => {
        setSelectedCoffee(coffee);
        setModalVisible(true);
    };

    const handleShowTestimonialModal = (coffee) => {
        setSelectedCoffee(coffee);
        setTestimonialModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedCoffee(null);
    };

    const handleCloseTestimonialModal = () => {
        setTestimonialModalVisible(false);
        setSelectedCoffee(null);
    };

    const handleCreateTestimonial = async () => {
        if (newTestimonial.trim() === "") {
            setAlert({ message: "El testimonio no puede estar vacío", type: "error" });
            setTimeout(() => setAlert(null), 3000);
            return;
        }

        const decodedToken = jwtDecode(auth.token);
        const fullName = decodedToken.fullname;

        const testimonialData = {
            username: decodedToken.sub,
            fullname: fullName,
            testimonial: newTestimonial,
            idCoffee: selectedCoffee.idCoffee,
            token: auth.token
        };

        console.log('Enviando testimonio:', testimonialData); 

        try {
            const response = await createTestimonial(testimonialData);

            console.log('Respuesta del servidor:', response); 

            const updatedCoffees = coffees.map((coffee) =>
                coffee.idCoffee === selectedCoffee.idCoffee
                    ? {
                          ...coffee,
                          testimonials: [
                              ...coffee.testimonials,
                              {
                                  idTestimonials: Date.now(),
                                  fullname: fullName,
                                  testimonial: newTestimonial,
                              },
                          ],
                      }
                    : coffee
            );
            setCoffees(updatedCoffees);
            setNewTestimonial("");
            handleCloseTestimonialModal();
            setAlert({ message: "Testimonio creado con éxito", type: "success" });
            setTimeout(() => setAlert(null), 3000);
        } catch (error) {
            setAlert({ message: "Error al crear el testimonio", type: "error" });
            setTimeout(() => setAlert(null), 3000);
            console.error("Error:", error);
        }
    };

    return (
        <div>
            {alert && (
                <div className={`alert ${alert.type}`}>
                    {alert.message}
                </div>
            )}
            <div className="buscador">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Buscar por nombre"
                />
            </div>
            <div className="coffees-list">
                {coffees.map((coffee) => (
                    <div key={coffee.idCoffee} className="coffee-item">
                        <img src={`data:image/png;base64,${coffee.image64}`} alt={coffee.name} />
                        <h2>{coffee.name}</h2>
                        <p>{coffee.description}</p>
                        <p>Precio: ${coffee.price}</p>
                        <button onClick={() => handleShowComments(coffee)}>Ver Comentarios</button>
                        {auth.token && (
                            <button onClick={() => handleShowTestimonialModal(coffee)}>Calificar</button>
                        )}
                    </div>
                ))}
            </div>
            {modalVisible && selectedCoffee && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>
                            &times;
                        </span>
                        <h2>Comentarios para {selectedCoffee.name}</h2>
                        <ul>
                            {selectedCoffee.testimonials.map((testimonial) => (
                                <li key={testimonial.idTestimonials}>
                                    <p><strong>{testimonial.fullname}:</strong> {testimonial.testimonial}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            {testimonialModalVisible && selectedCoffee && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseTestimonialModal}>
                            &times;
                        </span>
                        <h2>Deja un Testimonio para {selectedCoffee.name}</h2>
                        <textarea
                            value={newTestimonial}
                            onChange={(e) => setNewTestimonial(e.target.value)}
                            placeholder="Escribe tu testimonio aquí..."
                        ></textarea>
                        <button onClick={handleCreateTestimonial}>Enviar Testimonio</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export { CoffeeListPage };
