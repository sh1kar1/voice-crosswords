// Levels.ts
// contains levels (crosswords) as arrays of words (for details check interface 'Word' in the 'Crossword.ts')
// the lines before the arrays contain links to crosswords sources
// to add a new level you just need to create an array here and add it to 'levels' in the 'App.tsx'
// for best results the sizes (rows x cols) of the crosswords should be from 10x10 to 20x20 (but not necessary square)

// https://www.scanword.info/online_cross/1325
export const l1 = [
  {
    "n": 1,
    "text": "слепыш",
    "desc": "Незрячий грызун, но не крот",
    "col": 0,
    "row": 0,
    "isDown": true
  },
  {
    "n": 1,
    "text": "силач",
    "desc": "Гнёт подкову, как калач",
    "col": 0,
    "row": 0,
    "isDown": false
  },
  {
    "n": 2,
    "text": "лосины",
    "desc": "Кожаные колготки бравого гусара",
    "col": 2,
    "row": 0,
    "isDown": true
  },
  {
    "n": 3,
    "text": "чушь",
    "desc": "Глупость, что можно городить",
    "col": 4,
    "row": 0,
    "isDown": true
  },
  {
    "n": 4,
    "text": "клоака",
    "desc": "Канализация Древнего Рима",
    "col": 6,
    "row": 0,
    "isDown": true
  },
  {
    "n": 5,
    "text": "удавка",
    "desc": "Узел, завязанный боцманом",
    "col": 8,
    "row": 0,
    "isDown": true
  },
  {
    "n": 6,
    "text": "саго",
    "desc": "Крупа из сердцевины пальмы",
    "col": 10,
    "row": 0,
    "isDown": true
  },
  {
    "n": 6,
    "text": "стояк",
    "desc": "Вертикальный брус, служащий опорой",
    "col": 10,
    "row": 0,
    "isDown": false
  },
  {
    "n": 7,
    "text": "оконце",
    "desc": "Смотровое отверстие в деревенской избе",
    "col": 12,
    "row": 0,
    "isDown": true
  },
  {
    "n": 8,
    "text": "квакша",
    "desc": "Лягушка, сидящая на ветке",
    "col": 14,
    "row": 0,
    "isDown": true
  },
  {
    "n": 9,
    "text": "укладка",
    "desc": "Процесс обретения причёской формы",
    "col": 4,
    "row": 1,
    "isDown": false
  },
  {
    "n": 10,
    "text": "паинька",
    "desc": "Ребёнок, не создающий проблем родителям",
    "col": 0,
    "row": 3,
    "isDown": false
  },
  {
    "n": 11,
    "text": "вторник",
    "desc": "Первый лёгкий день недели",
    "col": 8,
    "row": 3,
    "isDown": false
  },
  {
    "n": 12,
    "text": "шлык",
    "desc": "Колпак казачьей папахи",
    "col": 0,
    "row": 5,
    "isDown": false
  },
  {
    "n": 13,
    "text": "лавка",
    "desc": "Супермаркет в сельской местности",
    "col": 1,
    "row": 5,
    "isDown": true
  },
  {
    "n": 14,
    "text": "кулик",
    "desc": "Патриотическая болотная птица",
    "col": 3,
    "row": 5,
    "isDown": true
  },
  {
    "n": 15,
    "text": "затон",
    "desc": "Природное образование на реке",
    "col": 5,
    "row": 5,
    "isDown": true
  },
  {
    "n": 15,
    "text": "завал",
    "desc": "Преграда для спелеолога",
    "col": 5,
    "row": 5,
    "isDown": false
  },
  {
    "n": 16,
    "text": "леший",
    "desc": "Дух из чащи, недолюбливающий людей",
    "col": 9,
    "row": 5,
    "isDown": true
  },
  {
    "n": 17,
    "text": "вирус",
    "desc": "Опасная компьютерная зараза",
    "col": 11,
    "row": 5,
    "isDown": true
  },
  {
    "n": 17,
    "text": "вега",
    "desc": "Самая яркая звезда на северном небе",
    "col": 11,
    "row": 5,
    "isDown": false
  },
  {
    "n": 18,
    "text": "гуппи",
    "desc": "Аквариумная порода рыб",
    "col": 13,
    "row": 5,
    "isDown": true
  },
  {
    "n": 19,
    "text": "валет",
    "desc": "Юнец, побитый дамой",
    "col": 1,
    "row": 7,
    "isDown": false
  },
  {
    "n": 20,
    "text": "шуруп",
    "desc": "Гвоздь, который закручивают",
    "col": 9,
    "row": 7,
    "isDown": false
  },
  {
    "n": 21,
    "text": "бакшиш",
    "desc": "Взятка для татарина",
    "col": 0,
    "row": 9,
    "isDown": true
  },
  {
    "n": 21,
    "text": "барк",
    "desc": "Судно с косыми парусами",
    "col": 0,
    "row": 9,
    "isDown": false
  },
  {
    "n": 22,
    "text": "ролики",
    "desc": "Коньки для тёплой погоды",
    "col": 2,
    "row": 9,
    "isDown": true
  },
  {
    "n": 23,
    "text": "нищий",
    "desc": "Хозяин котомки на паперти",
    "col": 5,
    "row": 9,
    "isDown": false
  },
  {
    "n": 24,
    "text": "иранец",
    "desc": "Абориген современной Персии",
    "col": 6,
    "row": 9,
    "isDown": true
  },
  {
    "n": 25,
    "text": "ирония",
    "desc": "Родная сестра сарказма",
    "col": 8,
    "row": 9,
    "isDown": true
  },
  {
    "n": 26,
    "text": "слип",
    "desc": "Наклонная площадка сейнера",
    "col": 11,
    "row": 9,
    "isDown": false
  },
  {
    "n": 27,
    "text": "латник",
    "desc": "Рыцарь в тяжёлых доспехах",
    "col": 12,
    "row": 9,
    "isDown": true
  },
  {
    "n": 28,
    "text": "пиетет",
    "desc": "Глубокое уважение, благоговение",
    "col": 14,
    "row": 9,
    "isDown": true
  },
  {
    "n": 29,
    "text": "колядка",
    "desc": "Песня, исполняемая на Святки",
    "col": 0,
    "row": 11,
    "isDown": false
  },
  {
    "n": 30,
    "text": "джут",
    "desc": "Из него в индии вьют верёвки",
    "col": 4,
    "row": 11,
    "isDown": true
  },
  {
    "n": 31,
    "text": "отбытие",
    "desc": "Начало путешествия устами бывалого вояки",
    "col": 8,
    "row": 11,
    "isDown": false
  },
  {
    "n": 32,
    "text": "боец",
    "desc": "Тот, кто активно борется за победу",
    "col": 10,
    "row": 11,
    "isDown": true
  },
  {
    "n": 33,
    "text": "убежище",
    "desc": "Оно обычно находится под землёй",
    "col": 4,
    "row": 13,
    "isDown": false
  },
  {
    "n": 34,
    "text": "штифт",
    "desc": "Крепёжный стержень",
    "col": 0,
    "row": 14,
    "isDown": false
  },
  {
    "n": 35,
    "text": "цукат",
    "desc": "Плод, сваренный в сахарном сиропе",
    "col": 10,
    "row": 14,
    "isDown": false
  }
]

