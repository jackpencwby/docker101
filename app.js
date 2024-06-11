const express = require("express");
const app = express();
const mysql = require("mysql2/promise");

const port = 8000;

let connection = null;

async function connectToMySQL() {
    connection = await mysql.createConnection({
        host: 'db',
        user: 'root',
        password: 'root',
        database: 'docker101'
    });
}

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/product", async (req, res) => {
    try {
        const [products] = await connection.query("SELECT * FROM product");
        res.send(products);
    }
    catch (err) {
        console.log(err);
    }
})

app.listen(port, async () => {
    try {
        await connectToMySQL();
        console.log(`Listening at http://localhost:${port}`);
    }
    catch (err) {
        console.log(err);
    }
});