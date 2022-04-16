/* examples.js */
const gamePlanner = new GamePlanner();

gamePlanner.setTableName('Example Game Event Planner');
gamePlanner.addEvent('player1', 'player2', new Date(2022, 3, 16, 5, 0, 0, 0), {'type': 'tennis', 'location': 'toronto', 'gamename': 'atp', 'duration': 3, 'result': {'win': 'player1', 'detail': 'player1 wins 1,3,5 round'}, 'detail': 'Player1 and player2 are both really excellent tennis players, this match is a strong-strong fight'});
gamePlanner.addEvent('player1', 'player4', new Date(2022, 3, 16, 14, 0, 0, 0), {'type': 'football', 'location': 'quebec', 'gamename': 'world-cup', 'duration': 5});
gamePlanner.addEvent('player3', 'player4', new Date(2022, 3, 16, 9, 0, 0, 0), {'type': 'basketball', 'location': 'toronto', 'gamename': 'nba', 'duration': 4});
gamePlanner.addEvent('player3', 'player5', new Date(2022, 3, 16, 22, 0, 0, 0), {'type': 'basketball', 'location': 'quebec', 'gamename': 'nba', 'duration': 2});
gamePlanner.addEvent('player3', 'player2', new Date(2022, 3, 25, 9, 0, 0, 0), {'type': 'tennis', 'location': 'montreal', 'gamename': 'atp', 'duration': 4});
gamePlanner.addEvent('player6', 'player7', new Date(2022, 4, 4, 8, 0, 0, 0), {'type': 'volleyball', 'location': 'toronto', 'gamename': 'vgame', 'duration': 5});
gamePlanner.addEvent('player2', 'player1', new Date(2022, 3, 20, 4, 0, 0, 0), {'type': 'volleyball', 'location': 'toronto', 'gamename': 'vgame', 'duration': 4});
gamePlanner.addEvent('player3', 'player2', new Date(2022, 3, 5, 3, 0, 0, 0), {'type': 'tennis', 'location': 'montreal', 'gamename': 'nba', 'duration': 6});
gamePlanner.addEvent('player1', 'player9', new Date(2022, 3, 23, 3, 0, 0, 0), {'type': 'tennis', 'location': 'montreal', 'gamename': 'big-grand', 'duration': 4});
gamePlanner.addEvent('player4', 'player5', new Date(2022, 3, 27, 12, 0, 0, 0), {'type': 'basketball', 'location': 'toronto', 'gamename': 'bgame', 'duration': 6});
gamePlanner.addEvent('player4', 'player5', new Date(2022, 4, 13, 12, 0, 0, 0), {'type': 'basketball', 'location': 'toronto', 'gamename': 'bgame', 'duration': 6});
gamePlanner.addEvent('player4', 'player5', new Date(2022, 4, 13, 12, 0, 0, 0), {'type': 'basketball', 'location': 'toronto', 'gamename': 'bgame', 'duration': 6});
let container = document.getElementById('library-content');
let gameRenderer = new GameRenderer(gamePlanner, container);
gameRenderer.addFilterVariables(['type', 'location', 'gamename']);
gameRenderer.display();



