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
    fetchconsultationsall();