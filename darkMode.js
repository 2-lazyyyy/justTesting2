


    document.addEventListener('DOMContentLoaded', () => {
        const mode = document.querySelector('.mode');
    
        // Function to toggle dark mode
        const toggleDarkMode = () => {
            const heroWrap = document.querySelector(".heroWrap");
            const navBar = document.querySelector(".navBar");
            const body = document.body;
            const isDarkMode = body.classList.toggle('darkmode');

            mode.classList.toggle('fa-sun');
            mode.classList.toggle('fa-moon');
            heroWrap.classList.toggle('darkmode');
            navBar.classList.toggle('darkmode'); 
    
            // Store mode state in localStorage
            localStorage.setItem('darkMode', isDarkMode);
        };
    
        // Add event listener to mode switch button
        mode.addEventListener('click', () => {
            toggleDarkMode();
            synchronizeMode();
        });
    
        // Function to synchronize mode across pages
        const synchronizeMode = () => {
            const isDarkMode = document.body.classList.contains('darkmode');
            localStorage.setItem('darkMode', isDarkMode);
            // Broadcast the mode change to other pages using postMessage
            window.postMessage({ type: 'modeChange', mode: isDarkMode }, '*');
        };
    
        // Function to handle mode change events from other pages
        const handleModeChange = event => {
            if (event.data && event.data.type === 'modeChange') {
                const isDarkMode = event.data.mode;
                if (isDarkMode !== document.body.classList.contains('darkmode')) {
                    toggleDarkMode();
                }
            }
        };
    
        // Add event listener to listen for mode change events from other pages
        window.addEventListener('message', handleModeChange);
    
        // Check if dark mode is stored in localStorage
        const storedDarkMode = localStorage.getItem('darkMode');
        if (storedDarkMode === 'true') {
            toggleDarkMode();
        }
    });
    