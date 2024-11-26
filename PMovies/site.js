// Evento de scroll da página
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50)
        navbar.classList.add('scrolled')
    else
        navbar.classList.remove('scrolled');
})


const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmNlMzA4MDA5MTM4YzExYmQ1ZWMxNTA4NmY2ODQ4MyIsIm5iZiI6MTczMjA0MTEyNy43OTMzNzI2LCJzdWIiOiI2MGMwMGYzMDViMTI0MDAwN2E3NDdiMjQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7oBmC6vtiAsSMV6Jz0D4Jt_SMiYd8LrnRF39BCVUnSg'
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    await banner();
});

async function banner() {
    let trendings = [];
    await fetch('https://api.themoviedb.org/3/trending/movie/week?language=pt-br', options)
        .then(res => res.json())
        .then(res => res.results.forEach(movie => {
            trendings.push(movie)
        }))
        .catch(err => console.error(err));

    let carousel = document.querySelector('.carousel-inner');
    carousel.innerHTML = '';
    for (let i = 0; i < trendings.length; i++) {
        let active = i == 0 ? 'active' : '';
        carousel.innerHTML += 
            `<div class="carousel-item ${active}">
                <img src="https://image.tmdb.org/t/p/original/${trendings[i].backdrop_path}" class="d-block w-100" alt="">
                <div class="carousel-caption d-none d-md-block">
                    <h3>${trendings[i].title}</h3>
                    <p>${trendings[i].overview}</p>
                </div>
            </div>`;
    }
}