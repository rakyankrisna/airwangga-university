const express = require("express");
const app = express();
const path = require("path");
const port = 9000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");
const dt = require("./dateTime");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const currentTime = dt.myDateTime();
  const data = `Welcome to Airwangga University! Current time is ${currentTime}`;
  response(200, data, "This is homepage!", res);
});

app.get("/html", (req, res) => {
  // Use path.join to construct the correct file path
  const indexPath = path.join(__dirname, "view", "index.html");

  // Send the HTML file as a response
  res.sendFile(indexPath, (err) => {
    if (err) {
      // Handle any errors that may occur
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });
});

app.get("/findMahasiswa", (req, res) => {
  const sql = `SELECT * FROM mahasiswa WHERE nim = ${req.query.nim}`;
  db.query(sql, (error, result) => {
    response(200, result, "Find mahasiswa name", res);
  });
});

app.get("/findDosen", (req, res) => {
  const sql = `SELECT * FROM dosen WHERE nip = ${req.query.nip}`;
  db.query;
  db.query(sql, (error, result) => {
    response(200, result, "Find dosen name", res);
  });
});

app.get("/date", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("The date and time are currently: " + dt.myDateTime());
  res.end();
});

app.get("/mahasiswa", (req, res) => {
  db.query("SELECT * FROM mahasiswa", (error, result) => {
    //hasil
    if (error) throw error;
    response(200, result, "GET all data from mahasiswa", res);
  });
});

app.get("/dosen", (req, res) => {
  db.query("SELECT * FROM dosen", (error, result) => {
    //hasil
    if (error) throw err;
    response(200, result, "GET all data from dosen", res);
  });
});

app.get("/mahasiswa/:nim", (req, res) => {
  const nim = req.params.nim;
  const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`;
  db.query(sql, (error, result) => {
    if (result.length > 0) {
      response(200, result, "GET data mahasiswa by NIM", res);
    } else {
      response(
        404,
        "Not Found",
        `Data Mahasiswa with NIM = ${nim} not found`,
        res
      );
    }
  });
});

app.get("/dosen/:nip", (req, res) => {
  const nip = req.params.nip;
  const sql = `SELECT * FROM dosen WHERE nip = ${nip}`;
  db.query(sql, (error, result) => {
    response(200, result, "GET data dosen by NIP", res);
  });
});

app.get("/accounts", (req, res) => {
  response(200, "This is account data", "This is your account page!", res);
});

app.get("/contents", (req, res) => {
  console.log({ urlParam: req.query });
  response(200, "Content Data", "This is your content page!", res);
});

app.post("/mahasiswa", (req, res) => {
  const { nim, nama_lengkap, alamat, program_studi, fakultas, semester } =
    req.body;
  console.log(req.body);
  const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, alamat, program_studi, fakultas, semester) VALUES (${nim}, '${nama_lengkap}', '${alamat}', '${program_studi}', '${fakultas}', ${semester})`;
  db.query(sql, (error, result) => {
    if (error) response(500, "Invalid", "error", res);
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
      };
      response(200, data, "Post new data to mahasiswa", res);
    } else {
      response(500, "Data can't inputed", "Error message", res);
    }
  });
});

app.post("/dosen", (req, res) => {
  const { nip, nama_lengkap, alamat, program_studi, fakultas, gaji } = req.body;
  console.log(req.body);
  const sql = `INSERT INTO dosen (nip, nama_lengkap, alamat, program_studi, fakultas, gaji) VALUES (${nip}, '${nama_lengkap}', '${alamat}', '${program_studi}', '${fakultas}', ${gaji})`;
  db.query(sql, (error, result) => {
    if (error) response(500, "Invalid", "error", res);
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
      };
      response(200, data, "Post new data to dosen", res);
    } else {
      response(500, "Data can't inputed", "Error message", res);
    }
  });
});

app.post("/login", (req, res) => {
  console.log({ requestFromOutside: req.body });
  response(200, "Data Login", "Login berhasil!", res);
});

app.put("/username", (req, res) => {
  console.log({ updateData: req.body });
  response(200, "This is update username", "Update berhasil!", res);
});

app.put("/mahasiswa", (req, res) => {
  const { nim, nama_lengkap, alamat, program_studi, fakultas, semester } =
    req.body;
  const sql = `UPDATE mahasiswa SET nama_lengkap = '${nama_lengkap}',alamat = '${alamat}',program_studi = '${program_studi}',fakultas = '${fakultas}',semester = ${semester} WHERE nim = ${nim}`;
  db.query(sql, (error, result) => {
    if (error) response(500, "Invalid", "error", res);
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        message: result.message,
      };
      response(200, data, "Put atau Edit to Mahasiswa Successfully", res);
    } else {
      response(404, "User not Found", "error", res);
    }
  });
});

app.put("/dosen", (req, res) => {
  const { nip, nama_lengkap, alamat, program_studi, fakultas, gaji } = req.body;
  const sql = `UPDATE dosen SET nama_lengkap = '${nama_lengkap}',alamat = '${alamat}',program_studi = '${program_studi}',fakultas = '${fakultas}',gaji = ${gaji} WHERE nip = ${nip}`;
  db.query(sql, (error, result) => {
    if (error) response(500, "Invalid", "error", res);
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        message: result.message,
      };
      response(200, data, "Put atau Edit to Dosen Successfully", res);
    } else {
      response(404, "User not Found", "error", res);
    }
  });
});

app.delete("/mahasiswa", (req, res) => {
  const { nim, nama_lengkap, alamat, program_studi, fakultas, semester } =
    req.body;
  const sql = `DELETE FROM mahasiswa WHERE nim = ${nim}`;
  db.query(sql, (error, result) => {
    if (error) response(500, "Invalid", "error", res);
    console.log(result);
    if (result?.affectedRows) {
      const data = {
        isDeleted: result.affectedRows,
        message: result.message,
      };
      response(200, data, "Delete Mahasiswa Successfully", res);
    } else {
      response(404, "User not Found", "error", res);
    }
  });
});

app.delete("/dosen", (req, res) => {
  const { nip, nama_lengkap, alamat, program_studi, fakultas, gaji } = req.body;
  const sql = `DELETE FROM dosen WHERE nip = ${nip}`;
  db.query(sql, (error, result) => {
    if (error) response(500, "Invalid", "error", res);
    console.log(result);
    if (result?.affectedRows) {
      const data = {
        isDeleted: result.affectedRows,
        message: result.message,
      };
      response(200, data, "Delete Dosen Successfully", res);
    } else {
      response(404, "User not Found", "error", res);
    }
  });
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});

module.exports = app;
