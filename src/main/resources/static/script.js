document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:8080/posts')
        .then(response => response.json())
        .then(data => {
            console.log('Success: ', data.result);
            const dataList = document.getElementById('dataList');
            data.result.forEach(item => {
                const listItem = createDataItem(item);
                dataList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error('Error: ', error);
            const dataList = document.getElementById('dataList');
            if(dataList) {
                dataList.remove();
            }
        }
    );
});

document.getElementById('upload-btn').addEventListener('click', function() {
    const title = document.getElementById('input-title').value;
    const content = document.getElementById('input-content').value;

    fetch('http://localhost:8080/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title, content
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success: ', data);
    })
    .catch((error) => {
        console.error('Error: ', error);
    });
});

function createDataItem(data) {
    const item = document.createElement('div');
    item.className = 'data-item';
    item.id = 'data-item'
    item.textTitle = data.title;
    item.textContent = data.content;

    return item;
}

const modal = document.getElementById("modal-dim");

const btn = document.getElementById("data-item");

const span = document.getElementsByClassName("close")[0];

btn.onclick.addEventListener('click', function() {
  modal.style.display = "block";
});

span.onclick.addEventListener('click', function() {
  modal.style.display = "none";
});

window.addEventListener('click', function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

