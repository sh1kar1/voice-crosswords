# Voice Crosswords

**Crossword webapp with SberSalute voice assistant, created with TypeScript & React**

https://developers.sber.ru/link/hWAUaBy

![](./assets/demo.png)

<details>

<summary>Table of Contents</summary>

- [Overview](#overview)
    - [Description](#description)
    - [Features](#features)
    - [Demonstration](#demonstration)
- [Installation](#installation)
    - [Requirements](#requirements)
        - [Languages](#languages)
        - [Dependencies](#dependencies)
        - [Tools](#tools)
    - [Steps](#steps)
- [Usage](#usage)
    - [Hotkeys](#hotkeys)
    - [Commands](#commands)
- [Authors](#authors)
- [License](#license)

</details>

---

## Overview

### Description

Voice Crosswords is an interactive web application that allows users to solve crosswords using both keyboard and voice commands.
The app is integrated with the SberSalute voice assistant providing a seamless user experience.
It is designed to run on smart TVs and other smart devices compatible with SberSalute.

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

![](./assets/demo.gif)

## Installation

### Requirements

#### Languages

- [TypeScript](https://www.typescriptlang.org/)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

#### Dependencies

- [React](https://react.dev/)
- [styled-components](https://styled-components.com/)
- [SaluteJS](https://developers.sber.ru/portal/products/salutejs)
- [PlasmaUI](https://developers.sber.ru/docs/ru/va/canvas/step-by-step/interface/plasma)

#### Tools

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Steps

1. Install the required [tools](#tools)
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
