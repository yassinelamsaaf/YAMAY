# YAMAY: Patient Management System

## Project Overview
YAMAY is a prototype application designed for managing patient records, consultations, and appointments in a healthcare setting. The system allows users to perform CRUD (Create, Read, Update, Delete) operations on patients, consultations, and appointments, providing a streamlined workflow for medical professionals.

---

## Features
1. **Patient Management:** Add, view, update, and delete patient records.
2. **Consultation Tracking:** Record, update, and track patient consultations and fees.
3. **Appointment Scheduling:** Manage appointments and view schedules.
4. **Search Functionality:** Quickly locate patients using a search bar.
5. **Authentication:** User registration and login with JWT-based authentication.
6. **Extendable Architecture:** Built as a prototype, additional features can be easily added.

---

## Tools and Technologies
1. **Backend:**
   - Node.js
   - Express.js
   - PostgreSQL
   - Docker (for containerization)
2. **Frontend:**
   - HTML
   - CSS
   - JavaScript
3. **Other Tools:**
   - Postman (API testing)
   - dotenv (Environment variable management)
   - bcrypt (Password hashing)
   - jsonwebtoken (JWT authentication)

---

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- Node.js
- PostgreSQL
- (Optional) Docker

### Installation Steps
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd YAMAY
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   Create a `.env` file in the root directory and include:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=yassine124800
   DB_NAME=YAMAY
   PORT=3000
   SECRET_KEY=262ggsdsh2436342rygryrwyw
   ```

4. Initialize the database:
   - Run the database schema script located in `DB/yamayBD.sql`.
   ```bash
   psql -U postgres -d YAMAY -f DB/yamayBD.sql
   ```

5. Start the application:

   **If you have Docker:**
   ```bash
   docker-compose up
   ```

   **If you do not have Docker:**
   ```bash
   npm install
   npx nodemon server.js
   ```

6. Access the application:
   - Backend: [http://localhost:3000](http://localhost:3000)
   - Frontend: Served from the `public` folder.

---

## API Endpoints

### Patients
- **GET /api/patients**: Retrieve all patients.
- **POST /api/patients**: Add a new patient.
- **PUT /api/patients/:id**: Update a patient.
- **DELETE /api/patients/:id**: Delete a patient.

### Consultations
- **GET /api/patients/consultations/all**: Retrieve all consultations.
- **POST /api/patients/consultations**: Add a new consultation.
- **PUT /api/patients/consultations/:id**: Update a consultation.
- **DELETE /api/patients/consultations/:id**: Delete a consultation.

### Appointments
- **GET /api/patients/rendezvous/all**: Retrieve all appointments.
- **POST /api/patients/rendezvous**: Add a new appointment.
- **PUT /api/patients/rendezvous/:id**: Update an appointment.
- **DELETE /api/patients/rendezvous/:id**: Delete an appointment.

---

## Demonstration

### Images
- **Home Page**: Overview of patient data.
![Screenshot 2025-01-14 180333](https://github.com/user-attachments/assets/206c3a47-5dcc-4be3-9d00-8de0ffe1c93d)  
- **Add Patient**: Form for adding new patients.
![Screenshot 2025-01-14 180452](https://github.com/user-attachments/assets/52dc6cc5-3aaa-4406-9d4e-9ceae906237f)
- **Manage Consultations**: View and edit consultation records.
![Screenshot 2025-01-14 180624](https://github.com/user-attachments/assets/152205ce-9b63-4747-b256-e74f13e00589)
![Screenshot 2025-01-14 180714](https://github.com/user-attachments/assets/bbdc2cf2-87ef-44bf-b6a0-24762d7c54b7)


### Video Link
[Demo Video](#)

---

## Contributions
Contributions are welcome! Please fork the repository and submit a pull request.

---