// https://www.scanword.info/online_cross/97
export const l2 = [
  {
    "n": 2,
    "text": "каботаж",
    "desc": "Судоходство вдоль берега",
    "col": 4,
    "row": 0,
    "isDown": false
  },
  {
    "n": 7,
    "text": "радио",
    "desc": "Говорит, но не показывает",
    "col": 0,
    "row": 1,
    "isDown": false
  },
  {
    "n": 8,
    "text": "испуг",
    "desc": "Первая реакция на привидение",
    "col": 10,
    "row": 1,
    "isDown": false
  },
  {
    "n": 9,
    "text": "квинтет",
    "desc": "Пять человек как один музыкальный ансамбль",
    "col": 4,
    "row": 2,
    "isDown": false
  },
  {
    "n": 10,
    "text": "танго",
    "desc": "Танец, исполняемый с розой в зубах",
    "col": 0,
    "row": 3,
    "isDown": false
  },
  {
    "n": 12,
    "text": "образ",
    "desc": "Характер, созданный на сцене",
    "col": 10,
    "row": 3,
    "isDown": false
  },
  {
    "n": 15,
    "text": "жор",
    "desc": "Период необыкновенного аппетита у обитателей пруда",
    "col": 6,
    "row": 4,
    "isDown": false
  },
  {
    "n": 16,
    "text": "покои",
    "desc": "Спальня в хоромах царя",
    "col": 2,
    "row": 5,
    "isDown": false
  },
  {
    "n": 18,
    "text": "яхонт",
    "desc": "Рубин в народной словесности",
    "col": 8,
    "row": 5,
    "isDown": false
  },
  {
    "n": 20,
    "text": "курс",
    "desc": "Он есть у доллара, корабля и партии",
    "col": 0,
    "row": 7,
    "isDown": false
  },
  {
    "n": 21,
    "text": "обмен",
    "desc": "Бартер на уровне квартир",
    "col": 5,
    "row": 7,
    "isDown": false
  },
  {
    "n": 22,
    "text": "удав",
    "desc": "Пресмыкающийся напарник некоторых уличных фотографов",
    "col": 11,
    "row": 7,
    "isDown": false
  },
  {
    "n": 23,
    "text": "ирбис",
    "desc": "Барс, не мыслящий свою жизнь без снега",
    "col": 2,
    "row": 9,
    "isDown": false
  },
  {
    "n": 25,
    "text": "задир",
    "desc": "Заусенец на древесине",
    "col": 8,
    "row": 9,
    "isDown": false
  },
  {
    "n": 26,
    "text": "фен",
    "desc": "\"Ветер\" в руках парикмахера",
    "col": 6,
    "row": 10,
    "isDown": false
  },
  {
    "n": 27,
    "text": "слайд",
    "desc": "Фотография для \"сквозного\" просмотра",
    "col": 0,
    "row": 11,
    "isDown": false
  },
  {
    "n": 30,
    "text": "птица",
    "desc": "Каждая участница самого шумного в мире базара",
    "col": 10,
    "row": 11,
    "isDown": false
  },
  {
    "n": 32,
    "text": "изнанка",
    "desc": "\"Нутро\" свитера, что ближе всего к телу",
    "col": 4  ,
    "row": 12,
    "isDown": false
  },
  {
    "n": 33,
    "text": "тесло",
    "desc": "Плотницкий топор",
    "col": 0,
    "row": 13,
    "isDown": false
  },
  {
    "n": 34,
    "text": "рубеж",
    "desc": "Граница, разделяющая века",
    "col": 10,
    "row": 13,
    "isDown": false
  },
  {
    "n": 35,
    "text": "доспехи",
    "desc": "Боевой наряд рыцаря - участника турнира",
    "col": 4,
    "row": 14,
    "isDown": false
  },
  {
    "n": 1,
    "text": "чача",
    "desc": "Водка с родины Мимино",
    "col": 1,
    "row": 0,
    "isDown": true
  },
  {
    "n": 2,
    "text": "коко",
    "desc": "\"Кличка\" мадам Шанель",
    "col": 4,
    "row": 0,
    "isDown": true
  },
  {
    "n": 3,
    "text": "бриджи",
    "desc": "Уже не шорты, но ещё не брюки",
    "col": 6,
    "row": 0,
    "isDown": true
  },
  {
    "n": 4,
    "text": "тетеря",
    "desc": "Незадачливый лентяй",
    "col": 8,
    "row": 0,
    "isDown": true
  },
  {
    "n": 5,
    "text": "жито",
    "desc": "Всякий хлеб в зерне или на корню",
    "col": 10,
    "row": 0,
    "isDown": true
  },
  {
    "n": 6,
    "text": "пуща",
    "desc": "Беловежская достопримечательность с зубрами",
    "col": 13,
    "row": 0,
    "isDown": true
  },
  {
    "n": 10,
    "text": "танцкласс",
    "desc": "Аудитория хореографа",
    "col": 0,
    "row": 3,
    "isDown": true
  },
  {
    "n": 11,
    "text": "глоссарий",
    "desc": "Собрание непонятных слов и выражений",
    "col": 3,
    "row": 3,
    "isDown": true
  },
  {
    "n": 13,
    "text": "бандурист",
    "desc": "Украинский народный музыкант",
    "col": 11,
    "row": 3,
    "isDown": true
  },
  {
    "n": 14,
    "text": "занавеска",
    "desc": "Полотнище, закрывающее окно",
    "col": 14,
    "row": 3,
    "isDown": true
  },
  {
    "n": 17,
    "text": "овощи",
    "desc": "Рагу минус мясо",
    "col": 5,
    "row": 5,
    "isDown": true
  },
  {
    "n": 19,
    "text": "ханжа",
    "desc": "Лицемер, прикрывающийся показной добродетелью",
    "col": 9,
    "row": 5,
    "isDown": true
  },
  {
    "n": 24,
    "text": "сфинкс",
    "desc": "Безносый охранник пирамид",
    "col": 6,
    "row": 9,
    "isDown": true
  },
  {
    "n": 25,
    "text": "знание",
    "desc": "Умственный эквивалент силы",
    "col": 8,
    "row": 9,
    "isDown": true
  },
  {
    "n": 28,
    "text": "лжец",
    "desc": "\"Брехун\", но не так обидно",
    "col": 1,
    "row": 11,
    "isDown": true
  },
  {
    "n": 29,
    "text": "диод",
    "desc": "Прибор с парой электродов",
    "col": 4,
    "row": 11,
    "isDown": true
  },
  {
    "n": 30,
    "text": "пари",
    "desc": "Причина кругосветного вояжа Филеаса Фогга",
    "col": 10,
    "row": 11,
    "isDown": true
  },
  {
    "n": 31,
    "text": "цвет",
    "desc": "Изменчивая особенность хамелеона",
    "col": 13,
    "row": 11,
    "isDown": true
  }
]

