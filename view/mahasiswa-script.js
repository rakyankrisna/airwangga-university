const dataTable = document.getElementById("data-table").querySelector("tbody");
const noDataMessage = document.getElementById("no-data");

async function fetchData() {
  try {
    const response = await fetch("http://localhost:9000/mahasiswa");
    const data = await response.json();
    renderTable(data.payload.datas);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function fetchDataByNim() {
  const nim = document.getElementById("nimSearch").value;
  if (!nim) {
    alert("Silahkan masukkan NIM");
    return;
  }

  try {
    const response = await fetch(`http://localhost:9000/mahasiswa/${nim}`);
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
                            <td>${item.nim}</td>
                            <td>${item.nama_lengkap}</td>
                            <td>${item.alamat}</td>
                            <td>${item.program_studi}</td>
                            <td>${item.fakultas}</td>
                            <td>${item.semester}</td>
                            <td style="valign: center;">
                              <button onclick="editData(${item.nim})">
                                <img src="https://cdn-icons-png.flaticon.com/512/3429/3429924.png" alt="Settings" style="width:  20px; height: 20px;" />
                                <p style="color: white;">Settings</p>
                              </button>
                            </td>
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
    fetchDataByNim();
  }
}

function editData(nim) {
  // Retrieve the updated data from the user (e.g., through a form)
  const nama_lengkap = document.getElementById("nama_lengkap").value;
  const alamat = document.getElementById("alamat").value;
  const program_studi = document.getElementById("program_studi").value;
  const fakultas = document.getElementById("fakultas").value;
  const semester = document.getElementById("semester").value;

  // Create the request body with the updated data
  const data = {
    nim,
    nama_lengkap,
    alamat,
    program_studi,
    fakultas,
    semester,
  };

  // Send the PUT request to the server endpoint
  fetch("/mahasiswa", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.isSuccess) {
        // Handle the successful response
        console.log("Put atau Edit to Mahasiswa Successfully");
      } else {
        // Handle the response when the user is not found
        console.log("User not Found");
      }
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error("Error:", error);
    });
}
