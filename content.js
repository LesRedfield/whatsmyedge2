const playerTables = Array.from(document.body.getElementsByTagName( 'table' ));

console.log(playerTables);

const body = document.body;
const totalsContainer = document.createElement('div');

const betsDropdown = document.createElement('select');
const sportsDropdown = document.createElement('select');
const leaguesDropdown = document.createElement('select');
const teamsDropdown = document.createElement('select');

const betsListBody = document.createElement('tbody');
const betsListHeader = document.createElement('tr');

let bets = [];

const name = 'Casey';

  bets = fetchBets(playerTables, name);

  const sports = [];

  bets.forEach((bet) => {
      if (!sports.includes(bet.sport)) {
          sports.push(bet.sport);
      }
  });

  // const totalsContainer = document.createElement('div');
  // body.appendChild(totalsContainer);

  const container = document.createElement('div');
  container.appendChild(totalsContainer);

  // $('body').prepend(totalsContainer);

  // const sportsDropdown = document.createElement('select');
  sportsDropdown.innerHTML = `<option value="All">All Sports</option>`;

  // const leaguesDropdown = document.createElement('select');
  leaguesDropdown.innerHTML = `<option value="All">All Leagues</option>`;

  // const teamsDropdown = document.createElement('select');
  teamsDropdown.innerHTML = `<option value="All">All Teams</option>`;


  const betsList = document.createElement('table');
  // const betsListBody = document.createElement('tbody');
  // const betsListHeader = document.createElement('tr');
  betsListHeader.innerHTML = `
      <tr>
          <td id="user"></td>
          <td id="sport-header"></td>
          <td id="league-header"></td>
          <td id="team-header"></td>
          <td>Opponent</td>
          <td>Type</td>
          <td>Line</td>
          <td>Odds</td>
          <td>Risk</td>
          <td>Reward</td>
          <td>Result</td>
      </tr>
  `;
  betsListBody.appendChild(betsListHeader);
  betsList.appendChild(betsListBody);
  // body.appendChild(betsList);
  container.appendChild(betsList);
  container.classList.add('wme');

  $('body').prepend(container);

  const sportHeader = document.getElementById('sport-header');
  const leagueHeader = document.getElementById('league-header');
  const teamHeader = document.getElementById('team-header');
  sportHeader.appendChild(sportsDropdown);
  leagueHeader.appendChild(leaguesDropdown);
  teamHeader.appendChild(teamsDropdown);

  const userHeader = document.getElementById('user');
  userHeader.appendChild(betsDropdown);


  sports.forEach((sport) => {
      sportsDropdown.innerHTML += `<option value=${sport}>${sport}</option>`;
  });

  let displayBets = bets;

  sportsDropdown.addEventListener('change', handleSportChange);
  leaguesDropdown.addEventListener('change', handleLeagueChange);
  teamsDropdown.addEventListener('change', handleTeamChange);
  betsDropdown.addEventListener('change', handleBetsChange);


  dispBets(displayBets);

  wagerTable(playerTables);
