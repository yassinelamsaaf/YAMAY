let clientForm = document.querySelector(".clientInfo");
let  addBtn = document.querySelector(".bxs-user-plus");
let closeBtn = document.querySelector(".close");
let submitBtn = document.querySelector(".submitBtn");
const addPatientForm = document.getElementById('add-patient-form');

addBtn.addEventListener("click", () =>{
    clientForm.style.visibility = "visible";
});

closeBtn.addEventListener("click", () => {
    clientForm.style.visibility = "hidden";
    addPatientForm.reset();

});

submitBtn.addEventListener("click", () => {
    clientForm.style.visibility = "hidden";
})

