package com.todo.list.app.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {

	private String id;
	private String assignedTo;
	private Status status;
	private Date dueDate;
	private Priority priority;
	private String description;
}
