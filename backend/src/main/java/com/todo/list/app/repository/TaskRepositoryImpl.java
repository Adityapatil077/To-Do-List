package com.todo.list.app.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import com.todo.list.app.model.Priority;
import com.todo.list.app.model.Status;
import com.todo.list.app.model.Task;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@AllArgsConstructor
@Repository
public class TaskRepositoryImpl implements TaskRepository {

	JdbcTemplate template;
	
	public String getMaxId() {
	 
	    String maxId = template.queryForObject("SELECT MAX(id) FROM todo_list_task", String.class);

	    if (maxId != null) { 
	        int currentId = Integer.parseInt(maxId);
	        int newId = currentId + 1;
	        return String.format("%03d", newId);
	    } else {
	        return "001";
	    }
	}

	
	@Override
	public boolean isTaskAdded(Task task) {
		System.out.println(task.toString());
		try {
			String sql = "INSERT INTO todo_list_task (id,assigned_to,status,due_date,priority,description) VALUES (?,?,?,?,?,?)";
	
			return template.update(sql,
								getMaxId(),
								task.getAssignedTo(),
								task.getStatus().name(),
								task.getDueDate(),
								task.getPriority().name(),
								task.getDescription()) >0;
			
		}catch(Exception e)
		{
			log.error("Failed to add Task ",e);
			return false;
		}		
	}

	@Override
	public List<Task> getAllTask() {
		
		RowMapper<Task> rowMapper = new RowMapper<>()
		{

			@Override
			public Task mapRow(ResultSet rs, int rowNum) throws SQLException {
				Task task = new Task();
				task.setId(rs.getString("id"));
				task.setAssignedTo(rs.getString("assigned_to"));
				task.setStatus(Status.valueOf(rs.getString("status")));
				task.setDueDate(rs.getDate("due_date"));
				task.setPriority(Priority.valueOf(rs.getString("priority")));
				task.setDescription(rs.getString("description"));
				return task;
			}
			
		};
		
		
		return template.query("SELECT *FROM todo_list_task", rowMapper);
	}

	@Override
	public boolean isDeleteTask(String userId) {	
		System.out.println("userId " + userId);
		String sql = "DELETE FROM todo_list_task WHERE id=?";
		int value = template.update(sql,userId);
		return value>0;
	}

	@Override
	public boolean isUpdateTask(Task task, String id) {
	    String sql = "UPDATE todo_list_task SET assigned_to = ?, status = ?, due_date = ?, priority = ?, description = ? WHERE id = ?";	    
	    
	    int rowsAffected = template.update(sql, 
	        task.getAssignedTo(), 
	        task.getStatus().name(), 
	        task.getDueDate(), 
	        task.getPriority().name(), 
	        task.getDescription(), 
	        task.getId());
	    return rowsAffected == 1;
	}


	public List<String> getAllUsers()
	{
		RowMapper<String> rowMapper = new RowMapper<String>() {
			
			@Override
			public String mapRow(ResultSet rs, int rowNum) throws SQLException {
				
				return rs.getString("userName");
			}
		};
		
		return template.query("SELECT userName FROM users", rowMapper);
		
	}
}
