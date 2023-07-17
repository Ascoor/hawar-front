// eslint-disable-next-line no-unused-vars
import { ThemeProvider } from 'react-bootstrap';



const theme = {
    direction: 'rtl', // Set the direction to RTL
    typography: {
        fontFamily: '"Segoe UI", sans-serif', // Set your desired font family
    },
    colors: {
        primary: '#007BFF', // Set your primary color
        secondary: '#6C757D', // Set your secondary color
        // Add more custom colors as needed
    },
    // Responsive settings
    breakpoints: {
        sm: '576px', // Small devices (e.g., phones)
        md: '768px', // Medium devices (e.g., tablets)
        lg: '992px', // Large devices (e.g., laptops)
        xl: '1200px', // Extra-large devices (e.g., desktops)
    },
    containerMaxWidths: {
        sm: '540px', // Maximum container width for small devices
        md: '720px', // Maximum container width for medium devices
        lg: '960px', // Maximum container width for large devices
        xl: '1140px', // Maximum container width for extra-large devices
    },
};

export default theme;
