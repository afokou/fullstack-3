Exercise 0.4: New note

```mermaid
sequenceDiagram
participant browser
participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    browser-->>server: The note
    server-->>browser: Response containing {"message":"note created"}
    deactivate server
    
    Note left of server: The server adds the note to its database and returns a JSON response indicating creation was successful
    Note right of browser: The browser executes the callback function that adds the note to the list
```