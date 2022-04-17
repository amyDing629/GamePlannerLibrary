/* examples.js
 * This js file is used for the examples.html page. 
 * It shows how developers could use the library through api calls.
 */


/* GamePlanner object is reponsible for managing data loading to the library.*/
const gamePlanner = new GamePlanner();
/* GamePlanner.setTableName(tableName): tableName is the title you want to set for the event planner table. The table name set will be shown at the top of the table. */
gamePlanner.setTableName('Example Game Event Planner');
/* GamePlanner.addEvent(player1, player2, startTime, options): add an event to the library;
Parameters:
    player1 (str): one player of the game
    player2 (str): another player of the game
    startTime (Date): the event's start time
    options (dict): a dictionary that involves optional parameters
        duration (int): duration of the event, default = 3
        type (str): the type of the event. Eg. tennis
        location (str): the location of the event.
        result (dict):  a dictionary that includes event result information, includes who wins and more details
            win (str): the player that wins the event
            detail (str): more details about the event result. Eg. detailed scores
        gamename (str): game name of the event. Eg. NBA
        color (str): should be format '#xxxxxx', which decides the color of this event block to be displayed. Default = '#E0FFFF'
        detail (str): some additional information about this event. Eg. who holds this event, what is the more attracting point.   
*/
/* GamePlanner.getEventList(): get all events in the library */
gamePlanner.addEvent('player1', 'player2', new Date(2022, 3, 16, 5, 0, 0, 0), {});
console.log('The event is added to the library. Current event in library: ', gamePlanner.getEventList());
/* GamePlanner.removeEvent(eventID): remove event from library based on eventID (eventID will be auto-generated during creation)*/
gamePlanner.removeEvent(gamePlanner.getEventList()[0].eventID);
console.log('The event has been removed. Current event in library: ', gamePlanner.getEventList());

