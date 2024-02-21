const table = () => {
    const fetchData = () => {
        fetch('https://65cc5a54dd519126b83e4e51.mockapi.io/Register')
            .then(res => (res.json()))
            .then(data => {
                // Get a reference to the table body
                const tableBody = document.querySelector('#tableData tbody');
                let index = 1;
                // Loop through the data and create table rows
                data.map(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
        <td>${index}</td>
        <td>${item.fName}</td>
        <td>${item.lName}</td>
        <td>${item.email}</td>
        <td>${item.password}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editData(${item.id})" >Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteItem(${item.id})">Delete</button>
          <a class="btn btn-sm btn-info" href="details.html?id=${item.id}" target="" onclick="viewItem(${item.id})">View</a>
        </td>
        <!-- Add more table cells if needed -->
      `;
                    tableBody.appendChild(row);
                    // console.log(data)
                    index++
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    fetchData()
}



// delete, view, edit

//edit function

const editItem = (id) => {
  
    console.log('Edit ID:', id)
}
function editData(id){
    window.location.href = `edit.html?id=${id}`;
}
//---------------------------------------------------------View Data--------------------------------------------------------------------
const viewItem = (id) => {
    console.log('view ID:', id)
}
function fetchItemDetails(id) {
    // Placeholder API endpoint for demonstration
    const apiUrl = `https://65cc5a54dd519126b83e4e51.mockapi.io/Register/${id}`;

    // Fetch item details from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(list => {
            // Display item details
            document.getElementById('details').innerHTML = `
              <p class='lead fw-light'>Firstname: ${list.fName}</p>
              <p class='lead'>Lastname: ${list.lName}</p>
              <p class='lead'>Email: ${list.email}</p>
              <div class='d-flex justify-content-start'>
              <button class='btn btn-sm btn-dark' onclick='editButton()'>back</button>
              </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching item details:', error);
        });
}
function editButton(){
    window.location.href='list.html'
}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Fetch and display item details
if (id) {
    fetchItemDetails(id)
} else {
    console.error('Item ID not found in URL parameter');
}
//-------------------------------------------------------Delete data------------------------------------------------------------------
// delete function
const deleteItem = (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
        fetch(`https://65cc5a54dd519126b83e4e51.mockapi.io/Register/${id}`, {
            method: 'DELETE'
        }).then(res => {
            if (!res.ok) {
                console.log('Network response was not ok')
            }
            return res.json()
        }).then(data => {
            console.log('Item deleted:', id)
            location.reload()
        }).catch(err => {
            console.log(err)
        })
    }
    console.log('cancel delete ID:', id)

}
table()


