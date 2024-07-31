function selectLevel(level, context) {
    addAction({
        type: "select_level",
        level: level
    }, context);
}

function enterWord(number, isDown, answer, context) {
    addAction({
        type: "enter_word",
        n: number,
        isDown: isDown,
        answer: answer
    }, context);
}

function check(context) {
    addAction({
        type: "check"
    }, context);
}

function deleteWord(number, isDown, context) {
    addAction({
        type: "delete_word",
        n: number,
        isDown: isDown,
    }, context);
}