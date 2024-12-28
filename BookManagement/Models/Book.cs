using System.ComponentModel.DataAnnotations;

namespace BookManagement.Models
{
    public class Book
    {
        [Key]
        public string id { get; set; }
        public string title { get; set; }
        public string author { get; set; }
        public string isbn { get; set; }
        public string publicationDate { get; set; }
        
    }
}