// Add more events
gamePlanner.addEvent('player1', 'player2', new Date(2022, 3, 16, 5, 0, 0, 0), {'type': 'tennis', 'location': 'toronto', 'gamename': 'atp', 'duration': 3, 'result': {'win': 'player1', 'detail': 'player1 wins 1,3,5 round'}, 'detail': 'Player1 and player2 are both really excellent tennis players, this match is a strong-strong fight'});
gamePlanner.addEvent('player1', 'player3', new Date(2022, 3, 16, 14, 0, 0, 0), {'type': 'football', 'location': 'quebec', 'gamename': 'world-cup', 'duration': 5, 'result': {'win': 'player1', 'detail': 'Score is 3-0'}, 'detail': 'Most popular worldwide football event'});
gamePlanner.addEvent('player2', 'player3', new Date(2022, 3, 16, 9, 0, 0, 0), {'type': 'basketball', 'location': 'toronto', 'gamename': 'olympics', 'duration': 4, 'result': {'win': 'player2', 'detail': 'Score is 79-45, team 2 plays really well'}, 'detail': 'Two teams are fighting for champions!'});
gamePlanner.addEvent('player3', 'player5', new Date(2022, 3, 16, 22, 0, 0, 0), {'type': 'basketball', 'location': 'quebec', 'gamename': 'nba', 'duration': 2, 'result': {'win': 'player5', 'detail': 'Score is 67-68, really close'}, 'detail': 'This is a popular game'});
gamePlanner.addEvent('player3', 'player2', new Date(2022, 3, 17, 18, 0, 0, 0), {'type': 'football', 'location': 'montreal', 'gamename': 'olympics', 'duration': 3, 'result': {'win': 'player2', 'detail': 'player2 is 2 points ahead'}, 'detail': 'The win is super important for both teams'});
gamePlanner.addEvent('player6', 'player7', new Date(2022, 3, 17, 2, 0, 0, 0), {'type': 'volleyball', 'location': 'toronto', 'gamename': 'olympics', 'duration': 6});
gamePlanner.addEvent('player2', 'player1', new Date(2022, 3, 17, 10, 0, 0, 0), {'type': 'badminton', 'gamename': 'vgame', 'duration': 3, 'result': {'win': 'player1', 'detail': 'player1 wins. Congratulations'}, 'detail': 'Player1 chase to win in the end'});
gamePlanner.addEvent('player3', 'player2', new Date(2022, 3, 18, 10, 0, 0, 0), {'location': 'montreal', 'gamename': 'nba', 'duration': 6});
gamePlanner.addEvent('player1', 'player9', new Date(2022, 3, 18, 18, 0, 0, 0), {'type': 'tennis', 'gamename': 'big-grande', 'duration': 5});
gamePlanner.addEvent('player4', 'player5', new Date(2022, 3, 19, 4, 0, 0, 0), {'type': 'badminton', 'location': 'quebec', 'gamename': 'bgame', 'duration': 3, 'result': {'win': 'player4', 'detail': 'It is so close. Player4 catches up at the end and wins.'}, 'detail': 'This game is really exciting'});
gamePlanner.addEvent('player4', 'player5', new Date(2022, 3, 19, 9, 0, 0, 0), {'type': 'tennis', 'location': 'montreal', 'gamename': 'atp', 'duration': 4});
gamePlanner.addEvent('player4', 'player5', new Date(2022, 3, 19, 18, 0, 0, 0), {'type': 'football', 'location': 'toronto', 'gamename': 'fgame', 'duration': 4, 'result': {'win': 'player1', 'detail': 'Congratulations go player1. '}, 'detail': 'This is a popular game'});
gamePlanner.addEvent('player1', 'player2', new Date(2022, 3, 20, 7, 0, 0, 0), {'type': 'tennis', 'location': 'toronto', 'gamename': 'olympics', 'duration': 5, 'result': {'win': 'player1', 'detail': 'Player1 is really in good status today'}, 'detail': 'The win is super important for both teams'});
gamePlanner.addEvent('player1', 'player4', new Date(2022, 3, 20, 14, 0, 0, 0), {'type': 'football', 'location': 'quebec', 'gamename': 'world-cup', 'duration': 3});
gamePlanner.addEvent('player3', 'player4', new Date(2022, 3, 22, 19, 0, 0, 0), {'type': 'badminton', 'location': 'toronto', 'gamename': 'nba', 'duration': 3, 'result': {'win': 'player1', 'detail': 'player4 lost many marks'}, 'detail': 'This is a popular game'});
gamePlanner.addEvent('player3', 'player5', new Date(2022, 3, 23, 3, 0, 0, 0), {'type': 'basketball', 'location': 'quebec', 'gamename': 'nba', 'duration': 4});
gamePlanner.addEvent('player3', 'player2', new Date(2022, 3, 23, 6, 0, 0, 0), {'type': 'tennis', 'location': 'montreal', 'gamename': 'atp', 'duration': 3});
gamePlanner.addEvent('player6', 'player7', new Date(2022, 3, 23, 12, 0, 0, 0), {'type': 'football', 'location': 'washington', 'duration': 3, 'result': {'win': 'player7', 'detail': 'Easy win for player7'}, 'detail': 'The win is super important for both teams'});
gamePlanner.addEvent('player2', 'player1', new Date(2022, 3, 24, 17, 0, 0, 0), {'type': 'volleyball', 'location': 'toronto', 'gamename': 'vgame'});
gamePlanner.addEvent('player3', 'player2', new Date(2022, 3, 24, 5, 0, 0, 0), {'type': 'tennis', 'location': 'montreal', 'gamename': 'nba', 'duration': 4});
gamePlanner.addEvent('player1', 'player9', new Date(2022, 3, 25, 3, 0, 0, 0), {'type': 'football', 'location': 'montreal', 'gamename': 'big-grande', 'duration': 5, 'result': {'win': 'player1', 'detail': 'Hard win for player1'}, 'detail': 'This game is hosted every year'});
gamePlanner.addEvent('player4', 'player5', new Date(2022, 3, 25, 16, 0, 0, 0), {'type': 'basketball', 'location': 'washington', 'gamename': 'bgame', 'duration': 3, 'result': {'win': 'player5', 'detail': 'Player5 got this'}, 'detail': 'This game is hosted every year'});
gamePlanner.addEvent('player4', 'player5', new Date(2022, 3, 26, 15, 0, 0, 0), {'type': 'badminton', 'location': 'toronto', 'gamename': 'bgame', 'duration': 4});
gamePlanner.addEvent('player4', 'player5', new Date(2022, 3, 27, 11, 0, 0, 0), {'type': 'basketball', 'location': 'toronto', 'gamename': 'bgame', 'duration': 3});
gamePlanner.addEvent('player1', 'player2', new Date(2022, 3, 27, 5, 0, 0, 0), {'location': 'toronto', 'gamename': 'atp', 'duration': 3, 'detail': 'This is a really special event'});
gamePlanner.addEvent('player1', 'player4', new Date(2022, 3, 27, 16, 0, 0, 0), {'type': 'tennis', 'location': 'quebec', 'gamename': 'olympics', 'duration': 4, 'detail': 'This game is really exciting'});
gamePlanner.addEvent('player3', 'player4', new Date(2022, 3, 28, 9, 0, 0, 0), {'type': 'badminton', 'location': 'washington', 'gamename': 'nba', 'duration': 3, 'detail': 'This is a popular game'});
gamePlanner.addEvent('player3', 'player5', new Date(2022, 3, 30, 21, 0, 0, 0), {'type': 'volleyball', 'location': 'quebec', 'gamename': 'nba', 'duration': 3, 'detail': 'This game is really exciting'});
gamePlanner.addEvent('player3', 'player2', new Date(2022, 3, 30, 3, 0, 0, 0), {'type': 'tennis', 'location': 'montreal', 'gamename': 'atp', 'duration': 5, 'detail': 'This is a really special event'});
gamePlanner.addEvent('player6', 'player7', new Date(2022, 4, 1, 8, 0, 0, 0), {'type': 'volleyball', 'gamename': 'vgame', 'duration': 4});
gamePlanner.addEvent('player2', 'player1', new Date(2022, 4, 1, 15, 0, 0, 0), {'type': 'football', 'location': 'toronto', 'gamename': 'world-cup', 'duration': 3, 'detail': 'The win is super important for both teams'});
gamePlanner.addEvent('player3', 'player2', new Date(2022, 4, 1, 18, 0, 0, 0), {'type': 'tennis', 'location': 'washington', 'gamename': 'big-grande', 'duration': 4, 'detail': 'This game is really exciting'});
gamePlanner.addEvent('player1', 'player9', new Date(2022, 4, 2, 19, 0, 0, 0), {'type': 'tennis', 'location': 'montreal', 'gamename': 'big-grande'});
gamePlanner.addEvent('player4', 'player5', new Date(2022, 4, 2, 3, 0, 0, 0), {'type': 'badminton', 'location': 'toronto', 'gamename': 'olympics', 'duration': 5});
gamePlanner.addEvent('player4', 'player5', new Date(2022, 4, 3, 13, 0, 0, 0), {'type': 'basketball', 'location': 'toronto', 'gamename': 'nba', 'duration': 3});
gamePlanner.addEvent('player4', 'player5', new Date(2022, 4, 5, 9, 0, 0, 0), {'type': 'volleyball', 'location': 'toronto', 'gamename': 'vgame', 'duration': 4, 'detail': 'This game is really exciting'});
gamePlanner.addEvent('player1', 'player2', new Date(2022, 4, 5, 14, 0, 0, 0), {'type': 'tennis', 'location': 'toronto', 'gamename': 'olympics', 'duration': 3, 'detail': 'The tickets for this game is really hard to get'});
gamePlanner.addEvent('player1', 'player4', new Date(2022, 4, 5, 4, 0, 0, 0), {'type': 'football', 'location': 'quebec', 'gamename': 'world-cup', 'duration': 4});
gamePlanner.addEvent('player3', 'player4', new Date(2022, 4, 6, 9, 0, 0, 0), {'location': 'toronto', 'gamename': 'nba', 'duration': 5, 'detail': 'So many peope are focusing on this game.'});
gamePlanner.addEvent('player3', 'player5', new Date(2022, 4, 6, 17, 0, 0, 0), {'type': 'basketball', 'location': 'quebec', 'duration': 3, 'detail': 'This game is hosted every year'});
gamePlanner.addEvent('player3', 'player2', new Date(2022, 4, 7, 14, 0, 0, 0), {'type': 'tennis', 'gamename': 'atp', 'duration': 4});
gamePlanner.addEvent('player6', 'player7', new Date(2022, 4, 9, 4, 0, 0, 0), {'location': 'toronto', 'gamename': 'vgame', 'duration': 3});
gamePlanner.addEvent('player2', 'player1', new Date(2022, 4, 9, 15, 0, 0, 0), {'type': 'volleyball', 'location': 'washington', 'gamename': 'vgame', 'duration': 4});
gamePlanner.addEvent('player3', 'player2', new Date(2022, 4, 10, 19, 0, 0, 0), {'type': 'football', 'location': 'montreal', 'gamename': 'nba', 'duration': 4, 'detail': 'This is a really special event'});
gamePlanner.addEvent('player1', 'player9', new Date(2022, 4, 12, 18, 0, 0, 0), {'type': 'tennis', 'location': 'montreal', 'gamename': 'big-grande', 'duration': 5});
gamePlanner.addEvent('player4', 'player5', new Date(2022, 4, 12, 8, 0, 0, 0), {'type': 'badminton', 'location': 'washington', 'gamename': 'olympics', 'duration': 3,'detail': 'Go! Player4'});
gamePlanner.addEvent('player4', 'player5', new Date(2022, 4, 13, 6, 0, 0, 0), {'type': 'basketball', 'location': 'toronto', 'gamename': 'nba', 'duration': 4});
gamePlanner.addEvent('player4', 'player5', new Date(2022, 4, 13, 12, 0, 0, 0), {'type': 'football', 'location': 'toronto', 'gamename': 'world-cup', 'duration': 5});

/* GameRenderer object is reponsible for display.
    Parameters:
        gamePlanner (GamePlanner): gives renderer data to display
        container (HTML Node): the place to display.
*/
let container = document.getElementById('library-content');
let gameRenderer = new GameRenderer(gamePlanner, container);

/*
GameRenderer.addFilterVariables(filter_list).
Parameters:
    filter_list: a list filter variables included for users to filter events. Default filter_list=['NA', 'player'].

GameRenderer.removeFilterVariables(filter_list).
Parameters:
    filter_list: a list filter variables to be removed for users to filter events.
*/
gameRenderer.addFilterVariables(['type', 'location', 'gamename', 'win', 'result-detail', 'detail', 'duration']);

/*
GameRenderer.setTableType(showByWeeks).
Parameters:
    showByWeeks: if we want to show the week table first. Default=true
*/
gameRenderer.setTableType(true);

/*
GameRender.display().
Parameters:
    display the final table based on previous setups.
*/
gameRenderer.display();



