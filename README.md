## Description
Bookify is a web app that allows you to keep track of your reading. 
- You can look for books (there is a limited number of books available at the moment)
- Add books to your list of books to read
- Track your progress as you're reading a book
- Mark books as read

## Scope limitations
This project was focused on practicing React and SQL. As a result:
- The app was built without a real backend, so login and multi-user functionality are not available.
- Responsiveness was not a priority, so the app does not display well on mobile devices.

## Link to the deployed app
[Bookify app](https://cheery-chimera-131b01.netlify.app/#/) 

## App routes

| Route                         | Description                                  |
| ----------------------------- | -------------------------------------------- |
| /                             | Shows the user's statistics                  |
| /all.books                    | Shows all the books available                |
| /book/:id/:bookstatus         | Shows a single book along with its details   |
| /my-books                     | Shows the user's book lists                  |

## Team
[Jose](https://github.com/Joseinacio25), [Tomás](https://github.com/tmartin87), [Eleni](https://github.com/nthTimeIsTheCharm)


## Technology
- HTML & CSS
- React
- React-Router-dom
- Supabase
- External API: [bookcover-api](https://github.com/w3slley/bookcover-api) 💖🙏

## Backlog
- Allow for multiple users by creating a backend and adding login functionality.
- Adjust the design and implementation 
- Cover more scenarios when it comes to users updating their current page.
- Allow for users to add the number of pages for a given book for themselves to account for the fact that different editions of a book can have a different number of pages.
- Consider additional functionalities.
  
