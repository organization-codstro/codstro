export const concepts = [
  {
    id: "1",
    name: "REST API",
    category: "Web Development",
    tags: ["HTTP", "API", "Architecture"],
    description: "Representational State Transfer for building web services",
  },
  {
    id: "2",
    name: "Big O Notation",
    category: "Data Structures",
    tags: ["Algorithm", "Complexity", "Performance"],
    description: "Mathematical notation for algorithm complexity analysis",
  },
  {
    id: "3",
    name: "TCP/IP Protocol",
    category: "Network",
    tags: ["Protocol", "Internet", "Communication"],
    description: "Fundamental protocol suite for network communication",
  },
  {
    id: "4",
    name: "Binary Search Tree",
    category: "Data Structures",
    tags: ["Tree", "Search", "Algorithm"],
    description: "Hierarchical data structure for efficient searching",
  },
  {
    id: "5",
    name: "OAuth 2.0",
    category: "Security",
    tags: ["Authentication", "Authorization", "Security"],
    description: "Industry-standard protocol for authorization",
  },
  {
    id: "6",
    name: "Database Normalization",
    category: "Database",
    tags: ["SQL", "Design", "Optimization"],
    description: "Process of organizing database tables to reduce redundancy",
  },
];

export const concept = {
  id: "1",
  name: "REST API",
  category: "Web Development",
  tags: ["HTTP", "API", "Architecture"],
  isUnderstood: false,
  description: "Representational State Transfer for building web services",
  content: `# What is REST API?

REST is an architectural style that defines a set of constraints for creating web services. RESTful web services allow requesting systems to access and manipulate web resources using a uniform and predefined set of stateless operations.

## Key Principles

### Stateless Communication
Each request from client to server must contain all information needed to understand the request. The server should not store anything about the client session.

### Resource-Based
REST is resource-based, meaning that resources are identified by URIs. Resources are separate from the representations returned to the client.

### HTTP Methods
REST APIs use standard HTTP methods:
- GET: Retrieve a resource
- POST: Create a new resource
- PUT: Update an existing resource
- DELETE: Remove a resource

## Example

\`\`\`javascript
// GET request to retrieve users
fetch('https://api.example.com/users')
  .then(response => response.json())
  .then(data => console.log(data));

// POST request to create a user
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John', email: 'john@example.com' })
})
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

## When to Use REST?

- Building web services that need to be scalable
- Creating APIs that will be consumed by multiple clients
- Designing systems that require stateless communication
- Developing microservices architecture`,
  relatedConcepts: [
    { id: "2", name: "HTTP Protocol", type: "concept" },
    { id: "3", name: "GraphQL", type: "concept" },
    { id: "4", name: "JSON", type: "concept" },
    { id: "5", name: "API Design", type: "concept" },
  ],
};
