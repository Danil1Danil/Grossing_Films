document.addEventListener("DOMContentLoaded", function () {
    let films = [];
    let sortedAscending = true;

    fetch("films.json")
        .then(response => response.json())
        .then(data => {
            films = data;
            displayFilms(films);
        })
        .catch(error => console.error("Ошибка загрузки", error));

    function displayFilms(films) {
        const tableBody = document.getElementById("films-table");
        tableBody.innerHTML = "";
        films.forEach(film => {
            const row = `<tr>
                <td>${film.ID}</td>
                <td>${film.Year}</td>
                <td>${film.Film_name}</td>
                <td>${film.Director}</td>
                <td>${film.Countries}</td>
                <td>${film.Gross}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }

    document.getElementById("search").addEventListener("input", function () {
        const query = this.value.toLowerCase();
        const filteredFilms = films.filter(film => film.Film_name.toLowerCase().includes(query));
        displayFilms(filteredFilms);
    });

    document.getElementById("sort").addEventListener("click", function () {
        films.sort((a, b) => sortedAscending ? a.Year - b.Year : b.Year - a.Year);
        sortedAscending = !sortedAscending;
        displayFilms(films);
    });
});