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

//get description
router.get("/events/:id", (req, res) => {
    const eventId = req.params.id;

    // 查询活动基本信息
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
    connection.query(eventQuery, eventId, (err, results) => {
        if (err) {
            console.log("Error when retriving the data");
        }
        else {
            res.json(results[0]);
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

// 创建新事件
router.post("/events", (req, res) => {
    const { 
        name, 
        description, 
        start_date, 
        end_date, 
        location, 
        organizer_id, 
        category_id, 
        goal_amount, 
        current_amount, 
        status 
    } = req.body;

    // Verify item
    if (!name || !start_date || !end_date || !location || !organizer_id || !category_id) {
        return res.status(400).json({ error: "Missing required items. Please Check! " });
    }

    const insertQuery = `
        INSERT INTO events (name, description, start_date, end_date, location, organizer_id, category_id, goal_amount, current_amount, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        name, 
        description || '', 
        start_date, 
        end_date, 
        location, 
        organizer_id, 
        category_id, 
        goal_amount || 0, 
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