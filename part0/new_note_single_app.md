```mermaid

sequenceDiagram
    participant b
    participant s
   
    b->>s: POST  https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate s
    s-->>b: status code 201 created
    deactivate s