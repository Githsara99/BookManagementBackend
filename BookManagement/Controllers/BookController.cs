using BookManagement.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookDbContext _bookDbContext;

        public BookController(BookDbContext bookDbContext)
        {
            _bookDbContext = bookDbContext;
        }

        [HttpGet]
        [Route("GetBooks")]
        public async Task<IEnumerable<Book>> GetBooks()
        {
            return await _bookDbContext.Books.ToListAsync();
        }

        [HttpPost]
        [Route("AddBook")]
        public async Task<Book> AddBook(Book objBook)
        {
            _bookDbContext.Books.Add(objBook);
            await _bookDbContext.SaveChangesAsync();
            return objBook;
        }

        [HttpPatch]
        [Route("UpdateBook/{id}")]
        public async Task<Book?> UpdateBook(int id, Book objBook)
        {
            var book = await _bookDbContext.Books.FindAsync(id);
            if (book == null) return null;

            book.title = objBook.title;
            book.author = objBook.author;
            book.isbn = objBook.isbn;
            book.publicationDate = objBook.publicationDate;

            await _bookDbContext.SaveChangesAsync();
            return book;
        }

        [HttpDelete]
        [Route("DeleteBook/{id}")]
        public async Task<bool> DeleteBook(int id)
        {
            var book = await _bookDbContext.Books.FindAsync(id);
            if (book == null) return false;

            _bookDbContext.Books.Remove(book);
            await _bookDbContext.SaveChangesAsync();
            return true;
        }
    }
}
