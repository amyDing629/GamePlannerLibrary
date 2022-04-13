/* examples.js */
const gamePlanner = new GamePlanner();

gamePlanner.setTableName('Example Game Event Planner');
gamePlanner.addEvent('player1', 'player2', new Date(2022, 3, 2, 5, 0, 0, 0), {'type': 'tennis', 'location': 'toronto', 'gamename': 'atp', 'duration': 4});
gamePlanner.addEvent('player3', 'player4', new Date(2022, 2, 21, 9, 0, 0, 0), {'type': 'basketball', 'location': 'toronto', 'gamename': 'nba', 'duration': 4});
gamePlanner.addEvent('player1', 'player4', new Date(2022, 3, 7, 8, 0, 0, 0), {'type': 'football', 'location': 'quebec', 'gamename': 'world-cup', 'duration': 7});
gamePlanner.addEvent('player3', 'player5', new Date(2022, 2, 20, 4, 0, 0, 0), {'type': 'basketball', 'location': 'quebec', 'gamename': 'nba', 'duration': 6});
gamePlanner.addEvent('player3', 'player2', new Date(2022, 2, 25, 9, 0, 0, 0), {'type': 'tennis', 'location': 'montreal', 'gamename': 'atp', 'duration': 4});
gamePlanner.addEvent('player6', 'player7', new Date(2022, 3, 4, 8, 0, 0, 0), {'type': 'volleyball', 'location': 'toronto', 'gamename': 'vgame', 'duration': 5});
gamePlanner.addEvent('player2', 'player1', new Date(2022, 2, 20, 4, 0, 0, 0), {'type': 'volleyball', 'location': 'toronto', 'gamename': 'vgame', 'duration': 4});
gamePlanner.addEvent('player3', 'player2', new Date(2022, 3, 5, 3, 0, 0, 0), {'type': 'tennis', 'location': 'montreal', 'gamename': 'nba', 'duration': 6});
gamePlanner.addEvent('player1', 'player9', new Date(2022, 2, 23, 3, 0, 0, 0), {'type': 'tennis', 'location': 'montreal', 'gamename': 'big-grand', 'duration': 4});
gamePlanner.addEvent('player4', 'player5', new Date(2022, 2, 27, 12, 0, 0, 0), {'type': 'basketball', 'location': 'toronto', 'gamename': 'bgame', 'duration': 6});
gamePlanner.addEvent('player4', 'player5', new Date(2022, 3, 13, 12, 0, 0, 0), {'type': 'basketball', 'location': 'toronto', 'gamename': 'bgame', 'duration': 6});

let container = document.getElementById('library-content');
let gameRenderer = new GameRenderer(gamePlanner, container);
gameRenderer.addFilterVariables(['type', 'location', 'gamename']);
gameRenderer.display();



