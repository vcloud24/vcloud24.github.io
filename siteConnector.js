fetch('https://vcloud.github.io/pull')
    .then(response => response.json())
    .then(data => {
        document.body.innerHTML += `<div>${data.content}</div>`;
    })
    .catch(error => console.error('Error fetching data:', error));
