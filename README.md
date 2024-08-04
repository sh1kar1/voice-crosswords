# Voice Crosswords

**Crossword webapp for Sber smart TVs with Salute voice assistant created using TypeScript & React**

<details>

<summary>Table of Contents</summary>

- [Overview](#overview)
    - [Features](#features)
    - [Demonstration](#demonstration)
- [Usage](#usage)
    - [Link](#link)
    - [Hotkeys](#hotkeys)
    - [Commands](#commands)
- [Authors](#authors)
- [License](#license)

</details>

---

## Overview

### Features

- Render crossword from a JSON file
- Select level via menu
- Navigation using keyboard or voice
- Letter-by-letter word input and deletion using the keyboard
- Voice input and deletion of the whole word if possible
- Solution check with mistake highlighting
- Visual aids
- Sber design

### Demonstration

![Menu](./assets/menu.png)
![Crossword](./assets/crossword.png)

## Usage

### Link

https://developers.sber.ru/link/hWAUaBy

### Hotkeys

|            Key             | Usage                |
|:--------------------------:|----------------------|
| `LBM` \| `Arrows` \| `Tab` | select level or cell |
|        `Backspace`         | backward delete      |
|          `Space`           | forward delete       |
|          `Enter`           | check solution       |
|           `Esc`            | back to menu         |

### Commands

|                    Command                    | Usage          |
|:---------------------------------------------:|----------------|
|           `открой <номер> уровень`            | select level   |
| `<номер> по <вертикали\|горизонтали> <слово>` | enter word     |
|  `удали <номер> по <вертикали\|горизонтали>`  | delete word    |
|                   `проверь`                   | check solution |
|                `выбор уровня`                 | back to menu   |

## Authors

|                                Name                                | Contribution |
|:------------------------------------------------------------------:|--------------|
|       [Sh1kar1 (Nikita Kablov)](https://github.com/Sh1kar1)        | frontend     |
| [lopatkinanton (Anton Lopatkin)](https://github.com/lopatkinanton) | backend      |
|       [mob1324 (Andrew Pinkas)](https://github.com/mob1324)        | parsing      |

## License

Distributed under the Unlicense license - see [LICENSE](./LICENSE) for more information

_This project was completed as part of studies at [NUST MISIS](https://en.misis.ru/) in the Applied Mathematics program_
