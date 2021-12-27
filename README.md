# nono
An open source nonogram implementation built with Ionic 5 and Angular 12. 
Also uses [jakearchibald's IndexedDB Promise Wrapper](https://github.com/jakearchibald/idb).

This implementation is a PWA. You can try it out [here](https://nono-59f85.web.app/).

## Features
 - high granularity of difficulties
 - customizable grid size
 - customizable theme (accent color can be changed)
 - customizable error limit (can be disabled entirely)
 - rudimentary score system (can be disabled)

## Todos
 - fix auto line clearing, seems to be somewhat inconsistent
 - improve performance of checking the game state (executed after every move)
 - fix bug: accent color is black (instead of Ionic's default blue) initially
 - add setting to disable auto line clearing
 - add setting to customize error limits, i.e. allow more than 3 errors
 - more sensible score system


Feel free to report any issues or to submit pull requests 
