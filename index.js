const input = document.getElementById("input");
const output = document.getElementById("output");

output.innerText = "empty";
output.onclick = onRemove;

const KEYBOARD_KEY__ENTER = "Enter";

const listofTodo = [];

function onRemove(event) {
  console.log("> onRemove -> event", event.target.dataset.id);
  const index = event.target.dataset.id;

  if (index === undefined) {
    console.log("undefined"); 
  } else if (index.includes("edit_")) { 
    var index_edit = index.replace("edit_", ""); 
    console.log("edit ->", index_edit);
    document
      .getElementById(`edit_input_${index_edit}`)
      .removeAttribute("hidden"); 
    document
      .getElementById(`edit_button_${index_edit}`)
      .setAttribute("hidden", "true");
  } else if (index.includes("ok_")) { 
    var index_ok = index.replace("ok_", ""); 
    var input_text = document.getElementById(`input_${index_ok}`);
    var todo_text = document.getElementById(`todo_text_${index_ok}`); 
    listofTodo[Number(index_ok)] = input_text.value; 
    todo_text.innerText = `${Number(index_ok) + 1}. ${input_text.value}`;
    document
      .getElementById(`edit_input_${index_ok}`)
      .setAttribute("hidden", "true");
    document
      .getElementById(`edit_button_${index_ok}`)
      .removeAttribute("hidden");
  } else if (index.includes("delete_")) {
    var index_delete = index.replace("delete_", "");
    listofTodo.splice(index_delete, 1);
    document.getElementById(`todo_${index_delete}`).remove(); 
  } else {
    console.log(event);
  }
}

input.onkeyup = function (event) {
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
<div style='float: left;'>
<button data-id='delete_${index}'>x</button>
</div>
<div id='todo_text_${index}', style='float: left;'>${index + 1}. ${value}</div>
<div style='float: left;', id='edit_button_${index}'>
<button data-id=edit_${index}>edit</button>
</div>
<div hidden='true', id='edit_input_${index}', style='float: left;'>
<input id='input_${index}' />
<button data-id=ok_${index}>ok</button>
</div>
</div>
</br>
`;
        })
        .toString();
    }

    input.value = "";
  }
};