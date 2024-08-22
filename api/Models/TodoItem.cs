using System.ComponentModel.DataAnnotations;

public class TodoItem
{
    public int Id {get; set;}

    [Required]
    public required string User {get; set;}
    
    public string Content {get; set;} = "";

    public int Order {get; set;}

    public bool Completed {get; set;}

    public bool Deleted {get; set;}

    public DateTime Created {get; set;}
}

