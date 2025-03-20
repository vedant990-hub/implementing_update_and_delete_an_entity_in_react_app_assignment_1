import { useState, useEffect } from 'react';

const UpdateItem = ({ doorId = "1" }) => {
    const [door, setDoor] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        status: ''
    });
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    console.log(formData)

    const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

    useEffect(() => {
        const fetchDoor = async () => {
            try {
                const response = await fetch(`${API_URI}/${doorId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch door');
                }
                const data = await response.json();
                setDoor(data);
                setFormData({
                    name: data.name,
                    status: data.status
                });
            } catch (err) {
                setError(err.message);
            }
        };

        fetchDoor();
    }, [doorId, API_URI]);
    console.log(formData)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URI}/${doorId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            

            if (!response.ok) {
                throw new Error('Failed to update door');
            }

            const updatedDoor = await response.json();
            setDoor(updatedDoor);
            setMessage('Door updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setError(err.message);
        }
    };
    console.log(formData)

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!door) {
        return <div>Loading...</div>;
    }

    return (
        <div className="update-form">
            <h2>Update Door</h2>
            {message && <div className="success-message">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
                <button type="submit">Update Door</button>
            </form>
            <div className="current-status">
                <h3>Current Door Status:</h3>
                <p>Name: {door.name}</p>
                <p>Status: {door.status}</p>
            </div>
        </div>
    );
};

export default UpdateItem;