```mermaid

sequenceDiagram
    participant b
    participant s
   
    b->>s: GET  https://studies.cs.helsinki.fi/exampleapp/spa
    activate s
    s-->>b: HTML code
    deactivate s
    
    b->>s: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate s
    s-->>b: main.css
    deactivate s
    
    b->>s: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate s
    s-->>b: spa.js
    deactivate s
    
    Note right of b: The browser starts executing the JavaScript code that fetches the JSON from the server
    
    b->>s: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate s
    s-->>b: [{"content": "","date": "2024-01-05T12:34:41.770Z"}, ... ]
    deactivate s

    Note right of b: The broswer executes the callback function that renders the notes