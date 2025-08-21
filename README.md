Photography Portfolio Website
This is the repository for my personal photography portfolio website, designed to showcase my work in a clean, modern, and engaging way. The site is built with HTML, CSS, and vanilla JavaScript, and it dynamically pulls all of my photos from my Unsplash profile.

Live Demo: https://prasun01.github.io/

✨ Features
Dynamic Unsplash Gallery: Automatically fetches and displays all photos from a specified Unsplash username.

"Load More" Functionality: Images are loaded progressively for better performance, allowing visitors to browse the entire collection without initial long load times.

Modern Masonry Layout: A "Pinterest-style" grid that elegantly displays photos of various aspect ratios.

Interactive Lightbox: Click on any photo to view it in a beautiful, full-screen overlay.

Responsive Design: Looks great on all devices, from large desktops to mobile phones.

Smooth Animations: Subtle animations and hover effects provide a polished and professional user experience.

Minimalist UI: The design is clean and focused, ensuring the photography is the main attraction.

🚀 How to Use
You can easily clone this repository and customize it to create your own photography portfolio.

Prerequisites:

An Unsplash account with some photos uploaded.

An Unsplash Developer account to get an API key. You can create one at unsplash.com/developers.

Steps:

Clone the repository:

git clone https://github.com/Prasun01/Prasun01.github.io.git

Navigate to the project directory:

cd Prasun01.github.io

Customize the index.html file:

Open index.html in a code editor.

Find the following JavaScript constants at the top of the <script> tag:

const UNSPLASH_API_KEY = 'YOUR_UNSPLASH_API_KEY';
const UNSPLASH_USERNAME = 'YOUR_UNSPLASH_USERNAME';

Replace 'YOUR_UNSPLASH_API_KEY' with your own Unsplash API Access Key.

Replace 'YOUR_UNSPLASH_USERNAME' with your Unsplash username.

Update Personal Information:

Change the name in the <div class="logo"> and <title> tags.

Update the hero section text and other descriptive content to match your style.

Deploy:

If you're using GitHub Pages, simply commit and push your changes. Your site will be live at https://<your-github-username>.github.io/.

🛠️ Technologies Used
HTML5: For the structure of the website.

CSS3: For styling, layout (including masonry), and animations.

Vanilla JavaScript: For all dynamic functionality, including the API calls and lightbox feature.

Unsplash API: To fetch photo data dynamically.

📄 License
This project is licensed under the MIT License. See the LICENSE file for details. You are free to use, modify, and distribute this project.

📬 Contact
Prasun Mishra

Instagram: @shotbyprasun

Unsplash: @prasunmishra1
