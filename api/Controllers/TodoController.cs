
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace lexltu_net_todo_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TodoController : ControllerBase
{
    private readonly TodoDbContext _db;

    public TodoController(TodoDbContext context)
    {
        _db = context;

    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodos()
    {
        return await _db.Todos.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItem>> GetTodo(int id)
    {
        var todo = await _db.Todos.FindAsync(id);

        if (todo == null)
        {
            return NotFound();
        }

        return Ok(todo);
    }

    [HttpPost]
    public async Task<ActionResult<TodoItem>> PostTodo(TodoItem todo)
    {
        todo.Created = DateTime.Now;
        _db.Todos.Add(todo);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTodo), new { id = todo.Id }, todo);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ActionResult<TodoItem>>> PutTodo(int id, TodoItem todo){
        if (id != todo.Id) {
            return BadRequest();
        }

        _db.Entry(todo).State = EntityState.Modified;

        try {
            await _db.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException) {
            var exists = _db.Todos.Any(x => x.Id == todo.Id);
            if (!exists) {
                return NotFound();
            }

            throw;
        }

        return Ok(GetTodo(id));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<TodoItem>> RemoveTodo(int id) {
        var todo = await _db.Todos.FindAsync(id);

        if (todo == null) {
            return NotFound();
        }

        _db.Todos.Remove(todo);
        await _db.SaveChangesAsync();

        return NoContent();        
    }

    private static TodoItemDTO ItemToDto(TodoItem todo) {
        return new TodoItemDTO{
            id = todo.Id,
            user = todo.User,
            content = todo.Content,
            priority = todo.Priority,
            completed = todo.Completed,
        };

    }

}

public class TodoItemDTO
{
    public int id {get; set;}

    public string user {get; set;} = "";

    public string content {get; set;} = "";

    public int priority {get; set;}

    public bool completed {get; set;}
}