// TODO
export const l3 = [
  {
    "n": 1,
    "text": "-",
    "desc": "-",
    "col": 0,
    "row": 0,
    "isDown": true
  },
]

// TODO
export const l4 = [
  {
    "n": 1,
    "text": "-",
    "desc": "-",
    "col": 0,
    "row": 0,
    "isDown": true
  },
]

// TODO
export const l5 = [
  {
    "n": 1,
    "text": "-",
    "desc": "-",
    "col": 0,
    "row": 0,
    "isDown": true
  },
]

// TODO
export const l6 = [
  {
    "n": 1,
    "text": "-",
    "desc": "-",
    "col": 0,
    "row": 0,
    "isDown": true
  },
]

// TODO
export const l7 = [
  {
    "n": 1,
    "text": "-",
    "desc": "-",
    "col": 0,
    "row": 0,
    "isDown": true
  },
]

// TODO
export const l8 = [
  {
    "n": 1,
    "text": "-",
    "desc": "-",
    "col": 0,
    "row": 0,
    "isDown": true
  },
]

// TODO
export const l9 = [
  {
    "n": 1,
    "text": "-",
    "desc": "-",
    "col": 0,
    "row": 0,
    "isDown": true
  },
]

// TODO
export const l10 = [
  {
    "n": 1,
    "text": "-",
    "desc": "-",
    "col": 0,
    "row": 0,
    "isDown": true
  },
]
