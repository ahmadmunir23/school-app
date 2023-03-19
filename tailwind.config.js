/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.{html,ejs,js,css}', './views/**/**/*.ejs'],
  theme: {
    extend: {
      backgroundImage: {
        smkn4:
          "linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)), url('https://lh3.googleusercontent.com/p/AF1QipPOmwtOGSlJKckT6BQ7zWFiTM77NU18FQ64eU6y=s680-w680-h510')",
        school:
          "linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGNvbGxlZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=1400&q=60')",
      },
    },
  },
  plugins: [],
};
