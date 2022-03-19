class Event {
    constructor(player1, player2, startTime, eventID, options: dict) {
        this.player1 = player1;
        this.player2 = player2;
        this.startTime = startTime;
        if ('duration' in options) {
            this.duration = options['duration'];
        }
        if ('type' in options) {
            this.type = options['type'];
        }
        if ('location' in options) {
            this.location = options['location'];
        }
        if ('result' in options) {
            this.result = options['result'];
        }
        if ('gamename' in options) {
            this.gamename = options['gamename'];
        }
    }
}

function GamePlanner() {
	this.events = [];
    this.filterVariables = ['player', 'time'];
    this.numberOfEvents = 0;
    this.tableName = null;
}

function GameRenderer(gamePlanner) {
	if (!(gamePlanner instanceof GamePlanner)) {
		throw new Error('Initialize renderer using a GamePlanner');
	}
	this.gamePlanner = gamePlanner;
    this.showByWeeks = true;
    this.timeRange = null // TODO: default to current week/month
};

GamePlanner.prototype = {
    setTableName: function(tableName) {
        this.tableName = tableName;
    },

	addEvent: function(player1, player2, time, options) {
        this.numberOfEvent += 1;
		this.events.push(new Event(player1, player2, time, this.numberOfevents, options));
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
};

GameRenderer.prototype = {
    display: function(selector) {
        const container = document.querySelector(selector);
        const gamePlanner = this.gamePlanner;
        if container == null {
            throw new Error('GamePlanner container not found');
        }
        const gamePlannerDiv = document.createElement('div');
        gamePlannerDiv.className = 'game-planner';

        // title
        let gamePlannerTitle = document.createElement('h3');
        gamePlannerTitle.className = 'planner-title';
        gamePlannerTitle.innerHTML = gamePlanner.tableName;
        gamePlannerDiv.appendChild(gamePlannerTitle);
        
        // option bar
        let optionBar = document.createElement('div');
        optionBar.id = 'option-bar';

        let displayOption = document.createElement('span');
        displayOption.id = 'display-option';
        let weeksButton = document.createElement('button');
        weeksButton.innerHTML = 'Weeks';
        let monthsButton = document.createElement('button');
        monthsButton.innerHTML = 'Months';
        displayOption.appendChild(weeksButton);
        displayOption.appendChild(monthsButton);
        optionBar.appendChild(displayOption);

        let filterButton = document.createElement('button');
        filterButton.id = 'filter';
        filterButton.innerHTML = 'filter';
        optionBar.appendChild(filterButton);

        let timeRangeSpan = document.createElement('span');
        timeRangeSpan.id = 'time-range';
        timeRangeSpan.innerHTML = this.timeRange;
        optionBar.appendChild(timeRangeSpan);

        let flipPageSpan = document.createElement('span');
        flipPageSpan.id = 'flip-page';
        lastButton = document.createElement('last');
        lastButton.innerHTML = 'last';
        nextButton = document.createElement('next');
        nextButton.innerHTML = 'next';
        flipPageSpan.appendChild(lastButton);
        flipPageSpan.appendChild(nextButton);
        optionBar.appendChild(flipPageSpan)
        
        if (this.showByWeeks == true) {
            optionBar.appendChild(self._displayTableByWeeks(container));
        }
        else if (this.showByWeeks == false) {
            optionBar.appendChild(self._displayTableByMonths(container));
        }
    },

    _displayTableByWeeks: function(container) {
        const gamePlanner = this.gamePlanner;
        

    },

    _displayTableByMonths: function(container) {

    }


}

}

