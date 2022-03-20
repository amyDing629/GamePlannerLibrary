/* examples.js */
const gamePlanner = new GamePlanner();
gamePlanner.setTableName('Example Game Event Planner');
gamePlanner.addEvent('player1', 'player2', new Date(2022, 2, 21, 10, 0, 0, 0), {});
gamePlanner.addEvent('player3', 'player4', new Date(2022, 2, 21, 12, 0, 0, 0), {});
let container = document.getElementById('library-content');
let gameRenderer = new GameRenderer(gamePlanner, container);
gameRenderer.display();



