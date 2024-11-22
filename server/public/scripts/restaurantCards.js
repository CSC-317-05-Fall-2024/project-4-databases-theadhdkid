console.log('restaurantCards.js loading...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('restaurantCards.js: DOM Content Loaded');
    
    // Add click handler to the container using event delegation
    document.getElementById('restaurant-list').addEventListener('click', async function(e) {
        if (e.target.classList.contains('delete-btn')) {
            console.log('Delete button clicked');
            const button = e.target;
            const restaurantId = button.getAttribute('data-id');
            console.log('Restaurant ID:', restaurantId);

            try {
                console.log('Sending DELETE request for ID:', restaurantId);
                const response = await fetch(`/api/restaurants/${restaurantId}`, {
                    method: 'DELETE'
                });

                console.log('Response status:', response.status);

                if (response.ok) {
                    console.log('Delete successful, reloading page...');
                    window.location.reload();
                } else {
                    const errorData = await response.json();
                    console.error('Failed to delete restaurant:', errorData);
                }
            } catch (error) {
                console.error('Error during delete:', error);
            }
        }
    });

    // Log initial state
    console.log('Total delete buttons found:', document.querySelectorAll('.delete-btn').length);
    document.querySelectorAll('.delete-btn').forEach(btn => {
        console.log('Button ID:', btn.getAttribute('data-id'));
    });
});