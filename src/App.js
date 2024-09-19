import { useState } from "react";
import List from "./component/List";

function App() {
  const [allTodo, setAllTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    if (!inputValue.trim()) {
      return;
    }
    setAllTodo([...allTodo, { text: inputValue, isComplete: false }]);
    setInputValue("");
  };

  const editTodo = (index, newValue) => {
    const newTodo = allTodo.map((eachTodo, i) => {
      if (i === index) {
        return { ...eachTodo, text: newValue };
      }
      return eachTodo;
    });
    setAllTodo(newTodo);
  };

  const deleteTodo = (index) => {
    const newTodo = allTodo.filter((_, i) => i !== index);
    setAllTodo(newTodo);
  };

  const toggleComplete = (index) => {
    const updatedTodos = allTodo.map((eachTodo, i) => {
      if (i === index) {
        return { ...eachTodo, isComplete: !eachTodo.isComplete };
      }
      return eachTodo;
    });
    setAllTodo(updatedTodos);
  };
  const filteredTodos = allTodo.filter((eachTodo) => {
    if (filter === "active") return !eachTodo.isComplete;
    if (filter === "completed") return eachTodo.isComplete;
    return true;
  });
  return (
    <div>
      <div className="bg-slate-700 h-screen shadow-sm shadow-black md:mx-80 mx-4 md:mt-10 mt-20 pb-10 ">
        <div className="mx-8 ">
          <div className="flex justify-between items-center pt-4">
            <h1 className="text-3xl text-white ">USE TODOS</h1>
            <img
              src="https://cdn3.iconfinder.com/data/icons/business-office/256/To-do_List-1024.png"
              alt=""
              className="h-12 w-12 object-contain"
            />
          </div>
          <hr className="mt-4" />
          <h1 className="text-center text-xl p-2">What are your tasks?</h1>
          <input
            type="text"
            className="w-full h-12 border-2 border-blue-600 "
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="w-full bg-blue-300 mt-2 p-2 font-bold"
            onClick={addTodo}
          >
            Add
          </button>

          <div className="flex mx-6 mt-2 justify-between gap-2 ">
            <button
              className={`border border-blue-200 w-full p-1 ${
                filter === "all" ? "bg-blue-600" : ""
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`border border-blue-200 w-full p-1 ${
                filter === "active" ? "bg-blue-600" : ""
              }`}
              onClick={() => setFilter("active")}
            >
              {" "}
              Active
            </button>
            <button
              className={`border border-blue-200 w-full p-1 ${
                filter === "completed" ? "bg-blue-600" : ""
              }`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>

          <h1 className="font-bold mt-4 mx-6 text-xl">
            {filteredTodos.length} tasks remaining
          </h1>
          <div>
            {filteredTodos.map((eachTodo, index) => (
              <List
                key={index}
                todo={eachTodo.text}
                isComplete={eachTodo.isComplete}
                onEdit={(newValue) => editTodo(index, newValue)}
                onDelete={() => deleteTodo(index)}
                onToggle={() => toggleComplete(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-center mt-4">
        Copyright:
        <a
          href="https://github.com/yusfit/todo-app"
          className="text-blue-600"
        >
          Fesomu Yusuf Ademola
        </a>
      </p>
    </div>
  );
}

export default App;