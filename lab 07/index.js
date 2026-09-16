const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// This array stores cafe data in memory. It resets when the server restarts.
const cafes = [
    {
        id: 1,
        name: 'Brew & Bean',
        location: 'Bangalore',
        category: 'Coffee & Bakery',
        rating: 4.7,
        priceRange: '₹₹',
        openingHours: '8:00 AM - 10:00 PM',
        image: 'https://placehold.co/600x400/6f4e37/ffffff?text=Brew+%26+Bean',
        description: 'A cozy cafe serving freshly brewed coffee and bakery items.',
        popularItems: ['Cappuccino', 'Croissant', 'Cold Coffee']
    },
    {
        id: 2,
        name: 'The Coffee House',
        location: 'Mumbai',
        category: 'Specialty Coffee',
        rating: 4.5,
        priceRange: '₹₹₹',
        openingHours: '7:00 AM - 11:00 PM',
        image: 'https://placehold.co/600x400/8b5e3c/ffffff?text=The+Coffee+House',
        description: 'A lively neighbourhood cafe known for carefully sourced beans and friendly service.',
        popularItems: ['Espresso', 'Affogato', 'Tiramisu']
    },
    {
        id: 3,
        name: 'Urban Mug',
        location: 'Delhi',
        category: 'Cafe & Brunch',
        rating: 4.3,
        priceRange: '₹₹',
        openingHours: '9:00 AM - 9:30 PM',
        image: 'https://placehold.co/600x400/9a6b45/ffffff?text=Urban+Mug',
        description: 'A bright urban cafe with filling brunch plates, fresh juices, and comfortable work tables.',
        popularItems: ['Avocado Toast', 'Iced Latte', 'Pancakes']
    },
    {
        id: 4,
        name: 'Cafe Mocha',
        location: 'Pune',
        category: 'Coffee & Desserts',
        rating: 4.6,
        priceRange: '₹₹₹',
        openingHours: '10:00 AM - 10:00 PM',
        image: 'https://placehold.co/600x400/5a3e2b/ffffff?text=Cafe+Mocha',
        description: 'A warm dessert cafe pairing rich chocolate drinks with freshly prepared sweet treats.',
        popularItems: ['Mocha', 'Brownie Sundae', 'Cheesecake']
    },
    {
        id: 5,
        name: 'Bean Theory',
        location: 'Hyderabad',
        category: 'Artisan Coffee',
        rating: 4.8,
        priceRange: '₹₹₹',
        openingHours: '8:30 AM - 10:30 PM',
        image: 'https://placehold.co/600x400/795548/ffffff?text=Bean+Theory',
        description: 'An artisan coffee bar where every cup highlights the flavour of its carefully selected beans.',
        popularItems: ['Pour Over', 'Flat White', 'Coffee Cake']
    },
    {
        id: 6,
        name: 'The Daily Grind',
        location: 'Chennai',
        category: 'All-Day Cafe',
        rating: 4.4,
        priceRange: '₹₹',
        openingHours: '6:30 AM - 9:00 PM',
        image: 'https://placehold.co/600x400/a47148/ffffff?text=The+Daily+Grind',
        description: 'An easygoing all-day cafe for early morning coffee, quick lunches, and relaxed evenings.',
        popularItems: ['Filter Coffee', 'Grilled Sandwich', 'Muffin']
    },
    {
        id: 7,
        name: 'Latte Lounge',
        location: 'Kolkata',
        category: 'Coffee & Snacks',
        rating: 4.2,
        priceRange: '₹₹',
        openingHours: '9:00 AM - 10:00 PM',
        image: 'https://placehold.co/600x400/936639/ffffff?text=Latte+Lounge',
        description: 'A relaxed lounge with comfortable seating, creative lattes, and snacks for sharing.',
        popularItems: ['Caramel Latte', 'Garlic Bread', 'Chai Latte']
    },
    {
        id: 8,
        name: 'The Green Cup',
        location: 'Goa',
        category: 'Healthy Cafe',
        rating: 4.7,
        priceRange: '₹₹₹',
        openingHours: '7:30 AM - 8:30 PM',
        image: 'https://placehold.co/600x400/52796f/ffffff?text=The+Green+Cup',
        description: 'A fresh and calm cafe offering healthy bowls, smoothies, and responsibly sourced coffee.',
        popularItems: ['Green Smoothie', 'Acai Bowl', 'Cold Brew']
    }
];

// Configure EJS views, form parsing, and static CSS files.
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Home page displays the first four cafes as featured cafes.
app.get('/', (req, res) => {
    res.render('home', {
        cafes: cafes.slice(0, 4)
    });
});

// All cafes page receives the full array from Express.
app.get('/cafes', (req, res) => {
    res.render('cafes', {
        cafes: cafes
    });
});

// Details page uses the URL parameter, for example /cafe/1.
app.get('/cafe/:id', (req, res) => {
    const cafeId = parseInt(req.params.id);
    const cafe = cafes.find((currentCafe) => currentCafe.id === cafeId);

    if (!cafe) {
        return res.status(404).render('cafe', { cafe: null });
    }

    res.render('cafe', { cafe: cafe });
});

// Show the form for adding a new cafe.
app.get('/add-cafe', (req, res) => {
    res.render('add-cafe');
});

// Receive form fields through req.body and add a cafe to the array.
app.post('/add-cafe', (req, res) => {
    const newCafe = {
        id: cafes.length ? Math.max(...cafes.map((cafe) => cafe.id)) + 1 : 1,
        name: req.body.name,
        location: req.body.location,
        category: req.body.category,
        rating: parseFloat(req.body.rating),
        priceRange: req.body.priceRange,
        openingHours: req.body.openingHours,
        image: req.body.image || 'https://placehold.co/600x400/6f4e37/ffffff?text=New+Cafe',
        description: req.body.description,
        popularItems: ['House Special', 'Fresh Coffee', 'Daily Treat']
    };

    cafes.push(newCafe);
    res.redirect('/cafes');
});

// Profile values are passed from Express to the profile EJS template.
app.get('/profile', (req, res) => {
    res.render('profile', {
        username: 'Rahul',
        email: 'rahul@example.com',
        favoriteCafe: 'Brew & Bean',
        favoriteCategory: 'Coffee',
        cafesVisited: 18
    });
});

app.listen(port, () => {
    console.log(`Cafe Hub running on port ${port}`);
});
