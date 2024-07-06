
const BASE_URL = 'http://localhost:8080';

export async function getUsers(token) {
    try {
        const res = await fetch(`${BASE_URL}/api/auth/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
}

export async function loginAccount(login) {
    try {
        const res = await fetch(`${BASE_URL}/api/auth/login`, {
            method: "POST",
            body: JSON.stringify(login),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        return null;
    }
}

export async function createUserAccount(user) {
    try {
        const res = await fetch(`${BASE_URL}/api/auth/create`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error creating user account:', error);
        return null;
    }
}

export async function searchCoffeeByName(name) {
    try {
        const res = await fetch(`${BASE_URL}/api/coffee/findByName?name=${name}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error searching coffee by name:', error);
        return [];
    }
}

export const createTestimonial = async (testimonialData) => {
    try {
        const response = await fetch('http://localhost:8080/api/testimonial/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${testimonialData.token}`
            },
            body: JSON.stringify(testimonialData)
        });

        if (!response.ok) {
            throw new Error('Error al crear el testimonio');
        }

        const responseText = await response.text();
        try {
            return JSON.parse(responseText); 
        } catch (error) {
            return responseText; 
        }
    } catch (error) {
        console.error('Error en createTestimonial:', error);
        throw error;
    }
};




export const getCoffees = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/api/coffee/list`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Error fetching coffees');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching coffees:', error);
        return null;
    }
}

export const createCoffee = async (formData, token) => {
    try {
        const response = await fetch(`${BASE_URL}/api/coffee/create`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error creating coffee');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating coffee:', error);
        return null;
    }
}

export const updateCoffee = async (formData, token) => {
    try {
        const response = await fetch(`${BASE_URL}/api/coffee/update`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error updating coffee');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating coffee:', error);
        return null;
    }
}

export const deleteCoffee = async (id, token) => {
    try {
        const response = await fetch(`${BASE_URL}/api/coffee/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Error deleting coffee');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting coffee:', error);
        return null;
    }
 }



export async function updateUserStatus(username, locked, disabled, token) {
    try {
        const res = await fetch(`${BASE_URL}/api/auth/updateUserStatus`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({ username, locked, disabled }),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error updating user status:', error);
        return null;
    }
}