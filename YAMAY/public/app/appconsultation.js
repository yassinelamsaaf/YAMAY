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

    // nbr de consultations : 
    async function fetchconsultationsall() {
        console.log("im in dom nbr consultation");
        try {
            const response = await fetch(`/api/patients/consultations/all`);
            if (!response.ok) throw new Error('Failed to fetch consultations');
    
            const consultations = await response.json();
            const nbrConsultations = document.querySelector('.nbr-consultations');
            nbrConsultations.textContent = consultations.length;
        } catch (error) {
            console.error('Error fetching consultations:', error);
            alert('Error fetching consultations. Please try again later.');
        }
    }


    const consultationTable = document.getElementById('consultation-table');
    const mantantTable = document.getElementById('mantant-table');
    const addConsultationForm = document.getElementById('add-consultation-form');
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
    
    // Fetch all consultations mantant s
    


    // Fetch all patients and display them in the table
    async function fetchconsultations() {
        console.log("im in dom");
        try {
            const response = await fetch(`/api/patients/consultations/${patientId}`);
            if (!response.ok) throw new Error('Failed to fetch consultations');
    
            const consultations = await response.json();
            renderConsultationsTable(consultations);
        } catch (error) {
            console.error('Error fetching consultations:', error);
            alert('Error fetching consultations. Please try again later.');
        }
    }

    // Render the consultation table
    function renderConsultationsTable(consultations) {
        console.log("rendering patient table");
        consultationTable.innerHTML = ''; // Clear the table before adding new rows
        consultations.forEach(consultation => {
            const row = document.createElement('tr');
            row.className = 'consultationsEnrg';
            row.dataset.consultation = JSON.stringify(consultation); // Store consultation data in the dataset

            row.innerHTML = `
                <td>${consultation.id}</td>
                <td>${consultation.date}</td>
                <td>${consultation.mantant} DH</td>
                <td class="actions">
                    <button class="update-consultation" data-id="${consultation.id}" data-date="${consultation.date}" data-mantant="${consultation.mantant}" >Update</button>

                    <button class="delete-consultation" data-id="${consultation.id}"><i class='bx bxs-trash'></i></button>
                </td>
            `;

            consultationTable.appendChild(row);
        });

        attachActionListeners(); // Attach event listeners to new buttons
    }

    // Add a new consultation using the form
    addConsultationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        idpatient = patientId;
        console.log(idpatient);
        // const idpatient = idpatient;
        const date = document.getElementById('consultation-date').value;
        console.log(date);
        const mantant = document.getElementById('mantant').value;
        console.log(mantant);

        try {
            const response = await fetch('/api/patients/consultations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idpatient,date,mantant })
            });

            if (!response.ok) throw new Error('Failed to add consultation');

            addConsultationForm.reset(); // Clear form fields
            fetchconsultations(); // Refresh the consultation list recupperer la reponse post (res) qui est sous form json et l'inserer
        } catch (error) {
            console.error('Error adding consultation:', error);
            alert('Error adding consultation. Please try again.');
        }
    }, { once: true });

    // Delete a consultation from the database
    async function deleteconsultation(id) {
        try {
            const response = await fetch(`/api/patients/consultations/${id}`, {
                 method: 'DELETE' 
                });
            if (!response.ok) throw new Error('Failed to delete consultation');

            fetchconsultations(); // Refresh the patient list
        } catch (error) {
            console.error('Error deleting consultation:', error);
            alert('Error deleting consultation. Please try again.');
        }
    }

    // Update a patient
    async function updateconsultation(id, date,mantant) {
        
        
        const updateddate = prompt('Changer date:', date);
        const updatedmantant = prompt('Changer mantant:', mantant);

        console.log(`Updating consultation: id=${id}, date=${updateddate}, mantant=${updatedmantant}`);

        

        if (!updateddate || !updatedmantant ) {
            alert('date and mantant are required!');
            return;
        }

        try {
            const response = await fetch(`/api/patients/consultations/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date: updateddate,mantant: updatedmantant})
            });

            if (!response.ok) throw new Error('Failed to update consultation');

            fetchconsultations(); // Refresh the consultation list
        } catch (error) {
            console.error('Error updating consultation:', error);
            alert('Error updating consultation. Please try again.');
        }
    }

    // Attach event listeners to action buttons
    function attachActionListeners() {
        document.querySelectorAll('.delete-consultation').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this consultation?')) {
                    deleteconsultation(id);
                }
            });
        });

        document.querySelectorAll('.update-consultation').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const date = button.getAttribute('data-date');
                const mantant = button.getAttribute('data-mantant');
                console.log(mantant, date,id);
                updateconsultation(id, date,mantant);
            });
        });
    }

    //mantant handling 

    async function fetchconsultationsmantanttotal() {
        console.log("im in dom");
        try {
            const response = await fetch(`/api/patients/consultations/mantant/${patientId}`);
            if (!response.ok) throw new Error('Failed to fetch les mantants');
    
            const total = await response.json();
            renderMantantTable(total);
        } catch (error) {
            console.error('Error fetching mantant:', error);
            alert('Error fetching mantants. Please try again later.');
        }
    }

    function renderMantantTable(total) {

        let payee = 0;
        console.log("rendering patient table");
        mantantTable.innerHTML = ''; // Clear the table before adding new rows
            const row = document.createElement('tr');
            row.className = 'mantantEnrg';
            row.dataset.consultation = JSON.stringify(total); // Store total data in the dataset
            console.log(total.total);
            row.innerHTML = `
                <td>${total.total} DH </td>
                <td class="actions">
                    <button class="update-consultation update-mantant" data-total="${total.total}" data-date="${payee}" >Update</button>

                    <button class="delete-consultation update-mantant" data-total="${total.total}"><i class='bx bxs-trash'></i></button>
                </td>
            `;

            mantantTable.appendChild(row);

        // attachMantantActionListeners(); // Attach event listeners to new buttons
    }

    // async function addMantant(total,payee) {
    //     e.preventDefault();
    //     idpatient = patientId;
    //     console.log(idpatient);
    //     // const idpatient = idpatient;

    //     try {
    //         const response = await fetch('/api/patients/consultations/mantant', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ idpatient,total,payee })
    //         });

    //         if (!response.ok) throw new Error('Failed to add mantant');

    //         fetchconsultationsmantanttotal(); // Refresh the mantant list recupperer la reponse post (res) qui est sous form json et l'inserer
    //     } catch (error) {
    //         console.error('Error adding mantant:', error);
    //         alert('Error adding mantant. Please try again.');
    //     }
    // };
    // Initial load of patient data
    fetchconsultations();
    fetchconsultationsmantanttotal();
});
});
