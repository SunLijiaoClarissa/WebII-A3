const express = require('express');
const router = express.Router();
const dbcon = require("../event_db");
const connection = dbcon.getConnection();


// Connect to db
connection.connect();

// create event
router.post("/event", (req, res) => {

    const { 
        title, 
        description, 
        start_date, 
        end_date, 
        location, 
        organizer_id, 
        category_id, 
        target, 
        current_amount, 
        status 
    } = req.body;

    console.log("post event request body",req.body)

    // Verify necessary item
    if (!title || !start_date || !end_date || !location || !organizer_id || !category_id) {
        return res.status(400).json({ error: "Missing required fields:title, start_date, end_date, location, organizer_id, category_id "});
    }

    const insertQuery = `
        INSERT INTO events (title, description, start_date, end_date, location, organizer_id, category_id, target, current_amount, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        title, 
        description || '', 
        start_date, 
        end_date, 
        location, 
        organizer_id, 
        category_id, 
        target || 0, 
        current_amount || 0, 
        status || 1
    ];

    connection.query(insertQuery, values, (err, results) => {
        if (err) {
            console.error("Error inserting event:", err);
            return res.status(500).json({ error: "Failed to insert event" });
        }

        res.status(201).json({ 
            message: "Event created successfully", 
            eventId: results.insertId 
        });
    });
});



module.exports = router;