 export const services = [
    { id: '1', name: 'AWS', category: 'Cloud Platform', tags: ['Cloud', 'Infrastructure', 'Serverless'], description: 'Amazon Web Services - comprehensive cloud platform' },
    { id: '2', name: 'Supabase', category: 'Backend as a Service', tags: ['Database', 'Auth', 'Storage'], description: 'Open source Firebase alternative' },
    { id: '3', name: 'Stripe', category: 'Payment Processing', tags: ['Payment', 'API', 'E-commerce'], description: 'Payment infrastructure for the internet' },
    { id: '4', name: 'SendGrid', category: 'Email Service', tags: ['Email', 'API', 'Marketing'], description: 'Email delivery and marketing platform' },
    { id: '5', name: 'Vercel', category: 'Hosting Platform', tags: ['Deployment', 'Frontend', 'CI/CD'], description: 'Platform for frontend frameworks and static sites' },
    { id: '6', name: 'Firebase', category: 'Backend as a Service', tags: ['Google', 'Realtime', 'NoSQL'], description: 'Google\'s mobile and web application platform' },
  ];

export const service = {
  id: "1",
  name: "Supabase",
  category: "Backend as a Service",
  tags: ["Database", "Auth", "Storage"],
  officialSite: "https://supabase.com",
  description:
    "Supabase is an open source Firebase alternative providing all the backend services you need to build a product.",
  content: `# What is Supabase?

Supabase is an open source Backend-as-a-Service (BaaS) that provides real-time databases, authentication, storage, and more. It's built on top of PostgreSQL and provides a simple API for developers.

## Key Features

### PostgreSQL Database
Every Supabase project comes with a full PostgreSQL database. Use it directly or through the auto-generated APIs.

### Authentication
Built-in authentication with email, social providers, and magic links. Row Level Security keeps your data secure.

### Storage
Store and serve large files. Integrated with your database with Row Level Security.

### Real-time Subscriptions
Listen to database changes in real-time using WebSockets.

### Auto-generated APIs
RESTful APIs are automatically generated from your database schema.

## Example Usage

\`\`\`javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
)

// Fetch data
const { data, error } = await supabase
  .from('todos')
  .select('*')

// Insert data
const { data, error } = await supabase
  .from('todos')
  .insert([
    { title: 'Learn Supabase', completed: false }
  ])

// Subscribe to changes
const subscription = supabase
  .channel('todos')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'todos' },
    (payload) => console.log(payload)
  )
  .subscribe()
\`\`\`

## When to Use Supabase?

- Building web or mobile applications quickly
- Need real-time features
- Want a managed PostgreSQL database
- Require built-in authentication
- Building MVPs or prototypes
- Need a cost-effective backend solution`,
  relatedConcepts: [
    { id: "2", name: "PostgreSQL", type: "concept" },
    { id: "3", name: "Firebase", type: "service" },
    { id: "4", name: "REST API", type: "concept" },
    { id: "5", name: "WebSockets", type: "concept" },
  ],
};
