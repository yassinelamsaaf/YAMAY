
document.addEventListener('DOMContentLoaded', () => {
    
    
    
        const rendezvousTable = document.getElementById('rendezvous-table');
        async function fetchrendezvous() {
            console.log("im in dom");
            try {
                const response = await fetch(`/api/patients/rendezvous/all`);
                if (!response.ok) throw new Error('Failed to fetch rendezvous');
        
                const rendezvous = await response.json();
                renderrendezvousTable(rendezvous);
            } catch (error) {
                console.error('Error fetching rendezvous:', error);
                alert('Error fetching rendezvous. Please try again later.');
            }
        }
    
        // Render the rendezvous table
        function renderrendezvousTable(rendezvous) {
            console.log("rendering rendezvous table");
            rendezvousTable.innerHTML = ''; // Clear the table before adding new rows
            rendezvous.forEach(rendezvouselmnt => {
                const row = document.createElement('tr');
                row.className = 'rendezvousEnrg';
                row.dataset.rendezvouselmnt = JSON.stringify(rendezvouselmnt); // Store rendezvous data in the dataset
    
                row.innerHTML = `
                    <td>${rendezvouselmnt.id}</td>
                    <td>${rendezvouselmnt.idpatient}</td>
                    <td>${rendezvouselmnt.date}</td>
                    <td>${rendezvouselmnt.type}</td>
                `;
    
                rendezvousTable.appendChild(row);
            });
    
        }
        // Initial load of patient data
        fetchrendezvous();

});
    