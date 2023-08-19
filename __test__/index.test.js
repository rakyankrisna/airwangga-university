const request = require("supertest");
const app = require("../index"); // Ganti dengan path yang sesuai ke berkas index.js Anda

describe("Test API routes", () => {
  it("should respond with welcome message", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Welcome to Airwangga University!");
  });

  it("should find a mahasiswa", async () => {
    const response = await request(app).get("/findMahasiswa?nim=123");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should not find a mahasiswa with invalid nim", async () => {
    const response = await request(app).get("/findMahasiswa?nim=nonexistent");
    expect(response.status).toBe(404);
  });

  it("should find a dosen", async () => {
    const response = await request(app).get("/findDosen?nip=123");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should not find a dosen with invalid nip", async () => {
    const response = await request(app).get("/findDosen?nip=nonexistent");
    expect(response.status).toBe(404);
  });

  // ... tambahkan pengujian lain sesuai kebutuhan Anda
});
