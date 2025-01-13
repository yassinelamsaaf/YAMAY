
document.addEventListener('DOMContentLoaded', () => {
    let patientTable2 = document.getElementById('patient-table');
    let patientId;
    patientTable2.addEventListener('click', (event) => {
        console.log("hey2");
        const row = event.target.closest('.patientEnrg');
        
        if (row) {
            const patientData = JSON.parse(row.dataset.patient);
    
            // get the clicked patient id ;
            patientId = patientData.id;
            console.log(patientId);
    
        }
    
    
    
        const rendezvousTable = document.getElementById('rendezvous-table');
        const addrendezvousForm = document.getElementById('add-rendezvous-form');
        let Searchmot ;
        
        // searchBox.addEventListener('keydown', (event) => {
        //     if (event.key === 'Enter') {  // Check if the Enter key was pressed
        //         Searchmot = searchBox.value;
        //         fetchpatients();
        //     }
        // });
        // searchBtn.addEventListener('click', () =>{
        //     Searchmot = searchBox.value;
        //     fetchpatients();
        // });
        
        // Fetch all patients and display them in the table
        async function fetchrendezvous() {
            console.log("im in dom");
            try {
                const response = await fetch(`/api/patients/rendezvous/${patientId}`);
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
                    <td>${rendezvouselmnt.date}</td>
                    <td>${rendezvouselmnt.type}</td>
                    <td class="actions">
                        <button class="update-rendezvous update-consultation" data-id="${rendezvouselmnt.id}" data-date="${rendezvouselmnt.date}" data-type="${rendezvouselmnt.type}" >Update</button>
    
                        <button class="delete-rendezvous delete-consultation" data-id="${rendezvouselmnt.id}"><i class='bx bxs-trash'></i></button>
                    </td>
                `;
    
                rendezvousTable.appendChild(row);
            });
    
            attachActionListeners(); // Attach event listeners to new buttons
        }
    
        // Add a new rendezvous using the form
        addrendezvousForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            idpatient = patientId;
            console.log(idpatient);
            // const idpatient = idpatient;
            const date = document.getElementById('rendezvous-date').value;
            console.log(date);
            const type = document.getElementById('type').value;
            console.log(type);
    
            try {
                const response = await fetch('/api/patients/rendezvous', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idpatient,date,type })
                });
    
                if (!response.ok) throw new Error('Failed to add rendezvous');
    
                addrendezvousForm.reset(); // Clear form fields
                fetchrendezvous(); // Refresh the rendezvous list recupperer la reponse post (res) qui est sous form json et l'inserer
            } catch (error) {
                console.error('Error adding rendezvous:', error);
                alert('Error adding rendezvous. Please try again.');
            }
        }, { once: true });
    
        // Delete a rendezvous from the database
        async function deleterendezvous(id) {
            try {
                const response = await fetch(`/api/patients/rendezvous/${id}`, {
                     method: 'DELETE' 
                    });
                if (!response.ok) throw new Error('Failed to delete rendezvous');
    
                fetchrendezvous(); // Refresh the patient list
            } catch (error) {
                console.error('Error deleting rendezvous:', error);
                alert('Error deleting rendezvous. Please try again.');
            }
        }
    
        // Update a patient
        async function updaterendezvous(id, date,type) {
            
            
            const updateddate = prompt('Changer date:', date);
            const updatedtype = prompt('Changer type:', type);
    
            console.log(`Updating rendezvous: id=${id}, date=${updateddate}, type=${updatedtype}`);
    
            
    
            if (!updateddate || !updatedtype ) {
                alert('date and type are required!');
                return;
            }
    
            try {
                const response = await fetch(`/api/patients/rendezvous/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ date: updateddate,type: updatedtype})
                });
    
                if (!response.ok) throw new Error('Failed to update rendezvous');
    
                fetchrendezvous(); // Refresh the rendezvous list
            } catch (error) {
                console.error('Error updating rendezvous:', error);
                alert('Error updating rendezvous. Please try again.');
            }
        }
    
        // Attach event listeners to action buttons
        function attachActionListeners() {
            document.querySelectorAll('.delete-rendezvous').forEach(button => {
                button.addEventListener('click', () => {
                    const id = button.getAttribute('data-id');
                    if (confirm('Are you sure you want to delete this rendezvous?')) {
                        deleterendezvous(id);
                    }
                });
            });
    
            document.querySelectorAll('.update-rendezvous').forEach(button => {
                button.addEventListener('click', () => {
                    const id = button.getAttribute('data-id');
                    const date = button.getAttribute('data-date');
                    const type = button.getAttribute('data-type');
                    console.log(type, date,id);
                    updaterendezvous(id, date,type);
                });
            });
        }
    
    
        // Initial load of patient data
        fetchrendezvous();
    });
    });
    