const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Optional: For cross-origin resource sharing
const path = require('path');

const app = express();
const PORT = 3000;

// Database Connection
const pool = new Pool({
    user: 'postgres',        // Replace with your PostgreSQL username
    host: 'localhost',       // Host where PostgreSQL is running
    database: 'YAMAY', // Replace with your database name
    password: 'yassine124800', // Replace with your PostgreSQL password
    port: 5432,              // Default PostgreSQL port
});

// Middleware
app.use(cors());                      // Optional: Enables CORS for frontend-backend communication
app.use(express.json());              // Parse incoming JSON requests
app.use(express.static(path.join(__dirname, 'public'))); // Serve frontend files from the "public" folder

// Routes


//TABLE PATIENTS//


// Get all patients
app.get('/api/patients', async (req, res) => {
    try {
        const result = await pool.query("SELECT id, nom, prenom, cin, TO_CHAR(ddn, 'MM-DD-YYYY') AS ddn, fh, ntel, email FROM public.patients;");
        res.json(result.rows); 
        console.log(result.rows)
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ error: 'Error fetching patients' });
    }
});

// Add a new patient
app.post('/api/patients', async (req, res) => {
    const { nom,prenom,cin,email,ddn,fh,ntel } = req.body;

    if (!nom || !prenom || !cin ) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO public.patients(nom, prenom, cin, email, ddn, fh, ntel) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [nom,prenom,cin,email,ddn,fh,ntel]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding patient:', error);
        res.status(500).json({ error: 'Error adding patient' });
    }
});

// Update a patient
app.put('/api/patients/:id', async (req, res) => {
    const { id } = req.params;
    const { nom,prenom,cin,email,ddn,fh,ntel } = req.body;

    if (!nom || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    try {
        const result = await pool.query(
            'UPDATE patients SET nom = $1, prenom = $2, cin = $3, email = $4, ddn = $5, FH = $6, ntel=$7 WHERE id = $8 RETURNING *',
            [nom,prenom,cin,email,ddn,fh,ntel, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'patient not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating patient:', error);
        res.status(500).json({ error: 'Error updating patient' });
    }
});

// Delete a patient
app.delete('/api/patients/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM patients WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'patient not found' });
        }

        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error deleting patient:', error);
        res.status(500).json({ error: 'Error deleting patient' });
    }
});

// Catch-all for invalid routes
app.use((req, res) => {
    res.status(404).send('Endpoint not found');
});

//TABLE PATIENTS//



//TABLE CONSULTATION
//TABLE CONSULTATION

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});






