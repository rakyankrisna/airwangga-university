const dataTable = document.getElementById("data-table").querySelector("tbody");
const noDataMessage = document.getElementById("no-data");

async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/dosen");
    const data = await response.json();
    renderTable(data.payload.datas);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function fetchDataByNip() {
  const nip = document.getElementById("nipSearch").value;
  if (!nip) {
    alert("Silahkan masukkan NIP");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/dosen/${nip}`);
    const data = await response.json();
    renderTable(data.payload.datas);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function renderTable(data) {
  dataTable.innerHTML = "";
  if (data && data.length > 0) {
    data.forEach((item) => {
      dataTable.innerHTML += `
                        <tr>
                            <td>${item.nip}</td>
                            <td>${item.nama_lengkap}</td>
                            <td>${item.alamat}</td>
                            <td>${item.program_studi}</td>
                            <td>${item.fakultas}</td>
                            <td>${item.gaji}</td>
                        </tr>
                    `;
    });
    noDataMessage.style.display = "none";
  } else {
    noDataMessage.style.display = "block";
  }
}

function handleKeyUp(event) {
  if (event.keyCode === 13) {
    fetchDataByNip();
  }
}
