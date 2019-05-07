'use strict'

const database = require('../database')
const SQL = require('pg-template-tag').default

const createTable = () => database.query(`
    CREATE TABLE IF NOT EXISTS
        posts
        (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            content TEXT NOT NULL
        )

`)

const createRows = (data) => database.query(SQL` 
    INSERT INTO
        posts
        (
            title,
            content,
            user_id
        )
    VALUES
        (
            ${data.Title},
            ${data.Content},
            ${data.userId}
        );
`);

const getRows = () => database.query(`
    SELECT
        title,
        content,
        user_id 
    FROM
        posts;
`);

const getRow = id => database.query(SQL`
    SELECT
        title,
        content,
        user_id
    FROM
        posts
    WHERE
        id = ${id};
`);

const updateRow = (id, data) => database.query(SQL`
    UPDATE
        posts
    SET
        title = ${data.Title},
        content = ${data.Content}
    WHERE
        id = ${id}
        RETURNING *;
`);

const deleteRow = id => database.query(SQL`
  DELETE FROM
    posts
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
