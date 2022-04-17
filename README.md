# Game Event Planner Library
## Overview
This library’s main purpose is to show sport games’ information in a decent way. The sport games information includes games name (eg. NBA), time, duration, competing players/teams, type of sports, location/platforms, and game results for past games. The information will be shown with a table by weeks or days. Weeks table only include players and games name (if exists). Days table will display all information of the events. End users can choose to display either Week table of Day table. For either past or future events, they can click ‘last’ and ‘next’ to flip pages to see events for different weeks or days. They can also filter events, such as by game name, players/teams, type of sports, location/platforms, and time. For events that have result details or event details,they can click on the related button on the event (in Day table) to see the contents. It would be useful for developers since the minimum things they need to do is just to provide events data, and the table and all related functionalities will be created automatically. 

## Main Features
### Developer Side:
1. They can add and remove events to the objects by calling ‘addEvent/remove
Event’ API. Players to compete and event time is required parameters, and
they can input other optional parameters with in the ‘options’ dictionary.
2. They can set the Planner name by calling ‘setTableName’ API.
3. The default filter is ‘players’. However, they can choose to add and remove
filters for their end users to filter events they want.
4. They can display the Sports Game Planner in the place they want by passing in
the container.
- User Side:
1. They can see sport games event in a ‘Weekly’ and 'Daily' calendar table.
2. The default table shown up is current week/today. They can flip pages by clicking ‘last’ and ‘next’ to see past and future events. The ‘Starts From: xxx’ will update as users flip pages or select Date directly. NOTE: when selecting date, 'Starts From' for Week table will show up as Sunday of the week, for Day table, it will be selected date. 
3. Users can filter events by selecting variables that developers set for them,
operators (including ‘exists’, 'doesn't exist', ‘is’, ‘is not’, 'contain', 'doesn't contain' for alpha phase), and typing in values in the text input. (NOTE: users don’t need to type in text input if they choose ‘exists’ as operators). They can also click ‘add filter’ if they want to add more filters for their events, or click ‘remove’ to remove extra filters.
4. Users can change color of event block by clicking the color input besides the 'change color' text. NOTE: when changing color, all current filtered events' color will be changed (including events from other days or weeks). Both Week and Day table events' color will be updated.


# Links
Landing Page: https://game-planner.herokuapp.com/
Documentation Page: https://game-planner.herokuapp.com/developer-document.html
Example Page: https://game-planner.herokuapp.com/examples.html
Example Code: https://game-planner.herokuapp.com/examples.js
Library Code: https://game-planner.herokuapp.com/game-planner.js

# Copyright:
This README.md is written by @YiyunDing