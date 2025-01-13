let clientForm = document.querySelector(".clientInfo");
let consultationForm = document.querySelector(".consultationInfo");
let rendezvousForm = document.querySelector(".rendezvousInfo");


let patientDetail = document.querySelector(".patient-detail");

let patientTable = document.getElementById('patient-table');
let consultationTable = document.getElementById('consultation-table');

let  addBtn = document.querySelector(".bxs-user-plus");
let addConsultationBtn = document.querySelector(".plus");
let addrendezvousBtn = document.querySelector(".plus1");
let closeBtn = document.querySelector(".close1");
let closeBtn1 = document.querySelector(".close2");
let closeBtn2 = document.querySelector(".close3");
let closeBtn3 = document.querySelector(".close4");



let patientEnrg = document.querySelector(".patientEnrg");
let consultationEnrg = document.querySelector(".consultationEnrg");


let submitBtn = document.querySelector(".submitBtn");
const patient = document.querySelector(".patientEnrg");

const addPatientForm = document.getElementById('add-patient-form');
const addConsultationForm = document.getElementById("add-consultation-form");




patientTable.addEventListener('click', (event) => {
    console.log("hey");
    const row = event.target.closest('.patientEnrg');
    if (row) {
        const patientData = JSON.parse(row.dataset.patient);

        // Populate the form with patient details
        document.getElementById('patient-nom').innerHTML = `${patientData.nom}`
        document.getElementById('patient-prenom').innerHTML = `${patientData.prenom}`
        document.getElementById('patient-cin').innerHTML = `${patientData.cin}`
        document.getElementById('patient-ddn').innerHTML = `${patientData.ddn}`
        document.getElementById('patient-ntel').innerHTML = `${patientData.ntel}`

        // Show the patient detail popup
        patientDetail.style.visibility = 'visible';
    }
});

// consultationTable.addEventListener('click', (event) => {
//     console.log("hey");
//     const row = event.target.closest('.consultationEnrg');
//     if (row) {
//         const consultationData = JSON.parse(row.dataset.consultation);

//         // Populate the form with patient details
//         document.getElementById('consultation-date').value = consultationData.date;
//         document.getElementById('mantant').value = consultationData.mantant;

//         // Show the patient detail popup
        
//     }
//     consultationForm.style.visibility = 'visible';
// });
addBtn.addEventListener("click", () =>{
    clientForm.style.visibility = "visible";
});

closeBtn.addEventListener("click", () => {
    clientForm.style.visibility = "hidden";
    addPatientForm.reset();

});





closeBtn1.addEventListener("click", () => {
    patientDetail.style.visibility = "hidden";

});

closeBtn2.addEventListener("click", () => {
    consultationForm.style.visibility = "hidden";
    addConsultationForm.reset();

});

closeBtn3.addEventListener("click", () => {
    rendezvousForm.style.visibility = "hidden";

});

addConsultationBtn.addEventListener("click", () =>{
    consultationForm.style.visibility = "visible";
});

addrendezvousBtn.addEventListener("click", () =>{
    rendezvousForm.style.visibility = "visible";
});

submitBtn.addEventListener("click", () => {
    clientForm.style.visibility = "hidden";
})