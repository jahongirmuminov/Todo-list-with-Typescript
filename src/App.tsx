import React, { useState, ChangeEvent, useEffect } from "react";
import "./App.css";
import { ITask } from "./Interfaces";
import TodoTask from "./components/TodoTask";
const App: React.FC = () => {
	const [task, setTask] = useState<string>("");
	const [deadline, setDeadLine] = useState<number>(0);
	const [todoList, setTodoList] = useState<ITask[]>([]);

	const hadleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		if (event.target.name === "task") {
			setTask(event.target.value);
		} else {
			setDeadLine(Number(event.target.value));
		}
	};
	const addTask = (): void => {
		if (task !== "" && deadline !== 0) {
			const newTask = { taskName: task, deadline: deadline };
			const val = [...todoList, newTask];
			localStorage.setItem("items", JSON.stringify(val));
			setTodoList(val);
		}
		setTask("");
		setDeadLine(0);
	};

	useEffect(() => {
		const items = localStorage.getItem("items");
		setTodoList(JSON.parse(`${items}`) || []);
	}, []);

	const completeTask = (taksNameToDelete: string): void => {
		setTodoList(
			todoList.filter((task) => {
				return task.taskName !== taksNameToDelete;
			})
		);
	};
	return (
		<div className='App'>
			<div className='header'>
				<div className='inputContainer'>
					<input
						type='text'
						onChange={hadleChange}
						value={task}
						name='task'
						placeholder='Task...'
					/>
					<input
						type='number'
						onChange={hadleChange}
						value={deadline}
						name='deadline'
						placeholder='Deadline (in Days)...'
					/>
				</div>
				<button onClick={addTask}>Add Task</button>
			</div>
			<div className='todoList'>
				{todoList.map((task: ITask, key: number) => {
					return <TodoTask key={key} task={task} completeTask={completeTask} />;
				})}
			</div>
		</div>
	);
};

export default App;
