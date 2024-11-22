document.addEventListener('DOMContentLoaded', function() {
    // Create header
    const header = document.createElement('header');
    header.innerHTML = '<h1>Bangkok Travel Guide</h1>';
    document.body.prepend(header);

    // Create nav
    const nav = document.createElement('nav');
    nav.innerHTML = `
        <ul class="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/attractions">Attractions</a></li>
            <li><a href="/restaurants">Restaurants</a></li>
            <li><a href="/new-restaurant">New Restaurant</a></li> <!-- Added New Restaurant link -->
        </ul>
    `;
    header.after(nav);

    // Create footer
    const footer = document.createElement('footer');
    footer.innerHTML = '<p>© 2024 Travel Guide by Anzara Ausaf</p>';
    document.body.append(footer);
});
