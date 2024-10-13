package com.todo.list.app.services;

import java.util.List;

import com.todo.list.app.model.Task;

public interface TaskService {

	public boolean isTaskAdded(Task task);

	public List<Task> getAllTask();

	public boolean isDeleteTask(String userId);

	public boolean isUpdateTask(Task task,String id);
	
	public List<String> getAllUsers();
}
