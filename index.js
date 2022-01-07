const input = document.getElementById("input");
const output = document.getElementById("output");

output.innerText = "empty";
output.onclick = onRemove;

const KEYBOARD_KEY__ENTER = "Enter";

const listofTodo = [];

function onRemove(event) {
    console.timeLog("> onRemove -> event", event.target.dataset.id);
    const index = event.target.dataset.id;
    listofTodo.splice(index, 1);
    document.getElementById(`todo_${index}`).remove();
}
input.onkeyup = function(event) {
    console.log(">onkeyup -> event", event);
    // console.log("> onkeyup - >input", input.value);
    if (event.code === KEYBOARD_KEY__ENTER) {
        const text = input.value;

        if (text.length > 0) {
            listofTodo.push(text);
            console.log(`>text = ${listofTodo}`);
            // output.innerText = listofTodo.join("\n");
            output.innerHTML = listofTodo
                .map((value, index) => {
                    console.log("> listOfTodo -> map", index, value);
                    return `
<div id='todo_${index}'>
<button data-id = '${index}'>x</button>
<span>${index + 1}. ${value}</span>
<button data-id=edit_${index}>edit</button>
</div>
`;
                })
                .toString();
        }

        input.value = "";
    }
};