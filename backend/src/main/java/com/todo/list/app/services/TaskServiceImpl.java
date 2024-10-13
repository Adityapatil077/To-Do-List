package com.todo.list.app.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.todo.list.app.model.Task;
import com.todo.list.app.repository.TaskRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class TaskServiceImpl implements TaskService {

	TaskRepository repository;
	
	@Override
	public boolean isTaskAdded(Task task) {
		
		return repository.isTaskAdded(task);
	}

	@Override
	public List<Task> getAllTask() {
		
		return repository.getAllTask();
	}

	@Override
	public boolean isDeleteTask(String userId) {
		
		return repository.isDeleteTask(userId);
	}

	@Override
	public boolean isUpdateTask(Task task,String id) {
		
		return repository.isUpdateTask(task,id);
	}

	@Override
	public List<String> getAllUsers() {
		return repository.getAllUsers();
	}

	
}
