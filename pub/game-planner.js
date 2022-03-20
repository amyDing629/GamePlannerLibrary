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
    this.filterVariables = ['NA', 'player'];
    this.numberOfEvents = 0;
    this.tableName = null;
}

function GameRenderer(gamePlanner, container) {
	if (!(gamePlanner instanceof GamePlanner)) {
		throw new Error('Initialize renderer using a GamePlanner');
	}
    this.filteredEventList = gamePlanner.events;
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
        this.filterButton.className = 'filter';
        this.addFilterButton = document.createElement('button');
        this.addFilterButton.innerHTML = 'add filter';
        this.addFilterButton.id = 'add-filter';
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
        this.filterButton.addEventListener('click', () => {
            this.filteredEventList = this.gamePlanner.events;
            let filterDiv = document.getElementById('filterDiv');
            let li;
            for (li of filterDiv.children[2].children){
                let operationSelect = li.getElementsByClassName('filter-operation')[0];
                let variableSelect = li.getElementsByClassName('filter-variable')[0];
                let operation = operationSelect.options[operationSelect.selectedIndex].text;
                let variable = variableSelect.options[variableSelect.selectedIndex].text;
                let value = li.getElementsByClassName('filter-input')[0].value;
                if (operation != 'NA' && variable != 'NA') {
                    this._filterEvents(variable, value, operation);
                }
            }
            this.display();
            
        });
        this.addFilterButton.addEventListener('click', () => {
            let filterUl = document.getElementById('filterDiv').children[2];
            filterUl.appendChild(this._createFilterLi());
        });
        
        this.lastButton.addEventListener('click', () => {
            if (this.showByWeeks == true) {
                this.startDate = new Date(this.startDate.setDate(this.startDate.getDate() - 7));
            } 
            // TODO for beta phase.
            // else {
            // }
            this.display();
        });
        this.nextButton.addEventListener('click', () => {
            if (this.showByWeeks == true) {
                this.startDate = new Date(this.startDate.setDate(this.startDate.getDate() + 7));
            } 
            // TODO for beta phase.
            // else {
            // }
            this.display();
        });

    },

    _eventExists: function(variable, value){
        let result_list = [];
        for (event of this.filteredEventList){
            if (variable == 'player') {
                if (event.player1 != null && event.player2 != null){
                    result_list.push(event);
                }
            }
            else if (variable == 'duration') {
                if (event.duration != null){
                    result_list.push(event);
                }
            }
            else if (variable == 'type') {
                if (event.type != null){
                    result_list.push(event);
                }
            }
            else if (variable == 'location') {
                if (event.location != null){
                    result_list.push(event);
                }
            }
            else if (variable == 'result') {
                if (event.result != null){
                    result_list.push(event);
                }
            }
            else if (variable == 'gamename') {
                if (event.gamename != null){
                    result_list.push(event);
                }
            }
            //TODO: add more
        }
        this.filteredEventList = result_list;
    },

    _eventIs: function(variable, value){
        let result_list = [];
        for (event of this.filteredEventList){
            if (variable == 'player') {
                if (event.player1 == value || event.player2 == value){
                    result_list.push(event);
                }
            }
            else if (variable == 'duration') {
                if (event.duration == value){
                    result_list.push(event);
                }
            }
            else if (variable == 'type') {
                if (event.type == value){
                    result_list.push(event);
                }
            }
            else if (variable == 'location') {
                if (event.location == value){
                    result_list.push(event);
                }
            }
            else if (variable == 'result') {
                if (event.result == value){
                    result_list.push(event);
                }
            }
            else if (variable == 'gamename') {
                if (event.gamename == value){
                    result_list.push(event);
                }
            }
            //TODO: add more
        }
        this.filteredEventList = result_list;
    },

    _eventIsNot: function(variable, value){
        let result_list = [];
        for (event of this.filteredEventList){
            if (variable == 'player') {
                if (event.player1 != value && event.player2 != value){
                    result_list.push(event);
                }
            }
            else if (variable == 'duration') {
                if (event.duration != value){
                    result_list.push(event);
                }
            }
            else if (variable == 'type') {
                if (event.type != value){
                    result_list.push(event);
                }
            }
            else if (variable != 'location') {
                if (event.location == value){
                    result_list.push(event);
                }
            }
            else if (variable != 'result') {
                if (event.result == value){
                    result_list.push(event);
                }
            }
            else if (variable != 'gamename') {
                if (event.gamename == value){
                    result_list.push(event);
                }
            }
            //TODO: add more
        }
        this.filteredEventList = result_list;
    },

    _filterEvents: function(variable, value, operation){
        let result_list = [];
        let event;
        for (event of this.filteredEventList){
            console.log(this.filteredEventList);
            if (operation == 'exists'){
                this._eventExists(variable, value);
            }
            else if (operation == 'is'){
                this._eventIs(variable, value);
            }
            else if (operation == 'is not'){
                this._eventIsNot(variable, value);
            }
        }
    },


    setTableType: function(showByWeeks) {
        this.showByWeeks = showByWeeks;
    },

    _createFilterLi: function() {
        let filterLi = document.createElement('li');
        let filterDescription = document.createElement('span');
        filterDescription.innerHTML = 'filter your events here';
        let variableSelect = document.createElement('select');
        variableSelect.className = 'filter-variable';
        let filterVariable;
        for (filterVariable of gamePlanner.filterVariables){
            let filterOption = document.createElement('option');
            filterOption.innerHTML = filterVariable;
            variableSelect.appendChild(filterOption);
        }
        filterLi.appendChild(variableSelect);

        operationSelect = document.createElement('select');
        operationSelect.className = 'filter-operation';
        let operation;
        for (operation of ['NA', 'exists', 'is', 'is not']){
            let operationOption = document.createElement('option');
            operationOption.innerHTML = operation;
            operationSelect.appendChild(operationOption);
        }
        filterLi.appendChild(operationSelect);

        let input = document.createElement('input');
        input.type = 'text';
        input.className = 'filter-input';
        filterLi.appendChild(input);
        return filterLi;

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
        filterDiv.id = 'filterDiv';
        filterDiv.appendChild(this.filterButton);
        filterDiv.appendChild(this.addFilterButton);
        filterUl = document.createElement('ul');
        filterUl.appendChild(this._createFilterLi())
        
        filterDiv.appendChild(filterUl);
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
    },

    _filterEventsWithDate: function(date) {
        let event;
        let result = [];
        for (event of this.filteredEventList) {
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


