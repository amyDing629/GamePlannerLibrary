class Event {
    constructor(player1, player2, startTime, eventID, options) {
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
    this.filterVariables = ['NA', 'player', 'time'];
    this.numberOfEvents = 0;
    this.tableName = null;
}

function GameRenderer(gamePlanner, container) {
	if (!(gamePlanner instanceof GamePlanner)) {
		throw new Error('Initialize renderer using a GamePlanner');
	}
    this.container = container;
	this.gamePlanner = gamePlanner;
    this.showByWeeks = true;
    let currentDate = new Date();
    // current week/month
    this.startDate = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()))
    this._buildButtons();
    this._bindEvents();

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
    _buildButtons: function() {
        this.weeksButton = document.createElement('button');
        this.weeksButton.innerHTML = 'Weeks';
        this.monthsButton = document.createElement('button');
        this.monthsButton.innerHTML = 'Months';
        this.filterButton = document.createElement('button');
        this.filterButton.innerHTML = 'filter';
        this.filterButton.id = 'filter';
        this.lastButton = document.createElement('button');
        this.lastButton.innerHTML = 'last';
        this.nextButton = document.createElement('button');
        this.nextButton.innerHTML = 'next';

    },

    _bindEvents: function() {
        this.weeksButton.addEventListener('click', () => {
            this.showByWeeks = true;
            this.display();
        });
        this.monthsButton.addEventListener('click', () => {
            this.showByWeeks = false;
            this.display();
        });
        this.filterButton.addEventListener('click', this.filterOnClick);
        this.lastButton.addEventListener('click', () => {
            if (this.showByWeeks == true) {
                console.log(this.startDate);
                this.startDate = new Date(this.startDate.setDate(this.startDate.getDate() - 7));
                console.log(this.startDate);
            } 
            // TODO for beta phase.
            // else {
            // }
            this.display();
        })
        this.nextButton.addEventListener('click', () => {
            if (this.showByWeeks == true) {
                console.log(this.startDate);
                this.startDate = new Date(this.startDate.setDate(this.startDate.getDate() + 7));
                console.log(this.startDate);
            } 
            // TODO for beta phase.
            // else {
            // }
            this.display();
        })

    },

    _filterOnClick: function() {
        let w = window.open("");
        w.document.writeln("popup-window");
    },

    setTableType: function(showByWeeks) {
        this.showByWeeks = showByWeeks;
    },

    display: function() {
        const gamePlanner = this.gamePlanner;
        if (this.container == null) {
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
        displayOption.appendChild(this.weeksButton);
        displayOption.appendChild(this.monthsButton);
        optionBar.appendChild(displayOption);

        let timeRangeSpan = document.createElement('span');
        timeRangeSpan.id = 'time-range';
        timeRangeSpan.innerHTML = 'Starts From: ' + this.startDate.toISOString().split('T')[0];
        optionBar.appendChild(timeRangeSpan);

        let flipPageSpan = document.createElement('span');
        flipPageSpan.id = 'flip-page';
        
        flipPageSpan.appendChild(this.lastButton);
        flipPageSpan.appendChild(this.nextButton);
        optionBar.appendChild(flipPageSpan)
        gamePlannerDiv.appendChild(optionBar);

        // filter bar
        filterDiv = document.createElement('div');
        filterDiv.id = 'filter';
        
        filterDescription = document.createElement('span');
        filterDescription.innerHTML = 'filter your events here';
        variableSelect = document.createElement('select');
        variableSelect.id = 'filter-variable';
        let filterVariable;
        for (filterVariable of gamePlanner.filterVariables){
            let filterOption = document.createElement('option');
            filterOption.innerHTML = filterVariable;
            variableSelect.appendChild(filterOption);
        }
        filterDiv.appendChild(variableSelect);

        operationSelect = document.createElement('select');
        operationSelect.id = 'filter-operation';
        let operation;
        for (operation of ['NA', 'exists', 'is', 'is not']){
            let operationOption = document.createElement('option');
            operationOption.innerHTML = operation;
            operationSelect.appendChild(operationOption);
        }
        filterDiv.appendChild(operationSelect);

        let input = document.createElement('input');
        input.type = 'text';
        input.id = 'filter-input';
        filterDiv.appendChild(input);

        filterDiv.appendChild(this.filterButton);
        gamePlannerDiv.appendChild(filterDiv);

        // main table
        if (this.showByWeeks == true) {
            gamePlannerDiv.appendChild(this._displayTableByWeeks());
        }
        else if (this.showByWeeks == false) {
            gamePlannerDiv.appendChild(this._displayTableByMonths());
        }
        this.container.innerHTML = ''; //clear everything
        this.container.appendChild(gamePlannerDiv);
        console.log(gamePlannerDiv);
    },

    _filterEventsWithDate: function(date) {
        let eventList = this.gamePlanner.events;
        let event;
        let result = [];
        for (event of eventList) {
            if ((event.startTime).getDate() == date.getDate() && (event.startTime).getMonth() == date.getMonth() && (event.startTime).getYear() == date.getYear()){
                result.push(event);
            }
        }
        return result;
    },

    _displayTableByWeeks: function() {
        const gamePlanner = this.gamePlanner;
        let mainTable = document.createElement('table');
        let thread = document.createElement('thread');
        let thread_tr = document.createElement('tr');
        let th;
        for (days of ['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']){
            th = document.createElement('th');
            th.innerHTML = days;
            thread_tr.appendChild(th);
        }
        thread.appendChild(thread_tr);
        mainTable.appendChild(thread);

        let tbody = document.createElement('tbody');
        body_tr = document.createElement('tr');
        time_td = document.createElement('td');
        let eventTime;
        for (let i = 0; i < 48; i++) {
            if (Math.floor(i/2) == i/2){
                eventTime = Math.floor(i/2).toString() + ':00';
            } else {
                eventTime = Math.floor(i/2).toString() + ':30';
            }
            timeDiv = document.createElement('div');
            timeDiv.className = 'planner_time';
            timeDiv.innerHTML = eventTime;
            time_td.appendChild(timeDiv);
        }
        body_tr.appendChild(time_td);

        for (let i = 0; i<7; i++) {
            event_td = document.createElement('td');
            event_td.className = 'events';
            let date = new Date(this.startDate);
            date = new Date(date.setDate(date.getDate() + i));
            console.log(date);
            let event;
            for (event of this._filterEventsWithDate(date)){
                eventDiv = document.createElement('div');
                eventDiv.className = 'event';

                name_h3 = document.createElement('h3');
                name_h3.className = 'game-name';
                name_h3.innerHTML = event.gamename;
                eventDiv.appendChild(name_h3);

                type_h4 = document.createElement('h4');
                type_h4.className = 'game-type';
                type_h4.innerHTML = event.type;
                eventDiv.appendChild(type_h4);

                location_h4 = document.createElement('h4');
                location_h4.className = 'game-location';
                location_h4.innerHTML = event.location;
                eventDiv.appendChild(location_h4);

                players_h4 = document.createElement('h4');
                players_h4.className = 'players';
                players_h4.innerHTML = event.player1 + ' VS ' + event.player2;
                eventDiv.appendChild(players_h4);

                event_td.appendChild(eventDiv);
            }
            body_tr.appendChild(event_td);
        } 
        tbody.appendChild(body_tr);
        mainTable.appendChild(tbody);   
        return mainTable; 

    },

    _displayTableByMonths: function(container) {
        let h3 = document.createElement('h3');
        h3.innerHTML = 'Not Implemented For Alpha Phase.';
        return h3;
    }
}


