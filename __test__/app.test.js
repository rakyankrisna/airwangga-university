const request = require("supertest"); // Import the 'request' object from supertest
const app = require("../app"); // Replace with the correct path to your Express app file

describe("Testing Express API Endpoints", () => {
  it("should return a welcome message on the root endpoint", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("This is homepage!");
  });

  it("should get a specific Mahasiswa by NIM", async () => {
    const nim = "123";
    const response = await request(app).get(`/mahasiswa/${nim}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); // Assuming you expect an array of results
  });

  it("should create a new Mahasiswa", async () => {
    const newMahasiswa = {
      nim: "000",
      nama_lengkap: "John Doe",
      alamat: "123 Main St",
      program_studi: "Computer Science",
      fakultas: "Engineering",
      semester: 2,
    };
    const response = await request(app).post("/mahasiswa").send(newMahasiswa);
    expect(response.status).toBe(200);
    expect(response.body.isSuccess).toBe(1); // Assuming you expect a success indicator
  });

  it("should update an existing Mahasiswa", async () => {
    const updatedMahasiswa = {
      nim: "000",
      nama_lengkap: "Updated Name",
      alamat: "Updated Address",
      program_studi: "Updated Program Studi",
      fakultas: "Updated Fakultas",
      semester: 7,
    };
    const response = await request(app)
      .put("/mahasiswa")
      .send(updatedMahasiswa);
    expect(response.status).toBe(200);
    expect(response.body.isSuccess).toBe(1);
  });

  it("should delete a Mahasiswa", async () => {
    const nimToDelete = "000";
    const response = await request(app)
      .delete("/mahasiswa")
      .send({ nim: nimToDelete });
    expect(response.status).toBe(200);
    expect(response.body.isDeleted).toBe(1);
  });

  // Add more test cases for other endpoints as needed
});
