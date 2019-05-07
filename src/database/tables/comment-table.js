'use strict'

const database = require('../database')
const SQL = require('pg-template-tag').default

const createTable = () => database.query(`
    CREATE TABLE IF NOT EXISTS
        comments
        (
            id SERIAL PRIMARY KEY,
            content TEXT NOT NULL,
            user_id INTEGER NOT NULL,
            post_id INTEGER NOT NULL
        )

`)

const createRows = (data) => database.query(SQL` 
    INSERT INTO
        comments
        (
            post_id,
            content,
            user_id
        )
    VALUES
        (
            ${data.post_id},
            ${data.content},
            ${data.user_id}
        );
`);

const getRows = () => database.query(`
    SELECT
        post_id,
        content,
        user_id 
    FROM
        comments;
`);

const getRow = id => database.query(SQL`
    SELECT
        title,
        content,
        user_id
    FROM
        comments
    WHERE
        id = ${id};
`);

const updateRow = (id, data) => database.query(SQL`
    UPDATE
        comments
    SET
        user_id = ${data.user_id},
        content = ${data.content},
        post_id = ${data.post_id}
    WHERE
        id = ${id}
        RETURNING *;
`);

const deleteRow = id => database.query(SQL`
  DELETE FROM
    comments
  WHERE
    id = ${id};
`);

module.exports = {
    createTable,
    createRows,
    getRows,
    getRow,
    updateRow,
    deleteRow
};
