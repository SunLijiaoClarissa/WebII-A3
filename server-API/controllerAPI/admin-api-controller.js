const express = require('express');
const router = express.Router();
const dbcon = require("../event_db");
const connection = dbcon.getConnection();


// Connect to db
connection.connect();

// get all events
router.get("/events", (req, res) => {
    connection.query(`
        SELECT 
            e.*,
            o.name AS organizer_name,
            o.email AS organizer_email,
            c.name AS category_name
        FROM  events e
        LEFT JOIN organizations o ON e.organizer_id = o.id
        LEFT JOIN categories c ON e.category_id = c.id
        
        ` , (err, results) => {
        if (err) {
            console.log("Error when retriving the data");
        }
        else {
            res.json(results);
        }
    });
});

//get event by id
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

router.get("/organizations", (req, res) => {
    connection.query("SELECT * FROM organizations", (err, results) => {
        if (err) {
            console.log("Error when retriving the data");
        }
        else {
            res.json(results);
        }
    });
});

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
        ticket_price,
        target,
        current_amount,
        status
    } = req.body;

    console.log("create event", req.body)

    // Check data integrity
    if (!title || !start_date || !end_date || !location || !organizer_id || !category_id) {
        return res.status(400).json({
            error: "Missing required fields:",
            msg: { title, start_date, end_date, location, organizer_id, category_id }
        });
    }

    const insertQuery = `
        INSERT INTO events (title, description, start_date, end_date, location, organizer_id, category_id, ticket_price, target, current_amount, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        title,
        description || '',
        start_date,
        end_date,
        location,
        organizer_id,
        category_id,
        ticket_price,
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


// update event by event id
router.put("/event/:id", (req, res) => {
    const eventId = req.params.id;
    const {
        title,
        description,
        start_date,
        end_date,
        location,
        organizer_id,
        category_id,
        ticket_price,
        target,
        current_amount,
        status
    } = req.body;

    console.log("update, id" + eventId + "\n", req.body);

    // Check data integrity
    if (!title || !start_date || !end_date || !location || !organizer_id || !category_id) {
        return res.status(400).json({
            error: "Missing required fields:",
            msg: { title, start_date, end_date, location, organizer_id, category_id }
        });
    }

    const updateQuery = `
        UPDATE events 
        SET title = ?, 
            description = ?, 
            start_date = ?, 
            end_date = ?, 
            location = ?, 
            organizer_id = ?, 
            category_id = ?, 
            ticket_price = ?,
            target = ?, 
            current_amount = ?, 
            status = ?
        WHERE id = ?
        `;

    const values = [
        title,
        description,
        start_date,
        end_date,
        location,
        organizer_id,
        category_id,
        ticket_price,
        target,
        current_amount,
        status,
        eventId
    ];

    connection.query(updateQuery, values, (err, results) => {
        if (err) {
            console.error("Error updating event:", err);
            return res.status(500).json({ error: "Failed to update event" });
        }

        res.json({ message: "Event updated successfully" });
    });


});


//delete event by event id
router.delete("/event/:id", (req, res) => {
    const eventId = req.params.id;

    const checkRegistrationsQuery = "SELECT COUNT(*) as count FROM registrations WHERE event_id = ?";
    connection.query(checkRegistrationsQuery, eventId, (err, results) => {
        if (err) {
            console.error("Error checking registrations:", err);
            return res.status(500).json({ error: "Database error" });
        }

        const registrationCount = results[0].count;

        if (registrationCount > 0) {
            return res.status(500).json({ error: "Cannot delete event because it has registrations" });
        }

        const deleteQuery = "DELETE FROM events WHERE id = ?";
        connection.query(deleteQuery, eventId, (err, results) => {
            if (err) {
                console.error("Error deleting event:", err);
                return res.status(500).json({ error: "Failed to delete event" });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: "Event not found" });
            }

            res.json({ message: "Event deleted successfully" });
        });
    });
});




module.exports = router;