package com.todo.list.app.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.list.app.model.Task;
import com.todo.list.app.services.TaskService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/task")
public class TaskServiceController {

	TaskService taskService;
	
	@PostMapping
	public boolean isTaskAdded(@RequestBody Task task)
	{
		System.out.println(task.toString());
		return taskService.isTaskAdded(task);
	}
	
	@GetMapping
	public List<Task> getAllTask()
	{
		return taskService.getAllTask();	
	}
	
	@DeleteMapping("/{id}")
	public boolean isDeleteTask(@PathVariable String id)
	{
		return taskService.isDeleteTask(id);	
	}
	
	@PutMapping("/{id}")
	public boolean isUpdateTask(@RequestBody Task task,@PathVariable String id)
	{
		return taskService.isUpdateTask(task,id);	
	}
	
	@GetMapping("/users")
	public List<String> getAllUsers()
	{
		return taskService.getAllUsers();	
	}
	
}
