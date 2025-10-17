const express = require('express');
const router = express.Router();
const dbcon = require("../event_db");
const connection = dbcon.getConnection();

// Connect to db
connection.connect();

router.get("/events", (req, res) => {
    connection.query("SELECT * FROM events", (err, results) => {
        if (err) {
            console.log("Error when retriving the data");
        }
        else {
            res.json(results);
        }
    });
});

//get description & relate regist
router.get("/events/:id", (req, res) => {
    const eventId = req.params.id;

    const eventQuery = `
        SELECT 
            e.*,
            o.name AS organizer_name,
            o.email AS organizer_email,
            c.name AS category_name
        FROM  events e
        LEFT JOIN organizations o ON e.organizer_id = o.id
        LEFT JOIN categories c ON e.category_id = c.id
        WHERE e.id = ?
    `;

    //relate registration
    const registrationsQuery = `
            SELECT *
            FROM registrations
            WHERE event_id = ?
            ORDER BY registration_date DESC
        `;

    connection.query(eventQuery, eventId, (err, eventResults) => {
        if (err) {
            console.log("event data error", err);
        }
        else {
            const event = eventResults[0];

            connection.query(registrationsQuery, eventId, (err, registrationResults) => {
                if (err) {
                    console.error("registration data error", err);
                }

                event.registrations = registrationResults;
                res.json(event);
            });
        }
    });

});

//search event
router.get("/search", (req, res) => {
    const { dateFrom, dateTo, location, categoryId } = req.query;

    let query = `
        SELECT e.*, o.name AS organizer_name, c.name AS category_name
        FROM events e
        LEFT JOIN organizations o ON e.organizer_id = o.id
        LEFT JOIN categories c ON e.category_id = c.id
        WHERE e.status = 1
    `;

    const params = [];

    if (dateFrom) {
        query += ` AND e.start_date >= ?`;
        params.push(dateFrom);
    }
    if (dateTo) {
        query += ` AND e.end_date <= ?`;
        params.push(dateTo);
    }
    if (location) {
        query += ` AND e.location LIKE ?`;
        params.push(`%${location}%`);
    }
    if (categoryId) {
        query += ` AND e.category_id = ?`;
        params.push(categoryId);
    }

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error("Search error:", err);
            return res.status(500).send("Search failed");
        }
        res.json(results);
    });
});


router.get("/categories", (req, res) => {
    connection.query("SELECT * FROM categories", (err, results) => {
        if (err) {
            console.log("Error when retriving the data");
        }
        else {
            res.json(results);
        }
    });
});


//get registration by event id
router.get("/regist/:id", (req, res) => {
    const eventId = req.params.id;

    connection.query(`
        SELECT * 
        FROM registrations
        WHERE event_id =?
        `,
        eventId, (err, results) => {
            if (err) {
                console.log("Error when retriving the data");
            }
            else {
                res.json(results);
            }
        });
});


// create new regist
router.post('/registrations', async (req, res) => {

    const {
        event_id,
        user_name,
        user_email,
        contact_number,
        registration_date,
        ticket_quantity
    } = req.body;

    // Check data 
    if (!event_id || !user_name || !user_email || !ticket_quantity) {
        return res.status(400).json({
            error: "Missing required fields:",
            msg: { event_id, user_name, user_email, ticket_quantity }
        });
    }

    const insertQuery = `
      INSERT INTO registrations 
      (event_id, user_name, user_email, contact_number, registration_date, ticket_quantity) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const currentDate = registration_date || new Date().toISOString().split('T')[0];


    connection.query(insertQuery, [event_id, user_name, user_email, contact_number, currentDate, ticket_quantity], (err, results) => {

        if (err) {
            console.error("Error inserting event:", err);
            return res.status(500).json({ error: "Failed to insert regist" });
        }


        res.status(201).json({
            message: 'Registration created successfully',
            registration_id: results.insertId,
        });


    });


});

module.exports = router;