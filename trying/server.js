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


//__________________TABLE PATIENTS______________________//


// Get all patients
app.get('/api/patients', async (req, res) => {
    try {
        const result = await pool.query("SELECT id, nom, prenom, cin, TO_CHAR(ddn, 'MM-DD-YYYY') AS ddn, fh, ntel, email FROM public.patients;");
        res.json(result.rows); 
        // console.log(result.rows)
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ error: 'Error fetching patients' });
    }
});

//Search patients by name
app.get('/api/patients/search/:searchBoxValue', async (req, res) => {
    const { searchBoxValue } = req.params; // Extract the search term

    try {
        const result = await pool.query(
            `
            SELECT 
                id, 
                nom, 
                prenom, 
                cin, 
                TO_CHAR(ddn, 'MM-DD-YYYY') AS ddn, 
                fh, 
                ntel, 
                email 
            FROM public.patients
            WHERE 
                nom ILIKE $1 
                OR prenom ILIKE $1 
                OR cin ILIKE $1 
                OR CAST(id AS TEXT) = $2
        `, [`%${searchBoxValue}%`, searchBoxValue]);

        res.json(result.rows); // Send the search results as the response
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
        const result = await pool.query("DELETE FROM patients WHERE id = $1;", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'patient not found' });
        }

        const countresults = await pool.query("SELECT count(*) AS count FROM patients;");
        const count = parseInt(countresults.rows[0].count,10);

        if (count === 0) {
            // All patients deleted, reset the sequence
            await pool.query('ALTER SEQUENCE "PATIENT_id_seq" RESTART WITH 1;');
        }

        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error deleting patient:', error);
        res.status(500).json({ error: 'Error deleting patient' });
    }
});


//__________________TABLE PATIENTS______________________//


//__________________TABLE CONSULTATION__________________//

// Get all consultations
app.get('/api/patients/consultations/:patientId', async (req, res) => {
    const { patientId } = req.params; // Extract the patient ID
    try {
        const result = await pool.query(`SELECT id,TO_CHAR(date, 'MM-DD-YYYY') AS date, mantant FROM public.consultations WHERE idpatient = $1 ;`,[patientId]);
        res.json(result.rows); 
        // console.log(result.rows)
    } catch (error) {
        console.error('Error fetching consultations:', error);
        res.status(500).json({ error: 'Error fetching consultations' });
    }
});



// Add a new consultation
app.post('/api/patients/consultations', async (req, res) => {
    const {idpatient,date,mantant } = req.body;

    if (!date || !mantant  ) {
        return res.status(400).json({ error: 'missing required fields' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO public.consultations(idpatient,date,mantant) VALUES ($1, $2, $3) RETURNING *',
            [idpatient,date,mantant]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding consultation:', error);
        res.status(500).json({ error: 'Error adding consultation' });
    }
});

// Update a patient
app.put('/api/patients/consultations/:id', async (req, res) => {
    const { id } = req.params;
    const { date,mantant } = req.body;

    if (!date || !mantant) {
        return res.status(400).json({ error: 'date et mantant are required' });
    }

    try {
        const result = await pool.query(
            'UPDATE public.consultations SET  date = $1, mantant = $2 WHERE id = $3 RETURNING *',
            [date,mantant,id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'consultation not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating consultation:', error);
        res.status(500).json({ error: 'Error updating consultation' });
    }
});

// Delete a consultation from the database
app.delete('/api/patients/consultations/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("DELETE FROM consultations WHERE id = $1;", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'consultation not found' });
        }

        const countresults = await pool.query("SELECT count(*) AS count FROM consultations;");
        const count = parseInt(countresults.rows[0].count,10);

        if (count === 0) {
            // All patients deleted, reset the sequence
            await pool.query('ALTER SEQUENCE public.consultation_id_seq RESTART WITH 1;');
        }

        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error deleting patient:', error);
        res.status(500).json({ error: 'Error deleting patient' });
    }
});





//__________________TABLE CONSULTATION__________________//


//__________________TABLE RENDEZ-VOUS__________________//



// Get all rendezvous
app.get('/api/patients/rendezvous/all', async (req, res) => {
    try {
        const result = await pool.query(`SELECT id,idpatient,TO_CHAR(date, 'MM-DD-YYYY') AS date, type FROM public.rendezvous`);
        res.json(result.rows); 
        // console.log(result.rows)
    } catch (error) {
        console.error('Error fetching rendezvous:', error);
        res.status(500).json({ error: 'Error fetching rendezvous' });
    }
});

app.get('/api/patients/rendezvous/:patientId', async (req, res) => {
    const { patientId } = req.params; // Extract the patient ID
    try {
        const result = await pool.query(`SELECT id,TO_CHAR(date, 'MM-DD-YYYY') AS date, type FROM public.rendezvous WHERE idpatient = $1 ;`,[patientId]);
        res.json(result.rows); 
        // console.log(result.rows)
    } catch (error) {
        console.error('Error fetching rendezvous:', error);
        res.status(500).json({ error: 'Error fetching rendezvous' });
    }
});



// Add a new consultation
app.post('/api/patients/rendezvous', async (req, res) => {
    const {idpatient,date,type } = req.body;

    if (!date || !type  ) {
        return res.status(400).json({ error: 'missing required fields' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO public.rendezvous(idpatient,date,type) VALUES ($1, $2, $3) RETURNING *',
            [idpatient,date,type]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding rendezvous:', error);
        res.status(500).json({ error: 'Error adding rendezvous' });
    }
});

// Update a patient
app.put('/api/patients/rendezvous/:id', async (req, res) => {
    const { id } = req.params;
    const { date,type } = req.body;

    if (!date || !type) {
        return res.status(400).json({ error: 'date et type are required' });
    }

    try {
        const result = await pool.query(
            'UPDATE public.rendezvous SET  date = $1, type = $2 WHERE id = $3 RETURNING *',
            [date,type,id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Rendezvous not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating rendezvous:', error);
        res.status(500).json({ error: 'Error updating rendezvous' });
    }
});

// Delete a consultation from the database
app.delete('/api/patients/rendezvous/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("DELETE FROM rendezvous WHERE id = $1;", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'rendezvous not found' });
        }

        const countresults = await pool.query("SELECT count(*) AS count FROM rendezvous;");
        const count = parseInt(countresults.rows[0].count,10);

        if (count === 0) {
            // All patients deleted, reset the sequence
            await pool.query('ALTER SEQUENCE public.rendezvous_id_seq RESTART WITH 1;');
        }

        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error deleting rendezvous:', error);
        res.status(500).json({ error: 'Error deleting rendezvous' });
    }
});





//__________________TABLE RENDEZ-VOUS__________________//


// Catch-all for invalid routes
app.use((req, res) => {
    res.status(404).send('Endpoint not found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});






