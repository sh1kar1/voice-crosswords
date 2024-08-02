# Voice Crosswords

**Crossword webapp for smart TVs with SberSalute voice assistant created with TypeScript & React**

https://developers.sber.ru/link/hWAUaBy

![](./assets/preview.png)

<details>

<summary>Table of Contents</summary>

- [Overview](#overview)
    - [Features](#features)
    - [Demonstration](#demonstration)
- [Installation](#installation)
- [Usage](#usage)
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

![menu](./assets/menu.png)
![crossword](./assets/crossword.png)

## Installation

1. Install tools:
    - [Git](https://git-scm.com/)
    - [Node.js](https://nodejs.org/)
    - [npm](https://www.npmjs.com/)
2. Clone the repository:
    ```shell
    git clone https://github.com/Sh1kar1/voice-crosswords.git
    ```
3. Navigate to the project directory:
    ```shell
    cd voice-crosswords
    ```
4. Install dependencies:
    ```shell
    npm install
    ```
5. Start the web app:
    ```shell
    npm start
    ```
   After starting, the web app will be available at http://localhost:3000

> [!WARNING]
> The voice assistant will not work because a **secret API key** is required
>
> (`REACT_APP_TOKEN` in [.env](./.env))

## Usage

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
