class Event {
    constructor(player1, player2, startTime, eventID, options) {
        this.player1 = player1;
        this.player2 = player2;
        this.startTime = startTime;
        this.eventID = eventID;
        if ('duration' in options) {
            this.duration = options['duration'];
        }else{
            this.duration = 3;
        }
        if ('type' in options) {
            this.type = options['type'];
        }
        if ('location' in options) {
            this.location = options['location'];
        }
        if ('gamename' in options) {
            this.gamename = options['gamename'];
        }
        if ('color' in options){
            this.color = options['color'];
        } else {
            this.color = '#E0FFFF';
        }
        if ('detail' in options){
            this.detail = options['detail'];
        }
        if ('result' in options){
            this.win = options['result']['win'];
            if ('detail' in options['result']){
                this.resultdetail = options['result']['detail'];
            }
        }
    }
}

function GamePlanner() {
	this.events = [];
    this.numberOfEvents = 0;
    this.tableName = 'Game Planner';
    this.latestTime = null;
    this.earliestTime = null;
}

function GameRenderer(gamePlanner, container) {
	if (!(gamePlanner instanceof GamePlanner)) {
		throw new Error('Initialize renderer using a GamePlanner');
	}
    this.filterVariables = ['NA', 'player'];
    this.filteredEventList = gamePlanner.events;
    this.container = container;
	this.gamePlanner = gamePlanner;
    this.showByWeeks = true;
    let currentDate = new Date();
    // current week/month
    if (this.showByWeeks == true){
        this.startDate = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()))
    } else {
        this.startDate = currentDate;
    }
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
        if (this.latestTime == null || time.getTime() > this.latestTime.getTime()) {
            this.latestTime = time;
        }
        if (this.earliestTime == null || time.getTime() < this.earliestTime.getTime()) {
            this.earliestTime = time;
        }
	},

    getEventList: function() {
        return this.events;
    },

    removeEvent: function(eventID) {
        for( let i = 0; i < this.events.length; i++){                      
            if ( this.events[i].eventID == eventID) { 
                this.events.splice(i, 1); 
                break;
            }
        }
    },
};

