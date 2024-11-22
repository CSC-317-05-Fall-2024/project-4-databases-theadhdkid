const handleSubmit = async (event) => {
    event.preventDefault(); 
    
    // Get the form data
    const formData = {
        name: event.target.name.value,
        address: event.target.address.value,
        phone: event.target.phone.value,
        photo: event.target.photo.value || '/images/default-restaurant.jpg'
    };

    try {
        const response = await fetch('/api/restaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Redirect to restaurants page after successful creation
            window.location.href = '/restaurants';
        } else {
            console.error('Failed to create restaurant');
            alert('Failed to create restaurant. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('new-restaurant-form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
});