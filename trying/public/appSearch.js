// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const patientTable = document.getElementById('patient-table');
    const addPatientForm = document.getElementById('add-patient-form');
    const searchBox = document.getElementById('search-box');
    const searchBtn = document.querySelector('.search-btn');
    let Searchmot ;


    searchBtn.addEventListener('click', () =>{
        Searchmot = searchBox.value;
        fetchpatients();
    });
    
    // Fetch all patients and display them in the table
    async function fetchpatients() {
        try {
            const response = await fetch(`/api/patients/search/${Searchmot}`);
            if (!response.ok) throw new Error('Failed to fetch patients');
    
            const patients = await response.json();
            renderpatientTable(patients);
        } catch (error) {
            console.error('Error fetching patients:', error);
            alert('Error fetching patients. Please try again later.');
        }
    }

    // Render the patient table
    function renderpatientTable(patients) {
        patientTable.innerHTML = ''; // Clear the table before adding new rows
        patients.forEach(patient => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${patient.id}</td>
                <td>${patient.nom}</td>
                <td>${patient.prenom}</td>
                <td>${patient.cin}</td>
                <td>${patient.email}</td>
                <td>${patient.ddn}</td>
                <td>${patient.fh}</td>
                <td>${patient.ntel}</td>
                <td class="actions">
                    <button class="update" data-id="${patient.id}" data-nom="${patient.nom}" data-prenom="${patient.prenom}" data-cin="${patient.cin}" data-email="${patient.email}" data-ddn="${patient.ddn}" data-fh="${patient.fh}" data-ntel="${patient.ntel}">Update</button>
                    <button class="delete" data-id="${patient.id}"><i class='bx bxs-user-x' ></i></button>
                </td>
            `;

            patientTable.appendChild(row);
        });

        attachActionListeners(); // Attach event listeners to new buttons
    }

    // Add a new patient using the form
    addPatientForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;
        const cin = document.getElementById('cin').value;
        const email = document.getElementById('email').value;
        const ddn = document.getElementById('ddn').value;
        const fh = document.getElementById('fh').value;
        const ntel = document.getElementById('ntel').value;

        try {
            const response = await fetch('/api/patients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nom,prenom,cin,email,ddn,fh,ntel })
            });

            if (!response.ok) throw new Error('Failed to add patient');

            addPatientForm.reset(); // Clear form fields
            fetchpatients(); // Refresh the patient list recupperer la reponse post (res) qui est sous form json et l'inserer
        } catch (error) {
            console.error('Error adding patient:', error);
            alert('Error adding patient. Please try again.');
        }
    });

    // Delete a patient
    async function deletepatient(id) {
        try {
            const response = await fetch(`/api/patients/${id}`, {
                 method: 'DELETE' 
                });
            if (!response.ok) throw new Error('Failed to delete patient');

            fetchpatients(); // Refresh the patient list
        } catch (error) {
            console.error('Error deleting patient:', error);
            alert('Error deleting patient. Please try again.');
        }
    }

    // Update a patient
    async function updatepatient(id, nom,prenom,cin,email,ddn,fh,ntel) {
        
        const updatedNom = prompt('Changer nom:', nom);
        const updatedPrenom = prompt('Changer prenom:', prenom);
        const updatedCin = prompt('Changer cin:', cin);
        const updatedEmail = prompt('Changer email:', email);
        const updatedDdn = prompt('Changer date de naissance:', ddn);
        const updatedFh = prompt('Changer sexe:', fh);
        const updatedNtel = prompt('Changer numero de telephone:', ntel);

        

        if (!updatedNom || !updatedPrenom || !updatedCin) {
            alert('Name and Email et Cin are required!');
            return;
        }

        try {
            const response = await fetch(`/api/patients/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nom: updatedNom,prenom: updatedPrenom, cin:updatedCin, email:updatedEmail, ddn:updatedDdn, fh:updatedFh, ntel:updatedNtel})
            });

            if (!response.ok) throw new Error('Failed to update patient');

            fetchpatients(); // Refresh the patient list
        } catch (error) {
            console.error('Error updating patient:', error);
            alert('Error updating patient. Please try again.');
        }
    }

    // Attach event listeners to action buttons
    function attachActionListeners() {
        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this patient?')) {
                    deletepatient(id);
                }
            });
        });

        document.querySelectorAll('.update').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const nom = button.getAttribute('data-nom');
                const prenom = button.getAttribute('data-prenom');
                const cin = button.getAttribute('data-cin');
                const email = button.getAttribute('data-email');
                const ddn = button.getAttribute('data-ddn');
                const fh = button.getAttribute('data-fh');
                const ntel = button.getAttribute('data-ntel');
                updatepatient(id, nom,prenom,cin,email,ddn,fh,ntel);
            });
        });
    }


    // Initial load of patient data
});
