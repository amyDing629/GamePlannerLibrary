/* examples.js */
const gamePlanner = new GamePlanner();

gamePlanner.setTableName('Example Game Event Planner');
gamePlanner.addEvent('player1', 'player2', new Date(2022, 2, 20, 10, 0, 0, 0), {'type': 'tennis', 'location': 'toronto', 'gamename': 'atp'});
gamePlanner.addEvent('player3', 'player4', new Date(2022, 2, 21, 12, 0, 0, 0), {'type': 'basketball', 'location': 'toronto', 'gamename': 'nba'});
gamePlanner.addEvent('player1', 'player4', new Date(2022, 2, 15, 10, 0, 0, 0), {'type': 'football', 'location': 'quebec', 'gamename': 'world-cup'});
gamePlanner.addEvent('player3', 'player5', new Date(2022, 3, 22, 12, 0, 0, 0), {'type': 'basketball', 'location': 'quebec', 'gamename': 'nba'});
gamePlanner.addEvent('player3', 'player2', new Date(2022, 2, 25, 10, 0, 0, 0), {'type': 'tennis', 'location': 'montreal', 'gamename': 'atp'});
gamePlanner.addEvent('player6', 'player7', new Date(2022, 2, 18, 12, 0, 0, 0), {'type': 'volleyball', 'location': 'toronto', 'gamename': 'vgame'});
gamePlanner.addEvent('player2', 'player1', new Date(2022, 2, 20, 10, 0, 0, 0), {'type': 'volleyball', 'location': 'toronto', 'gamename': 'vgame'});
gamePlanner.addEvent('player3', 'player2', new Date(2022, 2, 21, 12, 0, 0, 0), {'type': 'tennis', 'location': 'montreal', 'gamename': 'nba'});
gamePlanner.addEvent('player1', 'player9', new Date(2022, 2, 23, 10, 0, 0, 0), {'type': 'tennis', 'location': 'montreal', 'gamename': 'big-grand'});
gamePlanner.addEvent('player4', 'player5', new Date(2022, 2, 27, 12, 0, 0, 0), {'type': 'basketball', 'location': 'toronto', 'gamename': 'bgame'});

let container = document.getElementById('library-content');
let gameRenderer = new GameRenderer(gamePlanner, container);
gameRenderer.addFilterVariables(['type', 'location', 'gamename']);
gameRenderer.display();



