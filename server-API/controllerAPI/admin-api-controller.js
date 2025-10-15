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

    console.log("post event request body", req.body)

    // Check data integrity
    if (!title || !start_date || !end_date || !location || !organizer_id || !category_id) {
        return res.status(400).json({
            error: "Missing required fields:",
            msg: { title, start_date, end_date, location, organizer_id, category_id }
        });
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

    console.log("update, id"+eventId + "\n",  req.body);

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

    // const updateParams = [];
    // const fields = [];

    // if (title !== undefined) fields.push("title = ?") && updateParams.push(title);
    // if (description !== undefined) fields.push("description = ?") && updateParams.push(description);
    // if (start_date !== undefined) fields.push("start_date = ?") && updateParams.push(start_date);
    // if (end_date !== undefined) fields.push("end_date = ?") && updateParams.push(end_date);
    // if (location !== undefined) fields.push("location = ?") && updateParams.push(location);
    // if (organizer_id !== undefined) fields.push("organizer_id = ?") && updateParams.push(organizer_id);
    // if (category_id !== undefined) fields.push("category_id = ?") && updateParams.push(category_id);
    // if (target !== undefined) fields.push("target = ?") && updateParams.push(target);
    // if (current_amount !== undefined) fields.push("current_amount = ?") && updateParams.push(current_amount);
    // if (status !== undefined) fields.push("status = ?") && updateParams.push(status);
    // updateQuery += fields.join(", ");
    // updateQuery += " WHERE id = ?";
    // updateParams.push(eventId);

    connection.query(updateQuery, values, (err, results) => {
        if (err) {
            console.error("Error updating event:", err);
            return res.status(500).json({ error: "Failed to update event" });
        }

        res.json({ message: "Event updated successfully" });
    });

});




module.exports = router;