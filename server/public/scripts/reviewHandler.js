document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('review-form');
    const reviewsContainer = document.querySelector('.reviews-container');

    if (reviewForm) {
        reviewForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const restaurantId = reviewForm.dataset.restaurantId;
            
            const formData = {
                rating: parseInt(reviewForm.rating.value),
                content: reviewForm.content.value,
                restaurant_id: restaurantId
            };

            try {
                const response = await fetch('/api/reviews', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    // Reload the page to show the new review
                    window.location.reload();
                } else {
                    console.error('Failed to submit review');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    // Handle review deletion
    reviewsContainer?.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-review')) {
            const reviewCard = e.target.closest('.review-card');
            const reviewId = reviewCard.dataset.reviewId;

            try {
                const response = await fetch(`/api/reviews/${reviewId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    reviewCard.remove();
                    // If no reviews left, show the "no reviews" message
                    if (!reviewsContainer.querySelector('.review-card')) {
                        reviewsContainer.innerHTML = '<p class="no-reviews">No reviews yet. Be the first to review!</p>';
                    }
                } else {
                    console.error('Failed to delete review');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });
});