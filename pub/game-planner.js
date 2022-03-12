class Event {
    constructor(player1, player2, time) {
        this.player1 = player1;
        this.player2 = player2;
        this.time = time;
        this.type = null;
        this.location = null;
        this.result = null;
        this.gamename = null;
        this.eventID = numberOfEvents;
        numberOfEvent ++;
    }
}

function GamePlanner() {
	this.events = [];
    this.showByWeeks = true;
    this.filterVariables = ['player', 'time'];
}

GamePlanner.prototype = {

	addEvent: function(player1, player2, time) {
		this.events.push(new Event(player1, player2, time));
	},

    removeEvent: function(eventID) {
        for (event of this.events) {
            if (event.eventID == eventID) {
                this.events.remove(event);
            }
        }
    },

    setTableType: function(tableType) {
        this.showByWeeks = tableType;
    },

    addFilterVariables: function(variables) {
        this.filterVariables += variables;
    },

    removeFilterVariables: function(variables) {
        for (variable of variables) {
            if (this.filterVariables.includes(variable)){
                this.filterVariables.remove(variable);
            }
        }
    },

    display: function() {
        
    }



}

