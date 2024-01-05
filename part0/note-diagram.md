```mermaid

sequenceDiagram
    participant b
    participant s

    b->>s: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate s
    Note left of s: Do a URL redirect to https://studies.cs.helsinki.fi/exampleapp/notes
    s-->>b: HTTP status code 302
    deactivate s

    Note right of b: The browser reloads the Notes page
    
    b->>s: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate s
    s-->>b: HTML document
    deactivate s
    
    b->>s: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate s
    s-->>b: css file
    deactivate s
    
    b->>s: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate s
    s-->>b: JavaScript file
    deactivate s
    
    Note right of b: The browser starts executing the JavaScript code that fetches the JSON from the server
    
    b->>s: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate s
    s-->>b: [{content: "dsd", date: "2024-01-05T18:34:16.421Z"}, ... ]
    deactivate s

    Note right of b: The browser executes the callback function that renders the notes