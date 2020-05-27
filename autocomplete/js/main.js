const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const searchStates = async searchText => {

    if (searchText.length == 0 || searchText == "" || searchText == undefined) {
        matchList.innerHTML = '';
    } else {
        const response = await fetch('data/state_capitals.json');
        const states = await response.json();

        let matches = states.filter(state => {
            const regex = new RegExp(`^${searchText}`, 'gi');
            return state.name.match(regex) || state.abbr.match(regex);
        });

        outputHTML(matches);
    }
};

const outputHTML = matches => {
    const html = matches.reduce((str, match) => str += `
        <div class="card card-body mb-1">
            <h4> ${match.name} (${match.abbr}) <span class="text-primary"> ${match.capital}</span>
            </h4>
            <smal> Lat: ${match.lat} / Long: ${match.long} </small>
        </div>
    `, "");

    matchList.innerHTML = html;
}

search.addEventListener('input', () => searchStates(search.value));