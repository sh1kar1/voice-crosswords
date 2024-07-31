require: slotfilling/slotFilling.sc
  module = sys.zb-common
  
require: js/getters.js
require: js/reply.js
require: js/actions.js

patterns:
    $AnyText = $nonEmptyGarbage
    $word = $oneWord
    $cardinal = @duckling.number
    $ordinal = @duckling.ordinal
    $direction = (([по] вертикал* | [по] ~вертикаль):1 | ([по] горизонтал* | [по] ~горизонталь):0)

theme: /
    state: Start
        q!: $regex</start>
        q!: (запусти | открой | вруби | включи)  (кроссворды | классические кроссворды)
        
        script:
            if ($context.request && $context.request.rawRequest && $context.request.rawRequest.payload && $context.request.rawRequest.payload.character &&
                $context.request.rawRequest.payload.character.appeal === "no_official") {
                $reactions.answer('Привет! В этом смартапе любители кроссвордов могут проверить свою логику и эрудицию. Чтобы начать, выбери уровень.');
            } else {
                $reactions.answer('Приветствую! В этом смартапе любители кроссвордов могут проверить свою логику и эрудицию. Чтобы приступить к решению, выберите уровень.');
            }
            
        
        go!: /Menu
            
    state: Menu
        script:
            log(get_level($request))
            addSuggestions(["Первый", "Открой первый уровень", "Выйти"], $context)
    
        state: HelpMenu
            q: * (*помощ* | умееш* | можеш* | помог* | подска*) *
            if: $request.rawRequest.payload.character.appeal === "no_official"
                a: В этом смартапе любители кроссвордов могут проверить свою логику и эрудицию. Для того, чтобы перейти к решению кроссворда - выбери уровень, воспользовавшись фразой на основе подсказок.
            else:
                a: В этом смартапе любители кроссвордов могут проверить свою логику и эрудицию. Для того, чтобы перейти к решению кроссворда - выберите уровень, воспользовавшись фразой на основе подсказок.
            go!: /Menu
            
        state: LevelSelect 
            q: [открой | запусти | включи]  ($ordinal::level уровень | уровень $ordinal::level | уровень $cardinal::level | $ordinal::level)
            script:
                selectLevel($parseTree._level, $context)
            
        state: FailedToSelectLevel
            event!: no_such_level
            script:
                if ($context.request && $context.request.rawRequest && $context.request.rawRequest.payload && $context.request.rawRequest.payload.character &&
                    $context.request.rawRequest.payload.character.appeal === "no_official") {
                    $reactions.answer('Такого уровня нет. Попробуй еще раз.');
                } else {
                    $reactions.answer('Такого уровня нет. Попробуйте еще раз.');
                }
            
            go!: /Menu
            
        state: LevelSelectSuccess
            event!: level_select_success
            
            if: $context.request.data.eventData.value === 0
                go!: /Menu
            else: 
                a: открываю {{$context.request.data.eventData.value}} уровень
                go!: /Solution
            
   
            
    state: Solution
        
        script:
            addSuggestions(["Девятый по вертикали - интеллект", "Проверить", "Удали первое по горизонтали", "Выбор уровня", "Выйти"], $context)
                        
                        
        state: WordEnter
            q:  ($ordinal::number | $cardinal::number) $direction::isDown $word::answer 
            script:
                enterWord($parseTree._number, $parseTree._isDown, $parseTree._answer, $context) 
            go!: /Solution

        state: FailedToEnterWord
            event!: failed_to_enter_word
            script:
                var eventData = $context && $context.request && $context.request.data && $context.request.data.eventData || {}
                if ($context.request && $context.request.rawRequest && $context.request.rawRequest.payload && $context.request.rawRequest.payload.character &&
                    $context.request.rawRequest.payload.character.appeal === "no_official") {
                    $reactions.answer('Не удалось ввести слово ' + eventData.value + '. Убедись, что вводимое слово подходит по размеру и не противоречит пересекающимся словам.');
                } else {
                    $reactions.answer('Не удалось ввести слово ' + eventData.value + '. Убедитесь, что вводимое слово подходит по размеру и не противоречит пересекающимся словам.');
                }
            go!: /Solution
            
            
        state: Check
            q: (~проверить | провер*)
            script:
                check($context);
            go!: /Solution
            
        state: Mistakes
            event!: mistakes
            if: $request.rawRequest.payload.character.appeal === "no_official"
                a: По результатам проверки ошибки выделяются красным. Продолжай решать!
            else: 
                a: По результатам проверки ошибки выделяются красным. Продолжайте решать!
            go!: /Solution
            
        state: AllCorrectContinue
            event!: all_correct_continue
            if: $request.rawRequest.payload.character.appeal === "no_official"
                a: Все верно! Продолжай в том же духе!
            else: 
                a: Все верно! Продолжайте в том же духе!
            go!: /Solution
        
        state: AllCorrectFinish
            event!: all_correct_finish
            if: $request.rawRequest.payload.character.appeal === "no_official"
                a: Поздравляю! Ты решил кроссворд!
            else: 
                a: Поздравляю! Вы решили кроссворд!
            go!: /Solution
            
            
        state: DeleteWord
            q: ( *удал* | ~убирать | убер* | ~очистить | *чист* |  ~стирать | сотр* ) ($ordinal::number | $cardinal::number) $direction::isDown
            script:
                deleteWord($parseTree._number, $parseTree._isDown, $context) 
            go!: /Solution
            
        state: FailedToDelete
            event!: failed_to_delete
            if: $request.rawRequest.payload.character.appeal === "no_official"
                a: Не удалось удалить указанное слово. Попробуй сказать команду ещё раз.
            else: 
                a: Не удалось удалить указанное слово. Попробуйте сказать команду ещё раз.
            go!: /Solution
            
                    
        state: HelpSolution
            q: * (*помощ* | умееш* | можеш* | помог* | подска*) *
            
            script:
                if ($context.request && $context.request.rawRequest && $context.request.rawRequest.payload && $context.request.rawRequest.payload.character &&
                    $context.request.rawRequest.payload.character.appeal === "no_official") {
                    $reactions.answer('В этом смартапе любители кроссвордов могут проверить свою логику и эрудицию. Чтобы ввести ответ скажи команду на основе подсказок.');
                } else {
                    $reactions.answer('В этом смартапе любители кроссвордов могут проверить свою логику и эрудицию. Для ввода ответов скажите ответ на основе фразы из подсказок.');
                }
            go!: /Solution
                
                
        state: ManualBackToMenu
            event!: back_to_menu
            go!: /Menu        
            
        state: BackToMenu
            q: ~Выбор ~уровень
            script:
                selectLevel(0, $context)
            go!: /Menu
            
            
        state: LocalFallback || noContext=True
            event!: noMatch
            if: $request.rawRequest.payload.character.appeal === "no_official"
                a: Команда не распознана. Попробуй повторить голосовой ввод, воспользовавшись подсказками.    
            else:
                a: Команда не распознана. Попробуйте повторить голосовой ввод, воспользовавшись подсказками.
            go!: /Solution
            
            
    state: Fallback || noContext=True
        event!: noMatch
        if: $request.rawRequest.payload.character.appeal === "no_official"
            a: Команда не распознана. Попробуй повторить голосовой ввод, воспользовавшись подсказками.    
        else:
            a: Команда не распознана. Попробуйте повторить голосовой ввод, воспользовавшись подсказками.
        go!: /Menu