Exercise 0.4: New note

```mermaid
sequenceDiagram
participant browser
participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    browser-->>server: The note
    server-->>browser: Response indicating redirect to https://studies.cs.helsinki.fi/exampleapp/notes
    deactivate server
    
    Note right of browser: The browser sends the note the user typed to the server
    Note left of server: The server adds the note to its database and redirects the browser to the notes page

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML code
    deactivate server
    
    Note right of browsers: The browser loads the page it was redirected to, showing the note
```