GameRenderer.prototype = {
    addFilterVariables: function(variables) {
        let variable;
        for (variable of variables){
            if (!this.filterVariables.includes(variable)){
                this.filterVariables.push(variable);
            }
        }
    },

    removeFilterVariables: function(variables) {
        let variable;
        for (variable of variables) {
            if (this.filterVariables.includes(variable)){
                this.filterVariables.remove(variable);
            }
        }
    },
    _buildButtons: function() {
        this.weeksButton = document.createElement('button');
        this.weeksButton.innerHTML = 'Weeks';
        this.weeksButton.className = "btn btn-outline-dark btn-sm";
        this.daysButton = document.createElement('button');
        this.daysButton.innerHTML = 'Days';
        this.daysButton.className = "btn btn-outline-dark btn-sm";
        this.filterButton = document.createElement('button');
        this.filterButton.innerHTML = 'filter';
        this.filterButton.className = 'filter btn btn-primary btn';
        this.addFilterButton = document.createElement('button');
        this.addFilterButton.innerHTML = 'add filter';
        this.addFilterButton.id = 'add-filter';
        this.addFilterButton.className = 'btn btn-outline-primary btn-sm';
        this.lastButton = document.createElement('button');
        this.lastButton.className = "btn btn-outline-dark btn-sm";
        this.lastButton.innerHTML = 'last';
        this.nextButton = document.createElement('button');
        this.nextButton.className = "btn btn-outline-dark btn-sm";
        this.nextButton.innerHTML = 'next';
        this.timeInput = document.createElement('input');
        this.timeInput.id = 'time-range';
        this.timeInput.type = 'date';
        this.timeInput.value = new Date(this.startDate.getTime() - (this.startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
        this.changeColorInput = document.createElement('input');
        this.changeColorInput.id = "change-color-button";
        this.changeColorInput.type = 'color';
        this.resetButton = document.createElement('reset');
        this.resetButton.id = 'reset';
        this.resetButton.innerHTML = 'reset';
        this.resetButton.className = 'btn btn-outline-success btn-sm'
    },

    _bindEvents: function() {
        this.weeksButton.addEventListener('click', () => {
            this.showByWeeks = true;
            let currentDate = new Date();
            this.startDate = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
            // update main-table update
            document.getElementById('time-range').value = new Date(this.startDate.getTime() - (this.startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            if (document.getElementById('day-table')){
                document.getElementById('game-planner').removeChild(document.getElementById('day-table'));
            }else if (document.getElementById('main-table')){
                document.getElementById('game-planner').removeChild(document.getElementById('main-table'));
            }
            document.getElementById('game-planner').appendChild(this._displayTableByWeeks());
        });
        this.daysButton.addEventListener('click', () => {
            this.showByWeeks = false;
            this.startDate = new Date();
            if (document.getElementById('day-table')){
                document.getElementById('game-planner').removeChild(document.getElementById('day-table'));
            }else if (document.getElementById('main-table')){
                document.getElementById('game-planner').removeChild(document.getElementById('main-table'));
            }
            document.getElementById('time-range').value = new Date(this.startDate.getTime() - (this.startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            document.getElementById('game-planner').appendChild(this._displayTableByDays());
        });
        this.filterButton.addEventListener('click', () => {
            this.filteredEventList = this.gamePlanner.events;
            let filterDiv = document.getElementById('filterDiv');
            let li;
            for (li of filterDiv.children[0].children){
                let operationSelect = li.getElementsByClassName('filter-operation')[0];
                let variableSelect = li.getElementsByClassName('filter-variable')[0];
                let operation = operationSelect.options[operationSelect.selectedIndex].text;
                let variable = variableSelect.options[variableSelect.selectedIndex].text;
                let value = li.getElementsByClassName('filter-input')[0].value;
                if (operation != 'NA' && variable != 'NA') {
                    this._filterEvents(variable, value, operation);
                }
            }

            if (document.getElementById('day-table')){
                document.getElementById('game-planner').removeChild(document.getElementById('day-table'));
            }else if (document.getElementById('main-table')){
                document.getElementById('game-planner').removeChild(document.getElementById('main-table'));
            }
            // update main-table update
            if (this.showByWeeks == true) {
                document.getElementById('game-planner').appendChild(this._displayTableByWeeks());
            }
            else if (this.showByWeeks == false) {
                document.getElementById('game-planner').appendChild(this._displayTableByDays());
            }
            
        });
        this.addFilterButton.addEventListener('click', () => {
            let filterUl = document.getElementById('filterDiv').children[0];
            filterUl.appendChild(this._createFilterLi());
        });
        
        this.lastButton.addEventListener('click', () => {
            if (this.showByWeeks == true) {
                this.startDate = new Date(this.startDate.setDate(this.startDate.getDate() - 7));
            } 
            else {
                this.startDate = new Date(this.startDate.setDate(this.startDate.getDate() - 1));
            }
            
            document.getElementById('time-range').value = new Date(this.startDate.getTime() - (this.startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            // update main-table update
            
            if (document.getElementById('day-table')){
                document.getElementById('game-planner').removeChild(document.getElementById('day-table'));
            }else if (document.getElementById('main-table')){
                document.getElementById('game-planner').removeChild(document.getElementById('main-table'));
            }

            if (this.showByWeeks == true) {
                document.getElementById('game-planner').appendChild(this._displayTableByWeeks());
            }
            else if (this.showByWeeks == false) {
                document.getElementById('game-planner').appendChild(this._displayTableByDays());
            }

        });
        this.nextButton.addEventListener('click', () => {
            if (this.showByWeeks == true) {
                this.startDate = new Date(this.startDate.setDate(this.startDate.getDate() + 7));
            } 
            else {
                this.startDate = new Date(this.startDate.setDate(this.startDate.getDate() + 1));
            }

            document.getElementById('time-range').value = new Date(this.startDate.getTime() - (this.startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            // update main-table update
            if (document.getElementById('day-table')){
                document.getElementById('game-planner').removeChild(document.getElementById('day-table'));
            }else if (document.getElementById('main-table')){
                document.getElementById('game-planner').removeChild(document.getElementById('main-table'));
            }
            if (this.showByWeeks == true) {
                document.getElementById('game-planner').appendChild(this._displayTableByWeeks());
            }
            else if (this.showByWeeks == false) {
                document.getElementById('game-planner').appendChild(this._displayTableByDays());
            }
        });
        this.timeInput.addEventListener('change', () => {
            let changedTime = this.timeInput.value;
            splittedTime = changedTime.split('-');
            let selectedDate = new Date(splittedTime[0], splittedTime[1]-1, splittedTime[2]);
            if (this.showByWeeks == true){
                this.startDate = new Date(selectedDate.setDate(selectedDate.getDate() - selectedDate.getDay()));
            } else if (this.showByWeeks == false){
                this.startDate = selectedDate;
            }
           

            if (document.getElementById('day-table')){
                document.getElementById('game-planner').removeChild(document.getElementById('day-table'));
            }else if (document.getElementById('main-table')){
                document.getElementById('game-planner').removeChild(document.getElementById('main-table'));
            }

            if (this.showByWeeks == true) {
                document.getElementById('game-planner').appendChild(this._displayTableByWeeks());
                this.timeInput.value = new Date(this.startDate.getTime() - (this.startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            }
            else if (this.showByWeeks == false) {
                document.getElementById('game-planner').appendChild(this._displayTableByDays());
            }

        });
        this.changeColorInput.addEventListener('change', () => {
            let changedColor = this.changeColorInput.value;
            let event;
            for (event of this.filteredEventList){
                event.color = changedColor;
            }

            if (this.showByWeeks == true) {
                if (document.getElementById('day-table')){
                    document.getElementById('game-planner').removeChild(document.getElementById('day-table'));
                }else if (document.getElementById('main-table')){
                    document.getElementById('game-planner').removeChild(document.getElementById('main-table'));
                }
                document.getElementById('game-planner').appendChild(this._displayTableByWeeks());
                this.timeInput.value = new Date(this.startDate.getTime() - (this.startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            }
            else if (this.showByWeeks == false) {
                if (document.getElementById('day-table')){
                    document.getElementById('game-planner').removeChild(document.getElementById('day-table'));
                }else if (document.getElementById('main-table')){
                    document.getElementById('game-planner').removeChild(document.getElementById('main-table'));
                }
                document.getElementById('game-planner').appendChild(this._displayTableByDays());
            }

        });
        this.resetButton.addEventListener('click', () => {
            this.filteredEventList = this.gamePlanner.events;
            this.display();
        })

    },

    _eventExists: function(variable, value){
        let result_list = [];
        let event;
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
            else if (variable == 'win') {
                if (event.win != null){
                    result_list.push(event);
                }
            }
            else if (variable == 'result-detail') {
                if (event.resultdetail != null){
                    result_list.push(event);
                }
            }
            else if (variable == 'detail') {
                if (event.detail != null){
                    result_list.push(event);
                }
            }
            else if (variable == 'gamename') {
                if (event.gamename != null){
                    result_list.push(event);
                }
            }
        }
        this.filteredEventList = result_list;
    },

    _eventNotExist: function(variable, value){
        let result_list = [];
        let event;
        for (event of this.filteredEventList){
            if (variable == 'player') {
                if (event.player1 == null || event.player2 == null){
                    result_list.push(event);
                }
            }
            else if (variable == 'duration') {
                if (event.duration == null){
                    result_list.push(event);
                }
            }
            else if (variable == 'type') {
                if (event.type == null){
                    result_list.push(event);
                }
            }
            else if (variable == 'location') {
                if (event.location == null){
                    result_list.push(event);
                }
            }
            else if (variable == 'win') {
                if (event.win == null){
                    result_list.push(event);
                }
            }
            else if (variable == 'result-detail') {
                if (event.resultdetail == null){
                    result_list.push(event);
                }
            }
            else if (variable == 'detail') {
                if (event.detail == null){
                    result_list.push(event);
                }
            }
            else if (variable == 'gamename') {
                if (event.gamename == null){
                    result_list.push(event);
                }
            }
        }
        this.filteredEventList = result_list;
    },

    _eventIs: function(variable, value){
        let result_list = [];
        let event;
        for (event of this.filteredEventList){
            if (variable == 'player') {
                if (event.player1 == value || event.player2 == value){
                    result_list.push(event);
                }
            }
            else if (variable == 'duration') {
                if (event.duration.toString() == value){
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
            else if (variable == 'win') {
                if (event.win == value){
                    result_list.push(event);
                }
            }
            else if (variable == 'result-detail'){
                if (event.resultdetail == value){
                    result_list.push(event);
                }
            }
            else if (variable == 'detail'){
                if (event.detail == value){
                    result_list.push(event);
                }
            }
            else if (variable == 'gamename') {
                if (event.gamename == value){
                    result_list.push(event);
                }
            }
        }
        this.filteredEventList = result_list;
    },

    _eventIsNot: function(variable, value){
        let result_list = [];
        let event;
        for (event of this.filteredEventList){
            if (variable == 'player') {
                if (event.player1 != value && event.player2 != value){
                    result_list.push(event);
                }
            }
            else if (variable == 'duration') {
                if (event.duration.toString() != value){
                    result_list.push(event);
                }
            }
            else if (variable == 'type') {
                if (event.type != value){
                    result_list.push(event);
                }
            }
            else if (variable == 'location') {
                if (event.location != value){
                    result_list.push(event);
                }
            }
            else if (variable == 'win') {
                if (event.win != value){
                    result_list.push(event);
                }
            }
            else if (variable == 'result-detail'){
                if (event.resultdetail != value){
                    result_list.push(event);
                }
            }
            else if (variable == 'detail'){
                if (event.detail != value){
                    result_list.push(event);
                }
            }
            else if (variable == 'gamename') {
                if (event.gamename != value){
                    result_list.push(event);
                }
            }
        }
        this.filteredEventList = result_list;
    },

    _eventContain: function(variable, value){
        let result_list = [];
        let event;
        for (event of this.filteredEventList){
            if (variable == 'player') {
                if (event.player1.includes(value) || event.player2.includes(value)){
                    result_list.push(event);
                }
            }
            else if (variable == 'duration') {
                if (event.duration.toString().includes(value)){
                    result_list.push(event);
                }
            }
            else if (variable == 'type') {
                if (event.type){
                    if (event.type.includes(value)){
                        result_list.push(event);
                    }
                }
            }
            else if (variable == 'location') {
                if (event.location){
                    if (event.location.includes(value)){
                        result_list.push(event);
                    }
                }
            }
            else if (variable == 'win') {
                if (event.win){
                    if (event.win.includes(value)){
                        result_list.push(event);
                    }
                }
            }
            else if (variable == 'result-detail'){
                if (event.resultdetail){
                    if (event.resultdetail.includes(value)){
                        result_list.push(event);
                    }
                }
            }
            else if (variable == 'detail'){
                if (event.detail){
                    if (event.detail.includes(value)){
                        result_list.push(event);
                    }
                }
            }
            else if (variable == 'gamename') {
                if (event.gamename){
                    if (event.gamename.includes(value)){
                        result_list.push(event);
                    }
                }
            }
        }
        this.filteredEventList = result_list;
    },

    _eventNotContain: function(variable, value){
        let result_list = [];
        let event;
        for (event of this.filteredEventList){
            if (variable == 'player') {
                if (!event.player1.includes(value) && !event.player2.includes(value)){
                    result_list.push(event);
                }
            }
            else if (variable == 'duration') {
                if (!event.duration.toString().includes(value)){
                    result_list.push(event);
                }
            }
            else if (variable == 'type') {
                if (event.type){
                    if (!event.type.includes(value)){
                        result_list.push(event);
                    }
                }
            }
            else if (variable == 'location') {
                if (event.location){
                    if (!event.location.includes(value)){
                        result_list.push(event);
                    }
                }
            }
            else if (variable == 'win') {
                if (event.win){
                    if (!event.win.includes(value)){
                        result_list.push(event);
                    }
                }
            }
            else if (variable == 'result-detail'){
                if (event.resultdetail){
                    if (!event.resultdetail.includes(value)){
                        result_list.push(event);
                    }
                }
            }
            else if (variable == 'detail'){
                if (event.detail){
                    if (!event.detail.includes(value)){
                        result_list.push(event);
                    }
                }
            }
            else if (variable == 'gamename') {
                if (event.gamename){
                    if (!event.gamename.includes(value)){
                        result_list.push(event);
                    }
                }
            }
        }
        this.filteredEventList = result_list;
    },


    _filterEvents: function(variable, value, operation){
        let event;
        for (event of this.filteredEventList){
            if (operation == 'exists'){
                this._eventExists(variable, value);
            }
            if (operation == "doesn't exist"){
                this._eventNotExist(variable, value);
            }
            else if (operation == 'is'){
                this._eventIs(variable, value);
            }
            else if (operation == 'is not'){
                this._eventIsNot(variable, value);
            }
            else if (operation == 'contains'){
                this._eventContain(variable, value);
            }
            else if (operation == "doesn't contain"){
                this._eventNotContain(variable, value);
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
        for (filterVariable of this.filterVariables){
            let filterOption = document.createElement('option');
            filterOption.innerHTML = filterVariable;
            variableSelect.appendChild(filterOption);
        }
        filterLi.appendChild(variableSelect);

        operationSelect = document.createElement('select');
        operationSelect.className = 'filter-operation';
        let operation;
        for (operation of ['NA', 'exists', 'is', 'is not', "doesn't exist", 'contains', "doesn't contain"]){
            let operationOption = document.createElement('option');
            operationOption.innerHTML = operation;
            operationSelect.appendChild(operationOption);
        }
        filterLi.appendChild(operationSelect);

        let input = document.createElement('input');
        input.type = 'text';
        input.className = 'filter-input';
        filterLi.appendChild(input);
        
        let removeButton = document.createElement('button');
        removeButton.className = 'filter-remove btn btn-outline-danger btn-sm';
        removeButton.innerHTML = 'remove';
        removeButton.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.removeChild(e.target.parentElement);
        });

        filterLi.appendChild(removeButton);


        return filterLi;
        
    },

    display: function() {
        const gamePlanner = this.gamePlanner;
        if (this.container == null) {
            throw new Error('GamePlanner container not found');
        }
        const gamePlannerDiv = document.createElement('div');
        gamePlannerDiv.id = 'game-planner';

        // title
        let gamePlannerTitle = document.createElement('h3');
        gamePlannerTitle.id = 'planner-title';
        gamePlannerTitle.innerHTML = gamePlanner.tableName;
        gamePlannerDiv.appendChild(gamePlannerTitle);

        // filter bar
        let filterDiv = document.createElement('div');
        filterDiv.id = 'filterDiv';
        let filterUl = document.createElement('ul');
        
        filterUl.appendChild(this._createFilterLi());
        
        filterButtonsDiv = document.createElement('div');
        filterButtonsDiv.id = 'filterButtons';
        filterButtonsDiv.appendChild(this.resetButton);
        filterButtonsDiv.appendChild(this.addFilterButton);
        filterButtonsDiv.appendChild(this.filterButton);
        filterDiv.appendChild(filterUl); 
        filterDiv.appendChild(filterButtonsDiv);
        gamePlannerDiv.appendChild(filterDiv);

        // option bar
        let optionBar = document.createElement('div');
        optionBar.id = 'option-bar';

        let displayOption = document.createElement('span');
        displayOption.id = 'display-option';
        displayOption.appendChild(this.weeksButton);
        displayOption.appendChild(this.daysButton);
        optionBar.appendChild(displayOption);
        let changeColorSpan = document.createElement('span');
        changeColorSpan.id = 'change-color';
        changeColorSpan.innerHTML = 'Change Color: ';
        changeColorSpan.appendChild(this.changeColorInput);
        optionBar.appendChild(changeColorSpan);


        let flipPageSpan = document.createElement('span');
        flipPageSpan.id = 'flip-page';
        
        flipPageSpan.appendChild(this.lastButton);
        flipPageSpan.appendChild(this.nextButton);
        optionBar.appendChild(flipPageSpan)

        let timeRangeSpan = document.createElement('span');
        timeRangeSpan.id = 'time-span';
        timeRangeSpan.innerHTML = 'Starts From: ';
        optionBar.appendChild(this.timeInput);
        optionBar.appendChild(timeRangeSpan);

        gamePlannerDiv.appendChild(optionBar);

        // main table
        if (this.showByWeeks == true) {
            gamePlannerDiv.appendChild(this._displayTableByWeeks());
        }
        else if (this.showByWeeks == false) {
            gamePlannerDiv.appendChild(this._displayTableByDays());
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
        let mainTable = document.createElement('table');
        mainTable.id = 'main-table';
        let thead = document.createElement('thead');
        thead.id = 'thead';
        let thead_tr = document.createElement('tr');
        let th;
        for (days of ['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']){
            th = document.createElement('th');
            th.innerHTML = days;
            thead_tr.appendChild(th);
        }
        thead.appendChild(thead_tr);
        mainTable.appendChild(thead);

        let tbody = document.createElement('tbody');
        tbody.id = 'tbody';
        for (let j = 0; j < 24; j++) {
            body_tr = document.createElement('tr');
            time_td = document.createElement('td');
            let eventTime;
            eventTime = j.toString() + ':00';
            timeDiv = document.createElement('div');
            timeDiv.className = 'planner_time';
            timeDiv.innerHTML = eventTime;
            time_td.appendChild(timeDiv);
            body_tr.appendChild(time_td);
            for (let i = 0; i<7; i++) {
                eventBlock_td = document.createElement('td');
                eventBlock_td.className = 'events';
                body_tr.appendChild(eventBlock_td);
            }
            tbody.appendChild(body_tr);
        }

        // loop a week's date and check if there's event on that day and display.
        for (let j = 0; j<7; j++) {
            let date = new Date(this.startDate);
            date = new Date(date.setDate(date.getDate() + j));
            let event;
            for (event of this._filterEventsWithDate(date)){
                eventDiv = document.createElement('div');
                eventDiv.className = 'event';
                eventDiv.style.setProperty('position', 'absolute');
                eventDiv.style = "top:" + 30*parseInt(event.startTime.getHours()).toString() + "px; ";
                eventDiv.style.setProperty('height', (30*event.duration).toString() + 'px');
                eventDiv.style.setProperty('left', (125*(j+1)).toString() + 'px');
                eventDiv.style.setProperty('background-color', event.color);
                players_h6 = document.createElement('h6');
                players_h6.className = 'players';
                players_h6.innerHTML = event.player1 + '<br>VS<br>' + event.player2;
                eventDiv.appendChild(players_h6);

                if (event.gamename != null){
                    name_h6 = document.createElement('h6');
                    name_h6.className = 'game-name';
                    name_h6.innerHTML = event.gamename;
                    eventDiv.appendChild(name_h6);
                }

                tbody.appendChild(eventDiv);
            }
        } 

        mainTable.appendChild(tbody);  
        this._noEventNotif(mainTable);
        return mainTable; 

    },

    _noEventNotif: function(mainTable){
        let popupEventNotif = document.createElement('div');
        popupEventNotif.className = 'event-popup';
        popupWordEvent = document.createElement('span');
        popupWordEvent.className = 'event-popup-word'
        popupEventNotif.appendChild(popupWordEvent);
        
        if (this.startDate.getTime() - 86400000 > this.gamePlanner.latestTime.getTime()){
            popupWordEvent.innerHTML = 'No Future Events';
            mainTable.appendChild(popupEventNotif);
            return true;
        }
        
        if ((this.showByWeeks == true && this.startDate.getTime() +  86400000*7 < this.gamePlanner.earliestTime.getTime()) || (this.showByWeeks == false && this.startDate.getTime() + 86400000 < this.gamePlanner.earliestTime.getTime())){
            popupWordEvent.innerHTML = 'No Earlier Events';
            mainTable.appendChild(popupEventNotif);
            return true
        }
        return false;

    },

    _sortEventsByTime: function(eventList) {
        return eventList.sort(function (a, b) {
            return a.startTime.getTime() - b.startTime.getTime();
          });
    },

    _displayTableByDays: function() {
        const dayMainDiv = document.createElement('div');
        dayMainDiv.id = 'day-table';
        let filterDateEvents = this._filterEventsWithDate(this.startDate);
        let sortedByDateEvents = this._sortEventsByTime(filterDateEvents);
        let event;
        for (event of sortedByDateEvents){
            dayMainDiv.appendChild(this._displayEachEventDays(event));
        }
        let appendResult = this._noEventNotif(dayMainDiv);
        if (appendResult == false && sortedByDateEvents.length == 0){
            let noDayEvent = document.createElement('div');
            noDayEvent.innerHTML = "There is no event today";
            noDayEvent.className = 'no-day-event';
            dayMainDiv.appendChild(noDayEvent);
        }
        return dayMainDiv;
    },

    _displayEachEventDays: function(event) {
        let eventDivDay = document.createElement('div');
        eventDivDay.className = 'event-day-div';
        let playersDiv = document.createElement('div');
        playersDiv.className = 'player-day-div';
        playersDiv.innerHTML = event.player1 + ' VS ' + event.player2;
        let timeDiv = document.createElement('div');
        timeDiv.className = 'time-day-div';
        eventStartTime = new Date(event.startTime.getTime() - (event.startTime.getTimezoneOffset() * 60000)).toISOString().split('T')[1].split('.')[0];
        eventEndTime = new Date(event.startTime.getTime() + event.duration*3600000- (event.startTime.getTimezoneOffset() * 60000)).toISOString().split('T')[1].split('.')[0];
        timeDiv.innerHTML = eventStartTime + '~' + eventEndTime;
        eventDivDay.append(timeDiv);
        if (event.location) {
            let locationDiv = document.createElement('div');
            locationDiv.className = 'location-day-div';
            locationDiv.innerHTML = event.location;
            eventDivDay.append(locationDiv);
        }
        eventDivDay.append(playersDiv);
        
        if (event.type) {
            let typeDiv = document.createElement('div');
            typeDiv.className = 'type-day-div';
            typeDiv.innerHTML = event.type;
            eventDivDay.append(typeDiv);
        }
        if (event.gamename) {
            let gamenameDiv = document.createElement('div');
            gamenameDiv.className = 'gamename-day-div';
            gamenameDiv.innerHTML = event.gamename;
            eventDivDay.append(gamenameDiv);
        }
        if (event.detail) {
            let detailDiv = document.createElement('div');
            detailDiv.className = 'detail-day-div';
            detailButton = document.createElement('button');
            detailButton.innerHTML = 'Event Details';
            detailButton.className = 'event-detail-button btn btn-outline-dark btn-sm';
            detailButton.addEventListener('click', () => {
                this._createEventInfoPopup(false, event.detail, eventDivDay);
            })
            detailDiv.append(detailButton);
            eventDivDay.append(detailDiv);

        }
        if (event.win) {
            let resultDiv = document.createElement('div');
            resultDiv.className = 'result-day-div';
            let resultSpan = document.createElement('span');
            resultSpan.innerHTML = 'Winner: ' + event.win;
            resultDiv.appendChild(resultSpan);
            if (event.resultdetail) {
                let resultDetailSpan = document.createElement('span');
                let resultDetailButton = document.createElement('button');
                resultDetailButton.innerHTML = 'Result Details';
                resultDetailButton.className = 'result-detail-button btn btn-outline-dark btn-sm';
                resultDetailButton.addEventListener('click', () => {
                    this._createEventInfoPopup(true, event.resultdetail, eventDivDay);
                })
                resultDetailSpan.appendChild(resultDetailButton);
                resultDiv.appendChild(resultDetailSpan);
            }
            eventDivDay.append(resultDiv);
        }
        eventDivDay.style.setProperty('background-color', event.color);
        return eventDivDay;
    },

    _createEventInfoPopup(isResult, content, parentElement){
        let popupEventInfoDiv = document.createElement('div');
        popupEventInfoDiv.id = 'popup-event-info';
        let titleDiv = document.createElement('div');
        titleDiv.className = 'popup-title';
        if (isResult == true) {
            titleDiv.innerHTML = 'Result Details:'
        } else if (isResult == false) {
            titleDiv.innerHTML = 'Event Details: '
        }
        let contentDiv = document.createElement('div');
        contentDiv.className = 'popup-content';
        contentDiv.innerHTML = content;
        popupEventInfoDiv.appendChild(titleDiv);
        popupEventInfoDiv.appendChild(contentDiv);

        let closeButton = document.createElement('button');
        closeButton.className = 'close-button btn btn-danger btn-sm';
        closeButton.innerHTML = 'close';
        closeButton.addEventListener('click', () => {
            parentElement.removeChild(document.getElementById('popup-event-info'));
        })
        popupEventInfoDiv.appendChild(closeButton);

        parentElement.appendChild(popupEventInfoDiv);
    }
}


