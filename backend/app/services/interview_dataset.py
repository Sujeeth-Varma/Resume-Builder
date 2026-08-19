from typing import Dict, Any, List

ROLES_DATASET: Dict[str, Dict[str, Any]] = {
    "fullstack-ai": {
        "id": "fullstack-ai",
        "title": "Full Stack AI Engineer",
        "category": "AI & Web Development",
        "icon": "Cpu",
        "description": "Architect end-to-end AI applications using React, Python/FastAPI, LangChain, RAG pipelines, and vector databases.",
        "skills": ["Python", "FastAPI", "React", "LangChain", "RAG", "pgvector", "Docker"],
        "requirements": [
            "Strong proficiency in Python (FastAPI/Flask) and JavaScript/TypeScript (React/Next.js).",
            "Experience building Retrieval-Augmented Generation (RAG) pipelines and vector search (pgvector/Pinecone/Qdrant).",
            "Knowledge of Model Context Protocol (MCP), LLM fine-tuning, or prompt engineering frameworks.",
            "Familiarity with containerization (Docker) and deployment on AWS/GCP or Cloud Platform.",
            "Solid understanding of REST API design, state management (Zustand/Redux), and database schema modeling."
        ],
        "faqs": [
            {
                "id": 1,
                "question": "How do you optimize vector search retrieval performance in a RAG system?",
                "answer_star": "Situation: RAG vector queries were taking >400ms for large document embeddings.\nTask: Reduce retrieval latency to under 100ms.\nAction: Added HNSW vector indexing in pgvector, fine-tuned chunk size to 512 tokens with 50-token overlap, and enabled query result caching in Redis.\nResult: Lowered vector query latency to 85ms and increased retrieval relevance by 25%.",
                "key_points": ["HNSW Indexing", "Chunk Strategy", "Redis Cache", "Cosine Similarity"]
            },
            {
                "id": 2,
                "question": "What is the Model Context Protocol (MCP) and how is it used in AI applications?",
                "answer_star": "Situation: Needed a standard protocol to expose custom API tools to local and remote LLM clients.\nTask: Implement runtime tool registration without hardcoded endpoint annotations.\nAction: Built an MCP server using Spring AI / Python FastAPI with Streamable HTTP transport and outbound execution layers.\nResult: Enabled seamless AI tool execution across multiple client environments.",
                "key_points": ["MCP Server", "Streamable HTTP Transport", "Runtime Tool Registration", "LLM Tool Calling"]
            }
        ],
        "questions": {
            "fresher": [
                {
                    "id": 1,
                    "question": "What does RAG stand for in modern AI application development?",
                    "options": ["Retrieval-Augmented Generation", "Random Access Graph", "Relational AI Grid", "Realtime Automated Gateway"],
                    "correct": 0,
                    "explanation": "RAG stands for Retrieval-Augmented Generation, combining document retrieval with generative AI models."
                },
                {
                    "id": 2,
                    "question": "Which Python framework is widely used for building asynchronous REST APIs for AI services?",
                    "options": ["Django", "FastAPI", "PHP", "Tkinter"],
                    "correct": 1,
                    "explanation": "FastAPI is built on Starlette and Pydantic, providing high-performance async REST API capabilities."
                },
                {
                    "id": 3,
                    "question": "What is pgvector in PostgreSQL?",
                    "options": ["A JavaScript UI framework", "An open-source extension for vector similarity search", "A CSS preprocessor", "A compiler for Python"],
                    "correct": 1,
                    "explanation": "pgvector is a PostgreSQL extension for storing embeddings and performing vector similarity searches."
                },
                {
                    "id": 4,
                    "question": "Which metric is commonly used to measure distance between embedding vectors?",
                    "options": ["Cosine Similarity", "HTML Parse Speed", "CPU Frequency", "RAM Usage"],
                    "correct": 0,
                    "explanation": "Cosine Similarity measures the cosine of the angle between two multi-dimensional vector embeddings."
                },
                {
                    "id": 5,
                    "question": "In React, what hook is used to manage local component state?",
                    "options": ["useEffect", "useState", "useRouter", "useFetch"],
                    "correct": 1,
                    "explanation": "useState is the core React hook for adding local state to functional components."
                },
                {
                    "id": 6,
                    "question": "What is the purpose of Docker containers?",
                    "options": ["Package application code with its dependencies for consistent execution across environments", "Design graphic logos", "Style CSS buttons", "Format hard drives"],
                    "correct": 0,
                    "explanation": "Docker containers isolate application code and runtime dependencies for consistent cross-platform execution."
                },
                {
                    "id": 7,
                    "question": "Which HTTP method is typically used to create a new resource in a REST API?",
                    "options": ["GET", "POST", "DELETE", "OPTIONS"],
                    "correct": 1,
                    "explanation": "POST is standard for submitting data to create new backend resources."
                },
                {
                    "id": 8,
                    "question": "What is an LLM embedding?",
                    "options": ["A numerical vector representation of text in a multi-dimensional space", "An HTML image tag", "A SQL database index", "A CSS font family"],
                    "correct": 0,
                    "explanation": "Embeddings convert semantic meaning into dense floating-point vector representations."
                },
                {
                    "id": 9,
                    "question": "What is JWT used for in web applications?",
                    "options": ["Stateless user authentication and secure token transmission", "Image compression", "Database backups", "CSS layout grid"],
                    "correct": 0,
                    "explanation": "JSON Web Tokens (JWT) enable stateless authentication between client and server."
                },
                {
                    "id": 10,
                    "question": "Which tool is commonly used for API testing and endpoint inspection?",
                    "options": ["Postman", "Photoshop", "Excel", "Blender"],
                    "correct": 0,
                    "explanation": "Postman is an industry-standard application for testing REST API endpoints."
                }
            ],
            "intermediate": [
                {
                    "id": 1,
                    "question": "Which indexing algorithm in pgvector provides fast approximate nearest neighbor search?",
                    "options": ["HNSW (Hierarchical Navigable Small World)", "B-Tree", "Hash Index", "Spatial R-Tree"],
                    "correct": 0,
                    "explanation": "HNSW creates multi-layer graphs for rapid approximate nearest neighbor (ANN) vector searches."
                },
                {
                    "id": 2,
                    "question": "How does LangChain manage conversational memory across multiple turns?",
                    "options": ["Using memory classes like ConversationBufferMemory or RedisChatMessageHistory", "By restarting the server", "Using static HTML text", "By deleting user inputs"],
                    "correct": 0,
                    "explanation": "LangChain provides structured memory modules to persist context between user interactions."
                },
                {
                    "id": 3,
                    "question": "What is the primary benefit of async/await in Python FastAPI endpoints?",
                    "options": ["Non-blocking I/O execution allowing high concurrency for database and HTTP calls", "Faster CPU clock speed", "Automatic CSS compilation", "Eliminates syntax errors"],
                    "correct": 0,
                    "explanation": "Async/await releases the thread during I/O wait times, allowing the event loop to serve concurrent requests."
                },
                {
                    "id": 4,
                    "question": "In React 18+, what is the purpose of useMemo?",
                    "options": ["Memoizes expensive calculations between renders based on dependency array", "Creates a new DOM element", "Sends HTTP requests", "Deletes component state"],
                    "correct": 0,
                    "explanation": "useMemo caches computation results to prevent re-executing heavy functions on every render."
                },
                {
                    "id": 5,
                    "question": "What problem does CORS solve in web browsers?",
                    "options": ["Restricts cross-origin HTTP requests for security unless explicitly allowed by server headers", "Accelerates Wi-Fi speed", "Formats JSON text", "Compresses MP4 videos"],
                    "correct": 0,
                    "explanation": "Cross-Origin Resource Sharing (CORS) enforces browser origin security policies."
                },
                {
                    "id": 6,
                    "question": "What is the function of Pydantic models in FastAPI?",
                    "options": ["Data validation, serialization, and automatic OpenAPI schema generation", "CSS styling", "Database disk formatting", "Sending push notifications"],
                    "correct": 0,
                    "explanation": "Pydantic enforces strict type checking, validation, and JSON serialization for API request/response payloads."
                },
                {
                    "id": 7,
                    "question": "What is chunk overlap in text splitting for RAG pipelines?",
                    "options": ["Including shared sentences between adjacent text chunks to preserve semantic context boundaries", "Overwriting data in database", "Duplicating PDF pages", "Deleting old text"],
                    "correct": 0,
                    "explanation": "Chunk overlap ensures concepts spanning split boundaries are not lost during vector embedding."
                },
                {
                    "id": 8,
                    "question": "Which HTTP header is typically used to send a JWT token for authorized requests?",
                    "options": ["Authorization: Bearer <token>", "Content-Type: text/html", "Accept: image/png", "Host: localhost"],
                    "correct": 0,
                    "explanation": "The Authorization header with the Bearer scheme is standard for JWT authentication."
                },
                {
                    "id": 9,
                    "question": "What is the function of Redis in full-stack AI architectures?",
                    "options": ["In-memory key-value caching and fast session storage", "Relational SQL querying", "Storing heavy PDF files", "Compiling React JSX"],
                    "correct": 0,
                    "explanation": "Redis serves as an ultra-fast in-memory cache and message broker."
                },
                {
                    "id": 10,
                    "question": "What does Model Context Protocol (MCP) enable?",
                    "options": ["Standardized integration between LLM clients and backend context/tool providers", "GPU hardware manufacturing", "Ethernet cable wiring", "Printing physical resumes"],
                    "correct": 0,
                    "explanation": "MCP provides a standardized protocol for LLMs to dynamically query tools and context sources."
                },
                {
                    "id": 11,
                    "question": "In Tailwind CSS, how do you specify responsive layout breakpoints?",
                    "options": ["Using utility prefixes like sm:, md:, lg:, xl:", "Using inline style tags", "Editing browser C++ code", "Using SQL query scripts"],
                    "correct": 0,
                    "explanation": "Tailwind uses mobile-first responsive prefixes such as sm:, md:, and lg:."
                },
                {
                    "id": 12,
                    "question": "Which ORM is popular for Python SQL database interaction?",
                    "options": ["SQLAlchemy", "Hibernate", "Entity Framework", "Prisma"],
                    "correct": 0,
                    "explanation": "SQLAlchemy is the premier Python SQL toolkit and Object Relational Mapper."
                },
                {
                    "id": 13,
                    "question": "What is temperature in LLM generation settings?",
                    "options": ["A parameter controlling randomness and creativity of output responses", "CPU temperature in Celsius", "Network ping speed", "Screen brightness level"],
                    "correct": 0,
                    "explanation": "Higher temperature values increase output diversity, while lower values produce deterministic responses."
                },
                {
                    "id": 14,
                    "question": "In Git, what command merges changes from a remote branch into your local branch?",
                    "options": ["git pull", "git push", "git init", "git status"],
                    "correct": 0,
                    "explanation": "git pull fetches and merges remote commits into the current working branch."
                },
                {
                    "id": 15,
                    "question": "What is a major advantage of Zustand over Redux for React state management?",
                    "options": ["Minimal boilerplate, simple hook-based API, and lightweight bundle size", "Requires 10 configuration files", "Only works on Internet Explorer", "Disables React hooks"],
                    "correct": 0,
                    "explanation": "Zustand offers a clean, hook-centric state management model without complex Redux boilerplate."
                }
            ],
            "senior": [
                {
                    "id": 1,
                    "question": "How do you prevent SQL injection vulnerabilities when executing dynamic database queries in SQLAlchemy?",
                    "options": ["Use parameterized queries and ORM query builders rather than raw string concatenation", "Disable database passwords", "Encrypt the client monitor screen", "Use inline HTML tags"],
                    "correct": 0,
                    "explanation": "SQLAlchemy ORM automatically parameterizes input arguments, escaping malicious SQL fragments."
                },
                {
                    "id": 2,
                    "question": "Which architecture strategy helps mitigate LLM hallucinations in production enterprise systems?",
                    "options": ["Hybrid search (Dense vector + Sparse BM25) with Reranking and strict source attribution validation", "Increasing model temperature to 2.0", "Removing all context documents", "Using 8-bit image compression"],
                    "correct": 0,
                    "explanation": "Combining keyword (sparse) and semantic (dense) search with rerankers ensures context precision."
                },
                {
                    "id": 3,
                    "question": "What is the primary advantage of connection pooling in PostgreSQL database management?",
                    "options": ["Reuses existing database connection threads to eliminate expensive TCP handshake overhead for every HTTP request", "Doubles hard drive storage capacity", "Automatically writes React code", "Eliminates all CSS bugs"],
                    "correct": 0,
                    "explanation": "Connection pools maintain open connections, reducing latency and database server connection thrashing."
                },
                {
                    "id": 4,
                    "question": "How does React Fiber architecture improve UI responsiveness?",
                    "options": ["Breaks rendering work into incremental units that can be paused, prioritized, or aborted across main thread frames", "Increases computer RAM size", "Runs server SQL queries in browser", "Replaces JavaScript with C#"],
                    "correct": 0,
                    "explanation": "React Fiber enables concurrent rendering, prioritizing user inputs over background re-renders."
                },
                {
                    "id": 5,
                    "question": "What is semantic caching in AI API architectures?",
                    "options": ["Caching responses based on vector embedding similarity rather than exact string equality", "Caching browser cookies", "Deleting database tables daily", "Saving images in local storage"],
                    "correct": 0,
                    "explanation": "Semantic caching checks if a new query is semantically equivalent to a previously cached prompt."
                },
                {
                    "id": 6,
                    "question": "What mechanism ensures idempotency for financial or critical POST requests in REST APIs?",
                    "options": ["Idempotency keys passed in request headers to prevent duplicate processing of retried requests", "Refreshing the page twice", "Deleting user sessions", "Disabling SSL certificates"],
                    "correct": 0,
                    "explanation": "Idempotency keys ensure retried API calls return the original result without duplicate side-effects."
                },
                {
                    "id": 7,
                    "question": "What is the primary difference between a process and a thread in operating systems?",
                    "options": ["Processes have independent memory address spaces; threads within the same process share memory", "Threads run on hard drives; processes run on monitors", "Processes only exist in Windows; threads only exist in Linux", "Processes do not use CPU"],
                    "correct": 0,
                    "explanation": "Threads share process memory resources, while processes execute within isolated memory boundaries."
                },
                {
                    "id": 8,
                    "question": "In Docker, what is multi-stage building used for?",
                    "options": ["Minimizing final production image sizes by separating build tools from the final runtime container", "Creating 3 Docker files in 1 folder", "Formatting Linux hard drives", "Writing Python scripts"],
                    "correct": 0,
                    "explanation": "Multi-stage builds copy only compiled artifacts into slim final runtime images."
                },
                {
                    "id": 9,
                    "question": "What is the CAP theorem in distributed database systems?",
                    "options": ["A distributed system can simultaneously provide at most two of Consistency, Availability, and Partition Tolerance", "Computer Architecture Performance law", "Code Analysis Protocol theorem", "Centralized Access Permission rule"],
                    "correct": 0,
                    "explanation": "The CAP theorem states distributed data stores must trade off between consistency, availability, and partition tolerance."
                },
                {
                    "id": 10,
                    "question": "How does Rate Limiting protect backend API services?",
                    "options": ["Restricts the number of request calls a client IP or API key can make within a specified time window", "Increases API response size", "Deletes user accounts after 1 hour", "Changes database passwords"],
                    "correct": 0,
                    "explanation": "Rate limiting protects infrastructure from denial-of-service (DoS) attacks and resource exhaustion."
                },
                {
                    "id": 11,
                    "question": "What is the purpose of database migrations (e.g. Alembic for Python)?",
                    "options": ["Version control schema changes and apply incremental updates safely across environments", "Move files from Mac to Windows", "Delete duplicate user rows", "Convert Python code to Java"],
                    "correct": 0,
                    "explanation": "Migration tools track schema changes in code files, enabling reproducible database upgrades."
                },
                {
                    "id": 12,
                    "question": "What is fine-tuning versus prompt engineering for Large Language Models?",
                    "options": ["Fine-tuning updates model weights on custom datasets; prompt engineering optimizes text prompts given to frozen weights", "Fine-tuning formats HTML code", "Prompt engineering rewrites Python syntax", "They are identical terms"],
                    "correct": 0,
                    "explanation": "Fine-tuning modifies model parameters, whereas prompt engineering crafts input instructions."
                },
                {
                    "id": 13,
                    "question": "What is an event-driven architecture using message queues like RabbitMQ or Kafka?",
                    "options": ["Decouples microservices by asynchronously publishing and consuming event messages via topic queues", "Runs all tasks synchronously on main UI thread", "Deletes database logs", "Replaces HTTP with Bluetooth"],
                    "correct": 0,
                    "explanation": "Message queues allow asynchronous communication, buffering peak loads between microservices."
                },
                {
                    "id": 14,
                    "question": "In OAuth 2.0, what is PKCE (Proof Key for Code Exchange) designed for?",
                    "options": ["Securing public authorization code grants against authorization code interception attacks", "Encrypting PDF document pages", "Compressing PNG images", "Formatting SQL statements"],
                    "correct": 0,
                    "explanation": "PKCE prevents authorization code theft on public clients like mobile or single-page apps."
                },
                {
                    "id": 15,
                    "question": "What is zero-downtime deployment (e.g., Blue-Green or Canary)?",
                    "options": ["Updating software versions without interrupting active user traffic by shifting traffic gradually", "Stopping servers for 4 hours at midnight", "Deleting production databases", "Running app without internet"],
                    "correct": 0,
                    "explanation": "Blue-Green deployments run new and old versions in parallel, switching router traffic seamlessly."
                },
                {
                    "id": 16,
                    "question": "How do indexing data structures like B+ Trees optimize range queries in relational databases?",
                    "options": ["Leaf nodes are linked sequentially, allowing efficient linear traversal for range scans", "B+ Trees delete all index nodes", "B+ Trees convert numbers to text", "They only work for string values"],
                    "correct": 0,
                    "explanation": "Linked leaf nodes in B+ Trees make sequential range scans extremely fast."
                },
                {
                    "id": 17,
                    "question": "What is the function of a Reverse Proxy (e.g. NGINX)?",
                    "options": ["Routes client requests, handles SSL termination, load balancing, and static file caching before backend servers", "Generates React components", "Writes Python unit tests", "Replaces database tables"],
                    "correct": 0,
                    "explanation": "Reverse proxies sit in front of application servers, managing SSL, routing, and load balancing."
                },
                {
                    "id": 18,
                    "question": "What is graceful shutdown in backend server processes?",
                    "options": ["Completes ongoing active HTTP requests and closes DB pool connections before terminating the server process", "Pulling server power plug instantly", "Deleting log files on crash", "Stopping client browsers"],
                    "correct": 0,
                    "explanation": "Graceful shutdown prevents dropped connections by allowing active requests to finish before exiting."
                },
                {
                    "id": 19,
                    "question": "In React, what causes memory leaks in useEffect hooks?",
                    "options": ["Failing to clear event listeners, timers, or abort active fetch requests in the cleanup return function", "Using string variables", "Writing CSS utility classes", "Rendering standard h1 tags"],
                    "correct": 0,
                    "explanation": "Effects that attach subscriptions or timers must return a cleanup function to unregister them on unmount."
                },
                {
                    "id": 20,
                    "question": "What is Observability in cloud-native microservices?",
                    "options": ["Telemetry triangulation using Distributed Tracing, Structured Metrics, and Centralized Logs (OpenTelemetry)", "Looking at monitor screen", "Taking screenshots of errors", "Printing physical server reports"],
                    "correct": 0,
                    "explanation": "Observability relies on metrics, logs, and traces to diagnose complex distributed systems."
                }
            ]
        }
    },
    "backend-python": {
        "id": "backend-python",
        "title": "Backend Engineer (Python / FastAPI)",
        "category": "Backend Development",
        "icon": "Server",
        "description": "Design high-concurrency microservices, async REST APIs, PostgreSQL schemas, and Redis caching layers.",
        "skills": ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Redis", "Celery", "Docker"],
        "requirements": [
            "Expertise in Python 3.10+ async programming, FastAPI/Django framework architectures.",
            "Deep understanding of SQL schema design, migrations (Alembic), and query tuning in PostgreSQL.",
            "Experience building RESTful and GraphQL API services with Pydantic validation.",
            "Knowledge of distributed task queues (Celery/RabbitMQ) and Redis caching patterns.",
            "Familiarity with Docker containerization, unit testing (pytest), and CI/CD pipelines."
        ],
        "faqs": [
            {
                "id": 1,
                "question": "How does FastAPI handle asynchronous request execution under the hood?",
                "answer_star": "Situation: Needed to handle thousands of concurrent I/O-bound requests for a recommendation service.\nTask: Build an endpoint without thread blocking.\nAction: Implemented async def router handlers with async SQLAlchemy sessions and async HTTP clients.\nResult: Handled 2,500 req/sec with under 20ms average response latency.",
                "key_points": ["Starlette Event Loop", "Async Def vs Def", "Non-Blocking I/O", "Uvicorn ASGI"]
            }
        ],
        "questions": {
            "fresher": [
                {
                    "id": 1,
                    "question": "What is FastAPI?",
                    "options": ["A modern, high-performance web framework for building APIs with Python 3.8+", "A database management GUI", "A JavaScript bundler", "A Linux operating system"],
                    "correct": 0,
                    "explanation": "FastAPI is a Python web framework based on Starlette and Pydantic for high-speed API development."
                },
                {
                    "id": 2,
                    "question": "What is Pydantic used for in FastAPI?",
                    "options": ["Data validation and settings management using Python type hints", "Writing CSS styles", "Running SQL backups", "Creating desktop icons"],
                    "correct": 0,
                    "explanation": "Pydantic enforces type hints at runtime and provides user-friendly data validation errors."
                },
                {
                    "id": 3,
                    "question": "Which ASGI server is commonly used to run FastAPI applications?",
                    "options": ["Uvicorn", "Apache HTTP Server", "IIS", "Tomcat"],
                    "correct": 0,
                    "explanation": "Uvicorn is a lightning-fast ASGI server implementation for Python."
                },
                {
                    "id": 4,
                    "question": "What does GIL stand for in Python?",
                    "options": ["Global Interpreter Lock", "General Input Layer", "Graphic Interface Logic", "Global Index List"],
                    "correct": 0,
                    "explanation": "The Global Interpreter Lock (GIL) is a mutex that prevents multiple native threads from executing Python bytecodes at once."
                },
                {
                    "id": 5,
                    "question": "Which decorator in FastAPI defines a GET endpoint?",
                    "options": ["@app.get()", "@app.route_get()", "@app.fetch()", "@app.post()"],
                    "correct": 0,
                    "explanation": "@app.get('/path') declares an HTTP GET route handler in FastAPI."
                },
                {
                    "id": 6,
                    "question": "What is virtualenv in Python?",
                    "options": ["An isolated environment tool for managing package dependencies per project", "A virtual reality headset", "A SQL table", "A web browser extension"],
                    "correct": 0,
                    "explanation": "Virtual environments isolate project dependencies to prevent version conflicts across projects."
                },
                {
                    "id": 7,
                    "question": "Which SQL command retrieves records from a table?",
                    "options": ["SELECT", "INSERT", "UPDATE", "DROP"],
                    "correct": 0,
                    "explanation": "SELECT statements query and return data rows from relational tables."
                },
                {
                    "id": 8,
                    "question": "What is Pytest?",
                    "options": ["A popular testing framework for writing clean Python unit and integration tests", "A database engine", "A CSS framework", "A code editor"],
                    "correct": 0,
                    "explanation": "Pytest simplifies writing compact, readable test suites in Python."
                },
                {
                    "id": 9,
                    "question": "What does status code 200 OK represent in HTTP?",
                    "options": ["Successful HTTP request completion", "Resource Not Found", "Internal Server Error", "Unauthorized"],
                    "correct": 0,
                    "explanation": "HTTP status 200 indicates standard success for HTTP operations."
                },
                {
                    "id": 10,
                    "question": "In Python, how do you handle exceptions?",
                    "options": ["try ... except blocks", "if ... else blocks", "for ... in loops", "import statements"],
                    "correct": 0,
                    "explanation": "try/except blocks catch and handle runtime exceptions gracefully."
                }
            ],
            "intermediate": [
                {
                    "id": 1,
                    "question": "What is the difference between `async def` and plain `def` path operations in FastAPI?",
                    "options": ["`async def` runs directly on the main event loop; plain `def` is run in an external thread pool", "They are identical", "plain `def` is faster for I/O", "`async def` disables Pydantic"],
                    "correct": 0,
                    "explanation": "FastAPI runs plain sync `def` functions in a background threadpool so they don't block the main event loop."
                },
                {
                    "id": 2,
                    "question": "What is Alembic in the Python ecosystem?",
                    "options": ["A lightweight database migration tool usage with SQLAlchemy", "A Python package compiler", "An image editing library", "A frontend UI template"],
                    "correct": 0,
                    "explanation": "Alembic handles schema migrations and revision control for SQLAlchemy models."
                },
                {
                    "id": 3,
                    "question": "What is Dependency Injection in FastAPI?",
                    "options": ["A system (`Depends`) to declare reusable dependencies like DB sessions and auth handlers", "Injecting viruses into servers", "Installing pip packages automatically", "Linking CSS stylesheets"],
                    "correct": 0,
                    "explanation": "FastAPI's `Depends` provides clean dependency injection for database sessions, authentication, and shared logic."
                },
                {
                    "id": 4,
                    "question": "How does Celery process background tasks in Python applications?",
                    "options": ["Uses distributed task queues with brokers like Redis/RabbitMQ to execute asynchronous background workers", "Runs code inside HTML tags", "Executes tasks on user's phone", "Deletes database logs"],
                    "correct": 0,
                    "explanation": "Celery offloads long-running or scheduled tasks to worker processes via message brokers."
                },
                {
                    "id": 5,
                    "question": "What is N+1 query problem in ORMs?",
                    "options": ["Executing 1 query for parent records followed by N separate queries for child relationships instead of joining", "A mathematical formula", "Adding 1 to every column", "A syntax error"],
                    "correct": 0,
                    "explanation": "N+1 queries degrade performance by firing N additional database queries for related child models."
                },
                {
                    "id": 6,
                    "question": "How do you solve the N+1 query problem in SQLAlchemy?",
                    "options": ["Use joinedload() or selectinload() to eager-load relationships in a single query", "Delete child tables", "Use raw text files", "Restart the database"],
                    "correct": 0,
                    "explanation": "Eager loading options like `joinedload` fetch parent and child entities in one SQL JOIN."
                },
                {
                    "id": 7,
                    "question": "What is CORS middleware in FastAPI?",
                    "options": ["Middleware that handles Cross-Origin Resource Sharing headers for cross-domain browser security", "Compresses JSON files", "Encrypts database passwords", "Formats HTML templates"],
                    "correct": 0,
                    "explanation": "CORSMiddleware allows configured frontend domains to interact with backend endpoints."
                },
                {
                    "id": 8,
                    "question": "What is the purpose of `__init__.py` in Python directories?",
                    "options": ["Marks directory as a Python package and initializes package-level variables", "Compiles C++ files", "Deletes temporary files", "Creates an HTML webpage"],
                    "correct": 0,
                    "explanation": "`__init__.py` indicates that the directory should be treated as an importable Python package."
                },
                {
                    "id": 9,
                    "question": "What is a Context Manager in Python?",
                    "options": ["An object managing runtime context via `__enter__` and `__exit__` methods (e.g. `with` statement)", "A manager in a software company", "A SQL query builder", "A React hook"],
                    "correct": 0,
                    "explanation": "Context managers allocate and release resources cleanly using `with` blocks."
                },
                {
                    "id": 10,
                    "question": "What is the HTTP status code for 401 Unauthorized?",
                    "options": ["401", "404", "500", "201"],
                    "correct": 0,
                    "explanation": "HTTP 401 indicates that authentication credentials are missing or invalid."
                },
                {
                    "id": 11,
                    "question": "What is the difference between LIST and SET in Python?",
                    "options": ["Lists are ordered and allow duplicates; Sets are unordered and contain unique elements", "Lists are unchangeable; Sets are functions", "Lists only store numbers; Sets only store strings", "They are identical"],
                    "correct": 0,
                    "explanation": "Sets enforce unique elements and provide O(1) average lookup times."
                },
                {
                    "id": 12,
                    "question": "What does `@pytest.fixture` do?",
                    "options": ["Provides reusable test setup data and state objects to test functions", "Deletes failing unit tests", "Speeds up CPU clock", "Prints logs to screen"],
                    "correct": 0,
                    "explanation": "Fixtures define reusable baseline state and dependencies for Pytest test cases."
                },
                {
                    "id": 13,
                    "question": "What is `dataclass` in Python 3.7+?",
                    "options": ["A decorator that automatically generates special methods like `__init__` and `__repr__` for data classes", "A SQL database table", "A React component", "A Docker image"],
                    "correct": 0,
                    "explanation": "Dataclasses reduce boilerplate when creating classes primarily used to store data."
                },
                {
                    "id": 14,
                    "question": "In PostgreSQL, what is an INDEX?",
                    "options": ["A data structure that improves data retrieval speed on table columns at the cost of additional write overhead", "The first page of a website", "A CSS class selector", "A Python function"],
                    "correct": 0,
                    "explanation": "Indexes allow the database engine to locate target rows without scanning every row in a table."
                },
                {
                    "id": 15,
                    "question": "What is Gunicorn?",
                    "options": ["A WSGI HTTP server for UNIX used to manage Python web worker processes", "A game engine", "A vector database", "A JavaScript compiler"],
                    "correct": 0,
                    "explanation": "Gunicorn manages worker processes to serve Python WSGI/ASGI web applications."
                }
            ],
            "senior": [
                {
                    "id": 1,
                    "question": "How do you handle database transaction isolation levels to prevent dirty reads and non-repeatable reads in PostgreSQL?",
                    "options": ["Set isolation level to READ COMMITTED or REPEATABLE READ depending on concurrency requirements", "Disable database transactions", "Use text files instead of SQL", "Restart PostgreSQL on every request"],
                    "correct": 0,
                    "explanation": "Isolation levels dictate how transaction changes are visible to concurrent database sessions."
                },
                {
                    "id": 2,
                    "question": "What is the Circuit Breaker pattern in microservice architecture?",
                    "options": ["Prevents cascading failures by detecting failing downstream services and failing fast without exhausting threads", "Turns off electricity in server room", "Deletes broken database records", "Resets user passwords"],
                    "correct": 0,
                    "explanation": "Circuit breakers open when error thresholds are exceeded, preventing system-wide degradation."
                },
                {
                    "id": 3,
                    "question": "How do Python generators (`yield`) optimize memory when processing multi-gigabyte log files?",
                    "options": ["Streams data items lazily one at a time without loading the entire dataset into RAM", "Compresses data on hard drive", "Deletes old log lines", "Runs code in C++"],
                    "correct": 0,
                    "explanation": "Generators evaluate items on demand, maintaining low memory footprints for large data streams."
                },
                {
                    "id": 4,
                    "question": "What is connection pooling saturation and how do you monitor it?",
                    "options": ["When all pool connections are checked out causing pending queries to block; monitored via pool checkout metrics and timeouts", "When hard drive runs out of space", "When Wi-Fi disconnects", "When browser tab crashes"],
                    "correct": 0,
                    "explanation": "Pool exhaustion leads to request queues and timeouts; monitoring active vs idle connections prevents bottlenecks."
                },
                {
                    "id": 5,
                    "question": "How do you implement distributed locking in Python using Redis?",
                    "options": ["Use Redlock algorithm or `SET key value NX PX` commands to acquire atomic mutual exclusion locks across workers", "Lock the physical server room door", "Write lock files to disk", "Use global Python variables"],
                    "correct": 0,
                    "explanation": "Atomic Redis commands with expiration times prevent race conditions between distributed workers."
                },
                {
                    "id": 6,
                    "question": "What is zero-copy file transfer in web servers?",
                    "options": ["Bypassing user-space memory buffers using `sendfile()` to stream data directly from disk to network sockets", "Copying files without Ctrl+C", "Deleting files after reading", "Using USB flash drives"],
                    "correct": 0,
                    "explanation": "Zero-copy minimizes CPU context switches and memory buffer copies during file streaming."
                },
                {
                    "id": 7,
                    "question": "In PostgreSQL, what is WAL (Write-Ahead Logging)?",
                    "options": ["Logging data changes to disk before modifying actual data pages to ensure ACID durability and crash recovery", "A security firewall", "A Python package", "A frontend UI component"],
                    "correct": 0,
                    "explanation": "WAL guarantees data durability by recording transaction logs prior to committing table changes."
                },
                {
                    "id": 8,
                    "question": "What is structural pattern matching in Python 3.10+ (`match/case`)?",
                    "options": ["A powerful control flow statement that matches data patterns, sequences, and mappings with binding capabilities", "A CSS selector tool", "A regex builder", "A database query language"],
                    "correct": 0,
                    "explanation": "Pattern matching allows elegant destructuring and evaluation of complex Python data structures."
                },
                {
                    "id": 9,
                    "question": "How do you handle graceful degradation in backend services?",
                    "options": ["Fallback to cached data or simplified responses when non-critical downstream dependencies fail", "Crash the entire server", "Display empty blank pages", "Delete database tables"],
                    "correct": 0,
                    "explanation": "Graceful degradation ensures core features remain functional even if auxiliary microservices fail."
                },
                {
                    "id": 10,
                    "question": "What is the difference between process-based and thread-based concurrency in Python?",
                    "options": ["Processes bypass the GIL by spawning independent memory spaces; threads share memory but are bound by the GIL for CPU-bound tasks", "Threads run on GPU; processes run on CPU", "Processes only work on Linux", "They are identical"],
                    "correct": 0,
                    "explanation": "Multiprocessing utilizes multiple CPU cores effectively by avoiding Python's GIL limitation."
                },
                {
                    "id": 11,
                    "question": "How does Database Sharding differ from Database Partitioning?",
                    "options": ["Sharding distributes data across separate physical database servers; partitioning divides tables within a single database instance", "Sharding is for images; partitioning is for text", "They mean the same thing", "Sharding deletes old data"],
                    "correct": 0,
                    "explanation": "Sharding is horizontal scaling across nodes, whereas table partitioning organizes data inside one server."
                },
                {
                    "id": 12,
                    "question": "What is an API Gateway in microservice systems?",
                    "options": ["A single entry point for routing, authentication, SSL termination, and request transformation across microservices", "A physical router box", "A database engine", "A CSS stylesheet"],
                    "correct": 0,
                    "explanation": "API Gateways centralize cross-cutting concerns like security, rate limiting, and request routing."
                },
                {
                    "id": 13,
                    "question": "In Python, what is Metaclass?",
                    "options": ["The class of a class that defines how a class behaves and is constructed", "A class with 1000 lines of code", "A CSS style definition", "A SQL query function"],
                    "correct": 0,
                    "explanation": "Metaclasses instantiate and customize class definitions during class creation."
                },
                {
                    "id": 14,
                    "question": "What is the Outbox Pattern in microservice event publishing?",
                    "options": ["Writing event messages to a database outbox table in the same transaction as state updates, then publishing asynchronously", "Sending physical mail", "Deleting sent emails", "Storing files in Google Drive"],
                    "correct": 0,
                    "explanation": "The Outbox Pattern guarantees dual-write consistency between database changes and message queue events."
                },
                {
                    "id": 15,
                    "question": "What is DB Deadlock and how do you prevent it?",
                    "options": ["When two transactions hold locks and wait for locks held by each other; prevented by acquiring locks in a consistent order", "When hard drive crashes", "When internet disconnects", "When server runs out of RAM"],
                    "correct": 0,
                    "explanation": "Consistent lock ordering across transactions avoids circular wait conditions."
                },
                {
                    "id": 16,
                    "question": "How does HTTP/2 multiplexing improve performance over HTTP/1.1?",
                    "options": ["Interleaves multiple request/response streams concurrently over a single TCP connection", "Encrypts HTML text with 256-bit keys", "Deletes CSS files", "Uses satellite internet"],
                    "correct": 0,
                    "explanation": "Multiplexing eliminates head-of-line blocking by multiplexing parallel streams on one socket."
                },
                {
                    "id": 17,
                    "question": "What is CDC (Change Data Capture)?",
                    "options": ["Streaming real-time database row insertions, updates, and deletions from transaction logs to external search or analytics clusters", "A virus scanner", "A file compression tool", "A CSS grid layout"],
                    "correct": 0,
                    "explanation": "CDC tools (e.g. Debezium) capture database log mutations for event-driven synchronization."
                },
                {
                    "id": 18,
                    "question": "What is Pytest-xdist?",
                    "options": ["A plugin that executes Pytest tests in parallel across multiple CPU cores or test runner nodes", "A CSS framework", "A database engine", "A code linter"],
                    "correct": 0,
                    "explanation": "Pytest-xdist distributes test suite execution across worker processes to speed up CI pipelines."
                },
                {
                    "id": 19,
                    "question": "What is JWT signature verification and why is secret key rotation important?",
                    "options": ["Verifies cryptographic hash integrity to prevent token tampering; secret rotation limits impact of compromised keys", "Changes user passwords daily", "Compresses JSON strings", "Deletes expired tokens from disk"],
                    "correct": 0,
                    "explanation": "Cryptographic signatures validate token authenticity without requiring DB lookups on every call."
                },
                {
                    "id": 20,
                    "question": "What is Garbage Collection (GC) in Python?",
                    "options": ["Reference counting supplemented by a cyclic generational garbage collector to reclaim unreachable memory objects", "Deleting spam emails", "Cleaning temporary folder on disk", "Removing unused CSS rules"],
                    "correct": 0,
                    "explanation": "Python combines reference counting with a cyclic GC to detect and free circular reference object graphs."
                }
            ]
        }
    },
    "frontend-react": {
        "id": "frontend-react",
        "title": "Frontend Engineer (React / TypeScript)",
        "category": "Frontend Development",
        "icon": "Layout",
        "description": "Build high-performance, accessible React applications using TypeScript, Tailwind CSS, Zustand, and Next.js.",
        "skills": ["React", "TypeScript", "Next.js", "Tailwind CSS", "Zustand", "Vite", "Framer Motion"],
        "requirements": [
            "Expertise in modern React 18+ (Hooks, Context, Suspense, Concurrent Rendering) and TypeScript.",
            "Proficiency in CSS design systems, Tailwind CSS, responsive layouts, and WCAG accessibility standards.",
            "State management experience with Zustand, Redux Toolkit, or React Query / TanStack Query.",
            "Understanding of build tooling (Vite/Webpack), SSR/SSG rendering patterns (Next.js), and DOM performance optimization.",
            "Familiarity with component unit testing (Jest/React Testing Library) and micro-interactions (Framer Motion)."
        ],
        "faqs": [
            {
                "id": 1,
                "question": "How do you optimize render performance in large React component trees?",
                "answer_star": "Situation: A complex data grid component was experiencing lag during user filter interactions.\nTask: Achieve 60fps rendering without UI stutters.\nAction: Virtualized table rows with react-window, memoized item components with React.memo, and decoupled atomic state using Zustand selectors.\nResult: Eliminated unnecessary re-renders and improved render speed by 65%.",
                "key_points": ["Component Virtualization", "React.memo", "Zustand Selectors", "Render Profiler"]
            }
        ],
        "questions": {
            "fresher": [
                {
                    "id": 1,
                    "question": "What is React?",
                    "options": ["An open-source JavaScript library for building user interfaces", "A relational database", "A Python web server", "A mobile operating system"],
                    "correct": 0,
                    "explanation": "React is a declarative, component-based UI library created by Meta."
                },
                {
                    "id": 2,
                    "question": "What is JSX in React?",
                    "options": ["A syntax extension for JavaScript that allows writing HTML-like markup inside JavaScript files", "A database query syntax", "A CSS preprocessor", "A JSON format"],
                    "correct": 0,
                    "explanation": "JSX allows developers to describe UI structures inline with JavaScript logic."
                },
                {
                    "id": 3,
                    "question": "Which hook runs side-effects in functional React components?",
                    "options": ["useEffect", "useState", "useContext", "useRef"],
                    "correct": 0,
                    "explanation": "useEffect performs side-effects like data fetching, subscriptions, or DOM updates."
                },
                {
                    "id": 4,
                    "question": "What is TypeScript?",
                    "options": ["A strongly typed programming language that builds on JavaScript by adding static type definitions", "A database engine", "A CSS framework", "A text editor"],
                    "correct": 0,
                    "explanation": "TypeScript compiles to plain JavaScript, catching type errors during development."
                },
                {
                    "id": 5,
                    "question": "How do you pass data from parent to child components in React?",
                    "options": ["Via Props", "Via SQL queries", "Via LocalStorage only", "Via HTML comments"],
                    "correct": 0,
                    "explanation": "Props (properties) pass data downward from parent to child components."
                },
                {
                    "id": 6,
                    "question": "What is the Virtual DOM in React?",
                    "options": ["A lightweight in-memory representation of the real DOM used to compute efficient UI updates", "A physical monitor screen", "A server hard drive", "A CSS file"],
                    "correct": 0,
                    "explanation": "React uses the Virtual DOM to diff changes and batch DOM updates efficiently."
                },
                {
                    "id": 7,
                    "question": "Which command initializes a Vite React application?",
                    "options": ["npm create vite@latest", "git init", "python main.py", "docker run"],
                    "correct": 0,
                    "explanation": "`npm create vite@latest` scaffolds a fast Vite frontend project."
                },
                {
                    "id": 8,
                    "question": "What is Tailwind CSS?",
                    "options": ["A utility-first CSS framework for rapidly building custom user interfaces", "A Python package", "A SQL database", "A browser extension"],
                    "correct": 0,
                    "explanation": "Tailwind CSS provides atomic utility classes directly inside component markup."
                },
                {
                    "id": 9,
                    "question": "What is the key attribute used for in React lists?",
                    "options": ["Helps React identify which items have changed, been added, or removed during re-renders", "Styles element font color", "Deletes list items", "Connects to database"],
                    "correct": 0,
                    "explanation": "Unique keys allow React's diffing algorithm to reconcile array items efficiently."
                },
                {
                    "id": 10,
                    "question": "What does `npm run build` do in a frontend project?",
                    "options": ["Compiles, bundles, and minifies production-ready static assets", "Deletes project folder", "Starts backend Python server", "Installs Node.js"],
                    "correct": 0,
                    "explanation": "Build scripts bundle JS, CSS, and assets into an optimized production dist folder."
                }
            ],
            "intermediate": [
                {
                    "id": 1,
                    "question": "What is the difference between `useCallback` and `useMemo` in React?",
                    "options": ["`useCallback` caches a function instance; `useMemo` caches the calculated result of a function", "They are identical", "`useMemo` only works on strings", "`useCallback` reloads browser"],
                    "correct": 0,
                    "explanation": "`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`."
                },
                {
                    "id": 2,
                    "question": "What is Prop Drilling in React and how do you avoid it?",
                    "options": ["Passing props through multiple intermediate components; avoided using React Context or state management stores like Zustand", "Drilling physical holes in computer", "Writing SQL scripts", "Deleting CSS classes"],
                    "correct": 0,
                    "explanation": "Context and state management stores allow components to consume state directly without passing props through intermediate layers."
                },
                {
                    "id": 3,
                    "question": "How does `useRef` differ from `useState` in React?",
                    "options": ["`useRef` returns a mutable object whose `.current` property persists without triggering re-renders when mutated", "`useState` does not trigger re-renders", "`useRef` only holds numbers", "`useRef` deletes state"],
                    "correct": 0,
                    "explanation": "Updating a ref value does not cause component re-renders, unlike updating state via useState."
                },
                {
                    "id": 4,
                    "question": "What is TypeScript `interface` versus `type` alias?",
                    "options": ["Interfaces are extendable via declaration merging; types can define primitives, unions, and tuples flexibly", "Interfaces compile to C++", "Types are only for numbers", "They are completely incompatible"],
                    "correct": 0,
                    "explanation": "Interfaces are best for object shapes and OOP inheritance; types support complex union and intersection logic."
                },
                {
                    "id": 5,
                    "question": "What is Server-Side Rendering (SSR) in Next.js?",
                    "options": ["Pre-rendering HTML on the server for each request, improving initial load speed and SEO", "Rendering pages inside user's local GPU", "Running React on Python server", "Deleting client JavaScript"],
                    "correct": 0,
                    "explanation": "SSR generates HTML on the server per request, delivering pre-rendered content directly to the browser."
                },
                {
                    "id": 6,
                    "question": "What is code splitting and dynamic import in React?",
                    "options": ["Splitting application bundles into smaller chunks loaded on-demand via `React.lazy()` or `import()`", "Splitting code across 2 monitors", "Deleting unused files", "Writing CSS grid"],
                    "correct": 0,
                    "explanation": "Code splitting reduces initial bundle download size by loading route chunks lazily."
                },
                {
                    "id": 7,
                    "question": "What is Framer Motion in React development?",
                    "options": ["A production-ready motion library for creating smooth declarative animations in React", "A SQL database builder", "A backend Python server", "A browser bug detector"],
                    "correct": 0,
                    "explanation": "Framer Motion provides simple declarative animation components and gestures for React."
                },
                {
                    "id": 8,
                    "question": "What is the purpose of React.StrictMode?",
                    "options": ["A development tool that highlights potential problems, side-effect bugs, and deprecated API usages", "Disables all CSS styles", "Locks computer screen", "Speeds up internet connection"],
                    "correct": 0,
                    "explanation": "StrictMode intentionally double-invokes effects in dev mode to catch impure lifecycle side-effects."
                },
                {
                    "id": 9,
                    "question": "How do you handle async data fetching in React without useEffect boilerplate?",
                    "options": ["Use query management libraries like TanStack Query / React Query or SWR", "Write 100 lines of raw fetch code", "Use static JSON files", "Disable network access"],
                    "correct": 0,
                    "explanation": "React Query manages caching, refetching, loading states, and error states automatically."
                },
                {
                    "id": 10,
                    "question": "What is Accessibility (a11y) in web development?",
                    "options": ["Designing websites usable by people of all abilities, including screen reader support and keyboard navigation", "Making website load in 1ms", "Using dark mode only", "Writing JavaScript in C++"],
                    "correct": 0,
                    "explanation": "Web accessibility ensures equal access for users relying on assistive technologies."
                },
                {
                    "id": 11,
                    "question": "What does CSS flexbox `justify-content: space-between` do?",
                    "options": ["Distributes items evenly along main axis with first item at start and last item at end", "Centers items vertically", "Hides flex items", "Rotates items 90 degrees"],
                    "correct": 0,
                    "explanation": "`space-between` places equal space between flex items along the main axis."
                },
                {
                    "id": 12,
                    "question": "What is the purpose of TypeScript Generics `<T>`?",
                    "options": ["Allows creating reusable components and functions that work over a variety of types rather than a single one", "Generates random numbers", "Creates generic CSS styles", "Deletes TypeScript types"],
                    "correct": 0,
                    "explanation": "Generics provide type safety while preserving flexibility across different data types."
                },
                {
                    "id": 13,
                    "question": "What is a Controlled Component in React forms?",
                    "options": ["A form input element whose value is driven and managed by React state", "An input that cannot be typed into", "A component with no props", "A server component"],
                    "correct": 0,
                    "explanation": "Controlled components sync input values directly with state via `value` and `onChange` handlers."
                },
                {
                    "id": 14,
                    "question": "What is the difference between `LocalStorage` and `SessionStorage`?",
                    "options": ["LocalStorage persists data until explicitly cleared; SessionStorage clears data when the browser tab closes", "SessionStorage holds 1GB; LocalStorage holds 1KB", "LocalStorage only works on mobile", "They are identical"],
                    "correct": 0,
                    "explanation": "SessionStorage lifespan is tied to the current browser tab session."
                },
                {
                    "id": 15,
                    "question": "What is `React.memo`?",
                    "options": ["A higher-order component that skips re-rendering a component if its props have not changed", "A React hook for state", "A SQL query builder", "A CSS style helper"],
                    "correct": 0,
                    "explanation": "`React.memo` performs shallow prop comparison to optimize rendering performance."
                }
            ],
            "senior": [
                {
                    "id": 1,
                    "question": "How does React 18 Concurrent Mode (`useTransition` and `useDeferredValue`) improve user input responsiveness?",
                    "options": ["Allows marking non-urgent UI state updates as interruptible transitions so urgent inputs like typing remain fluid", "Increases GPU clock speed", "Disables JavaScript execution", "Runs React on WebAssembly"],
                    "correct": 0,
                    "explanation": "Concurrent features allow React to interrupt heavy background renders when user input events fire."
                },
                {
                    "id": 2,
                    "question": "What is Micro-Frontend Architecture?",
                    "options": ["Decomposing a monolithic frontend application into independently deployable feature applications composed at runtime", "Using tiny 10px font sizes", "Writing small CSS files", "Building mobile apps only"],
                    "correct": 0,
                    "explanation": "Micro-frontends allow independent engineering teams to build and deploy distinct UI verticals."
                },
                {
                    "id": 3,
                    "question": "What is the difference between Client Components and Server Components in Next.js App Router?",
                    "options": ["Server Components execute exclusively on the server and send zero JS bundle to client; Client Components execute on client for interactivity", "Server Components run on client GPU", "Client Components run on SQL server", "They are identical"],
                    "correct": 0,
                    "explanation": "React Server Components reduce client JS bundle size by executing server-side rendering logic."
                },
                {
                    "id": 4,
                    "question": "How do you eliminate layout shift (CLS - Cumulative Layout Shift) in modern web applications?",
                    "options": ["Reserve explicit width/height aspect-ratio dimensions for images, fonts, and async dynamic content containers", "Delete all images", "Disable CSS grid", "Use 100% fixed pixel width on body"],
                    "correct": 0,
                    "explanation": "Reserving layout bounds prevents unexpected content shifts during image or font loading."
                },
                {
                    "id": 5,
                    "question": "What is Tree Shaking in JavaScript bundlers (Vite/Webpack)?",
                    "options": ["Dead-code elimination that removes unused ES module exports from the final production JS bundle", "Shaking monitor screen", "Formatting file folders", "Deleting CSS classes"],
                    "correct": 0,
                    "explanation": "Tree shaking analyzes ES static `import/export` statements to discard unreferenced code."
                },
                {
                    "id": 6,
                    "question": "What is Hydration in Server-Side Rendered (SSR) React apps?",
                    "options": ["The process where React attaches event listeners to pre-rendered HTML sent by the server to make it interactive", "Downloading images", "Drinking water while coding", "Connecting to database"],
                    "correct": 0,
                    "explanation": "Hydration matches client-side component state with server-generated DOM nodes."
                },
                {
                    "id": 7,
                    "question": "How do TypeScript conditional types (`T extends U ? X : Y`) work?",
                    "options": ["Selects one of two possible types based on a type relationship test condition at compile time", "Executes runtime if/else loops", "Validates CSS colors", "Queries SQL databases"],
                    "correct": 0,
                    "explanation": "Conditional types enable dynamic utility types based on type relationships."
                },
                {
                    "id": 8,
                    "question": "What is Web Vitals and why are LCP, FID/INP, and CLS critical metrics?",
                    "options": ["Standardized performance metrics measured by Google assessing loading speed, interactivity, and visual stability", "Metrics measuring CPU fan speed", "Number of lines of code", "Database RAM usage"],
                    "correct": 0,
                    "explanation": "Core Web Vitals directly impact user experience quality and search engine SEO rankings."
                },
                {
                    "id": 9,
                    "question": "How do Service Workers enable Offline Support and Progressive Web Apps (PWAs)?",
                    "options": ["Act as background network proxies intercepting network requests and serving cached assets from CacheStorage", "Install Linux OS", "Run server SQL queries", "Increase RAM size"],
                    "correct": 0,
                    "explanation": "Service Workers run on background threads, managing cache strategies and offline fallbacks."
                },
                {
                    "id": 10,
                    "question": "What is the difference between Shadow DOM and Virtual DOM?",
                    "options": ["Shadow DOM provides scoped CSS and DOM encapsulation for Web Components; Virtual DOM is React's in-memory diffing mechanism", "Shadow DOM is React's state store", "Virtual DOM is CSS styling", "They are identical"],
                    "correct": 0,
                    "explanation": "Shadow DOM encapsulates component styles natively in the browser DOM."
                },
                {
                    "id": 11,
                    "question": "What is the PRPL pattern in web performance?",
                    "options": ["Push critical resources, Render initial route, Pre-cache remaining routes, Lazy-load assets", "Print Resume PDF Layout", "Python React PostgreSQL LangChain", "Public Private Restricted Protection"],
                    "correct": 0,
                    "explanation": "PRPL optimizes web application delivery over slow mobile network connections."
                },
                {
                    "id": 12,
                    "question": "How do you implement atomic state updates in Zustand?",
                    "options": ["Define state selectors so components subscribe strictly to specific state slices rather than the whole store", "Reload page on every change", "Use global JavaScript variables", "Store state in text file"],
                    "correct": 0,
                    "explanation": "Selector functions ensure components re-render only when their specific slice changes."
                },
                {
                    "id": 13,
                    "question": "What is Content Security Policy (CSP) header?",
                    "options": ["An HTTP header restricting which domain origins can execute scripts, fonts, and frames on a web page", "A CSS font rule", "A SQL permissions script", "A Python package"],
                    "correct": 0,
                    "explanation": "CSP headers mitigate Cross-Site Scripting (XSS) and data injection attacks."
                },
                {
                    "id": 14,
                    "question": "What is the purpose of Module Federation in Webpack 5?",
                    "options": ["Allows multiple separate Webpack builds to dynamically share modules and components at runtime without re-building", "Combines 2 CSS files", "Installs Node.js", "Creates Docker container"],
                    "correct": 0,
                    "explanation": "Module Federation enables micro-frontend architectures with shared runtime dependencies."
                },
                {
                    "id": 15,
                    "question": "What is WebAssembly (Wasm) and when is it used in frontend applications?",
                    "options": ["A binary instruction format for executing C/C++/Rust code in browsers at near-native speed for heavy computation", "A database engine", "A CSS framework", "A text editor"],
                    "correct": 0,
                    "explanation": "WebAssembly allows CPU-intensive tasks like video encoding or CAD processing to run fast in browsers."
                },
                {
                    "id": 16,
                    "question": "How does React Error Boundary work?",
                    "options": ["Class component implementing `componentDidCatch` or `getDerivedStateFromError` to catch JS errors in child component tree", "A try/catch inside JSX", "A CSS border color", "A backend logger"],
                    "correct": 0,
                    "explanation": "Error boundaries catch render errors in subtrees and render fallback UI instead of crashing."
                },
                {
                    "id": 17,
                    "question": "What is DOM Event Delegation and why is it efficient?",
                    "options": ["Attaching a single event listener to a parent container to handle events triggered by dynamic child elements via bubbling", "Deleting event listeners", "Refreshing page on click", "Using inline onclick attributes"],
                    "correct": 0,
                    "explanation": "Event delegation reduces memory overhead by managing events at a shared ancestor element."
                },
                {
                    "id": 18,
                    "question": "What is the difference between debounce and throttle utility functions?",
                    "options": ["Debounce delays execution until after N ms of inactivity; Throttle limits execution to at most once per N ms interval", "They are identical", "Debounce deletes code", "Throttle increases screen resolution"],
                    "correct": 0,
                    "explanation": "Debounce waits for a pause in events; throttle enforces a fixed execution rate."
                },
                {
                    "id": 19,
                    "question": "What is Static Site Generation (SSG) in Next.js?",
                    "options": ["Generating HTML pages at build time that are served via CDN for ultra-fast performance", "Rendering pages on client GPU", "Running SQL queries on page click", "Creating static PDF files"],
                    "correct": 0,
                    "explanation": "SSG pre-computes HTML files during deployment, serving static content from edge CDNs."
                },
                {
                    "id": 20,
                    "question": "How does Virtualization (e.g. `react-window` / `react-virtualized`) optimize rendering of 100,000 list items?",
                    "options": ["Renders only visible viewport DOM nodes, dynamically recycling elements as the user scrolls", "Renders all 100,000 items in DOM at once", "Deletes invisible items forever", "Converts list to text file"],
                    "correct": 0,
                    "explanation": "Virtualization maintains a tiny DOM footprint regardless of array size by rendering only visible rows."
                }
            ]
        }
    },
    "devops-cloud": {
        "id": "devops-cloud",
        "title": "DevOps & Cloud Engineer (Docker / AWS)",
        "category": "Cloud & Infrastructure",
        "icon": "Cloud",
        "description": "Manage CI/CD pipelines, Docker containerization, Kubernetes orchestration, Infrastructure as Code, and AWS cloud.",
        "skills": ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD", "Linux", "Nginx"],
        "requirements": [
            "Experience with Docker containerization, multi-stage builds, and Kubernetes orchestration.",
            "Proficiency in Cloud infrastructure (AWS EC2, S3, RDS, ECS/EKS, IAM, VPC).",
            "Infrastructure as Code (Terraform/CloudFormation) and CI/CD pipelines (GitHub Actions/GitLab CI).",
            "Strong Linux sysadmin, networking (DNS, TCP/IP, SSL/TLS, Nginx), and shell scripting.",
            "Monitoring and logging telemetry using Prometheus, Grafana, and ELK stack."
        ],
        "faqs": [
            {
                "id": 1,
                "question": "How do you structure zero-downtime deployments in Kubernetes?",
                "answer_star": "Situation: Deployment updates were causing momentary 502 HTTP gateway errors during pod replacement.\nTask: Achieve 100% uptime during rolling updates.\nAction: Configured readiness and liveness probes, set maxSurge: 25% and maxUnavailable: 0 in Deployment spec, and added terminationGracePeriodSeconds.\nResult: Zero dropped requests during production container updates.",
                "key_points": ["RollingUpdate Strategy", "Readiness Probes", "MaxUnavailable: 0", "Graceful Termination"]
            }
        ],
        "questions": {
            "fresher": [
                {
                    "id": 1,
                    "question": "What is Docker?",
                    "options": ["A containerization platform for packaging applications and dependencies", "A database engine", "A text editor", "A programming language"],
                    "correct": 0,
                    "explanation": "Docker packages applications into lightweight containers for deployment."
                },
                {
                    "id": 2,
                    "question": "What is AWS?",
                    "options": ["Amazon Web Services, a comprehensive cloud computing platform", "A web browser", "A SQL syntax", "A Linux distribution"],
                    "correct": 0,
                    "explanation": "AWS provides cloud infrastructure services including compute, storage, and databases."
                },
                {
                    "id": 3,
                    "question": "What does CI/CD stand for?",
                    "options": ["Continuous Integration and Continuous Deployment/Delivery", "Code Inspection and Code Debugging", "Computer Interface / Central Data", "Cloud Installation / Cloud Deletion"],
                    "correct": 0,
                    "explanation": "CI/CD automates code building, testing, and deployment pipelines."
                },
                {
                    "id": 4,
                    "question": "Which command checks disk space usage in Linux?",
                    "options": ["df -h", "ls", "pwd", "cd"],
                    "correct": 0,
                    "explanation": "`df -h` reports file system disk space usage in human-readable format."
                },
                {
                    "id": 5,
                    "question": "What is Nginx?",
                    "options": ["An open-source high-performance HTTP web server and reverse proxy", "A database system", "A programming language", "A container tool"],
                    "correct": 0,
                    "explanation": "Nginx is widely used as a reverse proxy, load balancer, and web server."
                },
                {
                    "id": 6,
                    "question": "What is Kubernetes?",
                    "options": ["An open-source container orchestration platform for automating deployment and scaling", "A code editor", "A CSS framework", "A database ORM"],
                    "correct": 0,
                    "explanation": "Kubernetes automates pod scaling, container management, and failover."
                },
                {
                    "id": 7,
                    "question": "Which port does HTTPS standard traffic use?",
                    "options": ["443", "80", "22", "8080"],
                    "correct": 0,
                    "explanation": "HTTPS traffic defaults to TCP port 443; HTTP defaults to port 80."
                },
                {
                    "id": 8,
                    "question": "What is SSH used for?",
                    "options": ["Secure Remote Shell command-line access to Linux servers", "Downloading MP3 files", "Writing React code", "Formatting CSS text"],
                    "correct": 0,
                    "explanation": "Secure Shell (SSH) provides encrypted terminal access to remote machines."
                },
                {
                    "id": 9,
                    "question": "What is Amazon S3?",
                    "options": ["Scalable cloud object storage for files, images, and backups", "A relational SQL engine", "A CPU processor", "A domain registrar"],
                    "correct": 0,
                    "explanation": "Amazon S3 is object storage designed for storing data files in cloud buckets."
                },
                {
                    "id": 10,
                    "question": "What file defines Docker container configuration instructions?",
                    "options": ["Dockerfile", "index.html", "package.json", "style.css"],
                    "correct": 0,
                    "explanation": "A Dockerfile contains step-by-step commands to build a container image."
                }
            ],
            "intermediate": [
                {
                    "id": 1,
                    "question": "What is Infrastructure as Code (IaC)?",
                    "options": ["Managing and provisioning cloud infrastructure through code files (e.g. Terraform) rather than manual console clicks", "Writing HTML code on a server", "Printing physical server diagrams", "Installing Windows OS"],
                    "correct": 0,
                    "explanation": "IaC enables repeatable, version-controlled cloud infrastructure deployments."
                },
                {
                    "id": 2,
                    "question": "In Kubernetes, what is a Pod?",
                    "options": ["The smallest deployable computing unit in Kubernetes, containing one or more co-located containers", "A hardware server rack", "A SQL database row", "A Docker image"],
                    "correct": 0,
                    "explanation": "Pods encapsulate containers, storage resources, and unique network IPs."
                },
                {
                    "id": 3,
                    "question": "What is the difference between Docker image and Docker container?",
                    "options": ["A Docker image is a read-only blueprint template; a container is a runnable instance of an image", "They mean the same thing", "A container is a text file; an image is a database", "An image only runs on Windows"],
                    "correct": 0,
                    "explanation": "Images are static templates; containers are executing runtime instances."
                },
                {
                    "id": 4,
                    "question": "What is GitHub Actions workflow defined in?",
                    "options": ["YAML files inside `.github/workflows/` directory", "HTML files in root directory", "CSS stylesheets", "Python main.py"],
                    "correct": 0,
                    "explanation": "GitHub Actions reads automation pipeline specs from `.github/workflows/*.yml`."
                },
                {
                    "id": 5,
                    "question": "What is Amazon EC2?",
                    "options": ["Elastic Compute Cloud, providing scalable virtual machine instances in AWS", "An S3 bucket", "A DNS service", "A code editor"],
                    "correct": 0,
                    "explanation": "EC2 provides customizable virtual cloud server instances."
                },
                {
                    "id": 6,
                    "question": "What is Amazon RDS?",
                    "options": ["Relational Database Service for managing PostgreSQL, MySQL, and Oracle in AWS", "A container registry", "A frontend framework", "A domain name router"],
                    "correct": 0,
                    "explanation": "Amazon RDS handles provisioning, patching, and backups for relational SQL databases."
                },
                {
                    "id": 7,
                    "question": "In Linux, what command changes file permissions?",
                    "options": ["chmod", "chown", "grep", "cat"],
                    "correct": 0,
                    "explanation": "`chmod` modifies read, write, and execute permissions on files."
                },
                {
                    "id": 8,
                    "question": "What is a Reverse Proxy load balancer in AWS (e.g. ALB)?",
                    "options": ["Application Load Balancer distributing HTTP traffic across target groups based on request routing rules", "A hard drive cable", "A CSS grid layout", "A Python function"],
                    "correct": 0,
                    "explanation": "ALB operates at Layer 7 to route incoming application traffic across target instances."
                },
                {
                    "id": 9,
                    "question": "What is Prometheus used for?",
                    "options": ["An open-source monitoring system and time-series metric storage for cloud services", "Writing React code", "Managing SQL users", "Designing UI logos"],
                    "correct": 0,
                    "explanation": "Prometheus scrapes and stores metric time-series data for alert management."
                },
                {
                    "id": 10,
                    "question": "What is Grafana?",
                    "options": ["An open-source visualization and dashboarding platform for metrics and telemetry data", "A Linux OS release", "A database engine", "A CSS framework"],
                    "correct": 0,
                    "explanation": "Grafana connects to Prometheus and database sources to display interactive health dashboards."
                },
                {
                    "id": 11,
                    "question": "What is AWS IAM?",
                    "options": ["Identity and Access Management for securely controlling access to AWS resources and permissions", "An image editing tool", "A DNS router", "A container builder"],
                    "correct": 0,
                    "explanation": "IAM defines role policies and user credentials for cloud resource authorization."
                },
                {
                    "id": 12,
                    "question": "What is Terraform state file (`terraform.tfstate`)?",
                    "options": ["Tracks provisioned real-world cloud infrastructure mappings against configuration files", "A Python script file", "A Linux log file", "An HTML template"],
                    "correct": 0,
                    "explanation": "The state file maps code definitions to actual provisioned resource IDs."
                },
                {
                    "id": 13,
                    "question": "In Kubernetes, what is a Service (`ClusterIP` / `NodePort` / `LoadBalancer`)?",
                    "options": ["An abstraction defining a logical set of Pods and a policy to access them via network endpoint", "A physical server", "A Python function", "A Docker volume"],
                    "correct": 0,
                    "explanation": "Services expose Pod deployments over stable virtual IP addresses."
                },
                {
                    "id": 14,
                    "question": "What is SSL/TLS Termination?",
                    "options": ["Decrypting HTTPS traffic at a load balancer or reverse proxy before forwarding unencrypted traffic to backend instances", "Deleting SSL certificates", "Stopping website servers", "Blocking all internet traffic"],
                    "correct": 0,
                    "explanation": "TLS termination offloads CPU-intensive encryption handling from internal microservices."
                },
                {
                    "id": 15,
                    "question": "What is a Cron Job in Linux?",
                    "options": ["A time-based job scheduler executing shell commands or scripts at scheduled intervals", "A hard drive benchmark", "A Python web framework", "A CSS animation"],
                    "correct": 0,
                    "explanation": "Crontab schedules automated background scripts (e.g. daily backups)."
                }
            ],
            "senior": [
                {
                    "id": 1,
                    "question": "What is GitOps and how does ArgoCD or Flux enforce cluster state alignment?",
                    "options": ["Using Git repositories as single source of truth for Declarative Infrastructure; CD agents pull state and auto-reconcile drift", "Pushing code without testing", "Deleting Git branches", "Writing code in production"],
                    "correct": 0,
                    "explanation": "GitOps continuously synchronizes Kubernetes cluster states with Git repository declarations."
                },
                {
                    "id": 2,
                    "question": "How do you implement Disaster Recovery with Multi-Region AWS Active-Active deployment?",
                    "options": ["Route 53 latency-based routing, DynamoDB Global Tables / RDS Aurora Global Databases, and cross-region S3 replication", "Backing up code to flash drive", "Using 1 single server in Virginia", "Turning off servers on weekend"],
                    "correct": 0,
                    "explanation": "Multi-region active-active architectures provide seamless failover and sub-second data synchronization."
                },
                {
                    "id": 3,
                    "question": "What is horizontal pod autoscaling (HPA) in Kubernetes?",
                    "options": ["Automatically scaling pod replica counts based on observed CPU/memory utilization or custom metric thresholds", "Buying bigger CPU hardware", "Deleting idle databases", "Restarting nodes"],
                    "correct": 0,
                    "explanation": "HPA adjusts Deployment replica counts dynamically based on real-time telemetry."
                },
                {
                    "id": 4,
                    "question": "What is VPC Peering versus AWS Transit Gateway?",
                    "options": ["VPC Peering connects 2 VPCs directly; Transit Gateway acts as a central hub for interconnecting thousands of VPCs and on-prem networks", "They are identical", "Transit Gateway is for S3 files", "VPC Peering is a CSS property"],
                    "correct": 0,
                    "explanation": "Transit Gateway simplifies complex star-topology network routing across enterprise AWS accounts."
                },
                {
                    "id": 5,
                    "question": "How does Chaos Engineering (e.g. Chaos Mesh or Gremlin) strengthen cloud infrastructure resilience?",
                    "options": ["Intentionally injecting faults (network latency, pod failures) in staging/production to uncover systemic weaknesses before outages occur", "Deleting production databases randomly", "Hacking competitor servers", "Disabling firewalls"],
                    "correct": 0,
                    "explanation": "Chaos engineering validates self-healing microservice logic under simulated degradation."
                },
                {
                    "id": 6,
                    "question": "What is Immutable Infrastructure?",
                    "options": ["Replacing servers entirely with new pre-built container/AMI instances rather than modifying running servers in-place", "Hardening physical server case", "Never updating software", "Writing read-only SQL queries"],
                    "correct": 0,
                    "explanation": "Immutable deployments eliminate configuration drift by deploying fresh immutable instances for updates."
                },
                {
                    "id": 7,
                    "question": "What is Secret Management (e.g. HashiCorp Vault or AWS Secrets Manager)?",
                    "options": ["Securely storing, rotating, and dynamic leasing database credentials and API tokens with strict audit logging", "Writing passwords in plain text files", "Sending API keys in Slack", "Storing credentials in public GitHub"],
                    "correct": 0,
                    "explanation": "Secret managers prevent hardcoding credentials by providing encrypted key storage with automatic rotation."
                },
                {
                    "id": 8,
                    "question": "What is Service Mesh (e.g. Istio or Linkerd) in Kubernetes?",
                    "options": ["A dedicated infrastructure layer managing service-to-service communication via sidecar proxies providing mTLS encryption, traffic splitting, and tracing", "A CSS grid layout", "A physical cable mesh", "A database engine"],
                    "correct": 0,
                    "explanation": "Service meshes inject sidecar proxies to manage mTLS security, telemetry, and canary traffic splits."
                },
                {
                    "id": 9,
                    "question": "How do Linux cgroups (control groups) isolate container resource consumption?",
                    "options": ["Limits, accounts for, and isolates CPU, memory, disk I/O usage for groups of processes", "Deletes temporary Linux files", "Formats hard drives", "Changes user passwords"],
                    "correct": 0,
                    "explanation": "cgroups enforce resource boundaries, preventing any single container from exhausting host resources."
                },
                {
                    "id": 10,
                    "question": "What is the purpose of Kubernetes Ingress Controllers (e.g. Nginx Ingress or Traefik)?",
                    "options": ["Manages external HTTP/HTTPS routing into cluster Services based on hostnames and URL paths", "Installs Docker on host", "Deletes failed pods", "Creates database tables"],
                    "correct": 0,
                    "explanation": "Ingress controllers act as reverse proxies handling external domain routing to internal services."
                },
                {
                    "id": 11,
                    "question": "What is BGP (Border Gateway Protocol) in cloud networking?",
                    "options": ["Standardized exterior gateway protocol designed to exchange routing and reachability information between autonomous systems", "A CSS selector", "A database index type", "A Python package"],
                    "correct": 0,
                    "explanation": "BGP manages routing paths across global internet networks and AWS DirectConnect connections."
                },
                {
                    "id": 12,
                    "question": "What is Canary Deployment strategy?",
                    "options": ["Rolling out changes to a small subset of users (e.g. 5%) first to monitor error rates before full rollout", "Deploying code at 5:00 AM", "Deleting old deployments", "Deploying only on Fridays"],
                    "correct": 0,
                    "explanation": "Canary releases limit blast radius by testing new versions on live traffic subsets."
                },
                {
                    "id": 13,
                    "question": "How does AWS CloudFront CDN decrease latency for global users?",
                    "options": ["Caches static and dynamic content at global Edge Locations close to end users", "Increases CPU clock on server", "Compresses SQL text", "Converts videos to MP3"],
                    "correct": 0,
                    "explanation": "CloudFront caches content across hundreds of edge locations, minimizing network distance."
                },
                {
                    "id": 14,
                    "question": "What is StatefulSet versus Deployment in Kubernetes?",
                    "options": ["StatefulSets manage stateful workloads requiring unique sticky identities and persistent volume mounts; Deployments manage stateless pods", "Deployments are for databases; StatefulSets are for HTML", "They are identical", "StatefulSets cannot be scaled"],
                    "correct": 0,
                    "explanation": "StatefulSets preserve ordinal pod indexing and dedicated storage volumes across restarts."
                },
                {
                    "id": 15,
                    "question": "What is eBPF (Extended Berkeley Packet Filter) in Linux kernel observability and security?",
                    "options": ["Executes sandboxed programs inside the Linux kernel to trace networking, security events, and performance without kernel modifications", "A database engine", "A CSS framework", "A text editor"],
                    "correct": 0,
                    "explanation": "eBPF provides ultra-efficient low-overhead kernel-level tracing and network packet filtering."
                },
                {
                    "id": 16,
                    "question": "What is FinOps in cloud engineering?",
                    "options": ["Cultural practice and strategy of bringing financial accountability to variable cloud spending through cost optimization", "Financial accounting software", "Writing tax code in Python", "Buying domain names"],
                    "correct": 0,
                    "explanation": "FinOps optimizes cloud spending through reserved instances, rightsizing, and resource tracking."
                },
                {
                    "id": 17,
                    "question": "What is Blue-Green deployment?",
                    "options": ["Running two identical production environments (Blue active, Green new) and switching router traffic instantly upon validation", "Painting server racks blue and green", "Deploying code during day and night", "Using 2 SQL databases"],
                    "correct": 0,
                    "explanation": "Blue-Green deployment ensures instant failback by maintaining an identical parallel environment."
                },
                {
                    "id": 18,
                    "question": "What is a Pod Disruption Budget (PDB) in Kubernetes?",
                    "options": ["Limits the number of concurrent pods that can be down simultaneously during voluntary disruptions like node upgrades", "A financial budget for cloud server cost", "A Docker limit", "A SQL query timeout"],
                    "correct": 0,
                    "explanation": "PDBs guarantee high availability during cluster maintenance by capping offline pod replicas."
                },
                {
                    "id": 19,
                    "question": "What is Prometheus Alertmanager?",
                    "options": ["Handles alerts sent by Prometheus client applications, deduplicating, grouping, and routing them to PagerDuty/Slack", "A Python web server", "A Linux OS installer", "A database index"],
                    "correct": 0,
                    "explanation": "Alertmanager manages notification routing, silence rules, and alert deduplication."
                },
                {
                    "id": 20,
                    "question": "How do Linux namespaces provide container isolation?",
                    "options": ["Wraps global system resources (PID, Mount, Network, IPC) into isolated view abstractions per container process", "Encrypts hard drives", "Deletes temporary files", "Creates virtual CPUs"],
                    "correct": 0,
                    "explanation": "Namespaces restrict what system resources a process can see and interact with in Linux."
                }
            ]
        }
    },
    "data-science": {
        "id": "data-science",
        "title": "Data Scientist & ML Engineer",
        "category": "Data Science & AI",
        "icon": "BarChart2",
        "description": "Develop predictive ML models, feature engineering pipelines, neural networks, and MLOps deployment.",
        "skills": ["Python", "Scikit-Learn", "Pandas", "NumPy", "PyTorch", "MLflow", "SQL"],
        "requirements": [
            "Proficiency in Data Preprocessing, Feature Engineering, and Statistical Modeling with Python (Pandas/NumPy).",
            "Supervised and Unsupervised Learning algorithms (Random Forest, XGBoost, Regression, Clustering).",
            "Deep Learning frameworks (PyTorch/TensorFlow) and NLP techniques (SentenceTransformers).",
            "SQL data querying, feature store management, and visualization (Matplotlib/Seaborn/PowerBI).",
            "MLOps lifecycle management, model versioning (MLflow), and model API deployment."
        ],
        "faqs": [
            {
                "id": 1,
                "question": "How do you handle class imbalance in machine learning datasets?",
                "answer_star": "Situation: A fraud detection dataset had 99% non-fraud and 1% fraud sample records.\nTask: Build a classifier with high recall without over-predicting false positives.\nAction: Applied SMOTE (Synthetic Minority Over-sampling Technique), adjusted decision thresholds, and evaluated model using PR-AUC and F1-score.\nResult: Achieved 92% recall on minority fraud cases.",
                "key_points": ["SMOTE Oversampling", "Threshold Tuning", "PR-AUC vs Accuracy", "Class Weights"]
            }
        ],
        "questions": {
            "fresher": [
                {
                    "id": 1,
                    "question": "What is Pandas in Python?",
                    "options": ["A data manipulation and analysis library built around DataFrame objects", "A zoo animal", "A web browser", "A game engine"],
                    "correct": 0,
                    "explanation": "Pandas is standard for structured data manipulation and tabular analysis."
                },
                {
                    "id": 2,
                    "question": "What is Supervised Learning?",
                    "options": ["Training an ML model on labeled training data containing input features and known target outputs", "Training without data", "Manual data entry", "Writing HTML code"],
                    "correct": 0,
                    "explanation": "Supervised learning algorithms learn mapping functions from input features to target labels."
                },
                {
                    "id": 3,
                    "question": "Which Python library is standard for scientific computing and n-dimensional array operations?",
                    "options": ["NumPy", "Flask", "React", "Tkinter"],
                    "correct": 0,
                    "explanation": "NumPy provides high-performance vector and matrix math operations."
                },
                {
                    "id": 4,
                    "question": "What is Overfitting in machine learning?",
                    "options": ["When a model learns training noise and details so well that it fails to generalize to unseen test data", "When data file is too large", "When CPU overheats", "When data is deleted"],
                    "correct": 0,
                    "explanation": "Overfitting happens when models memorize training data instead of learning generalizable patterns."
                },
                {
                    "id": 5,
                    "question": "What does R-squared (R²) evaluate in regression models?",
                    "options": ["The proportion of variance in the dependent variable predictable from independent variables", "Computer RAM speed", "File size in MB", "Number of columns in SQL"],
                    "correct": 0,
                    "explanation": "R² quantifies how well regression predictions approximate real data points."
                },
                {
                    "id": 6,
                    "question": "Which metric evaluates classification model performance by comparing True Positives and False Positives?",
                    "options": ["Precision and Recall", "File download speed", "CPU clock speed", "Line count"],
                    "correct": 0,
                    "explanation": "Precision measures target accuracy; Recall measures target coverage."
                },
                {
                    "id": 7,
                    "question": "What is Scikit-Learn?",
                    "options": ["A comprehensive Python machine learning library containing regression, classification, and clustering tools", "A database engine", "A CSS framework", "A web browser"],
                    "correct": 0,
                    "explanation": "Scikit-Learn provides simple, efficient tools for predictive data analysis."
                },
                {
                    "id": 8,
                    "question": "What is a Confusion Matrix?",
                    "options": ["A tabular layout summarizing True Positives, False Positives, True Negatives, and False Negatives", "A confusing Python bug", "A database query error", "A CSS grid"],
                    "correct": 0,
                    "explanation": "Confusion matrices detail classification model prediction distributions."
                },
                {
                    "id": 9,
                    "question": "What is Matplotlib / Seaborn used for?",
                    "options": ["Data visualization and plotting charts in Python", "Building REST APIs", "Database migrations", "Writing HTML templates"],
                    "correct": 0,
                    "explanation": "Matplotlib and Seaborn render line charts, histograms, heatmaps, and scatter plots."
                },
                {
                    "id": 10,
                    "question": "What is Mean Squared Error (MSE)?",
                    "options": ["The average of squared differences between predicted values and actual target values", "Average website speed", "Percentage of missing data", "Number of database rows"],
                    "correct": 0,
                    "explanation": "MSE measures prediction error variance in regression tasks."
                }
            ],
            "intermediate": [
                {
                    "id": 1,
                    "question": "What is Random Forest algorithm?",
                    "options": ["An ensemble learning method that builds multiple decision trees and merges predictions via bagging", "A single decision tree", "A neural network layer", "A database search index"],
                    "correct": 0,
                    "explanation": "Random Forest combines randomized decision trees to reduce variance and overfitting."
                },
                {
                    "id": 2,
                    "question": "What is K-Fold Cross-Validation?",
                    "options": ["Splitting data into K subsets, training K times on K-1 folds, and testing on the remaining fold to assess generalization", "Folding paper data", "Deleting 10% of rows", "Creating 5 duplicate tables"],
                    "correct": 0,
                    "explanation": "Cross-validation provides robust performance estimation across data subsets."
                },
                {
                    "id": 3,
                    "question": "What is Feature Scaling (Standardization vs Normalization)?",
                    "options": ["Standardization transforms data to zero mean and unit variance; Normalization scales values into a 0 to 1 range", "Changing font size", "Deleting outlier rows", "Sorting columns alphabetically"],
                    "correct": 0,
                    "explanation": "Feature scaling prevents features with larger numerical magnitudes from dominating distance metrics."
                },
                {
                    "id": 4,
                    "question": "What is Gradient Boosting (e.g. XGBoost or LightGBM)?",
                    "options": ["Ensemble technique that builds decision trees sequentially, with each tree correcting errors made by previous trees", "Increasing GPU clock speed", "Deleting missing data", "Writing parallel SQL scripts"],
                    "correct": 0,
                    "explanation": "Boosting fits consecutive weak learners to residual prediction errors."
                },
                {
                    "id": 5,
                    "question": "What is PCA (Principal Component Analysis)?",
                    "options": ["An unsupervised dimensionality reduction technique that transforms features into orthogonal principal components maximizing variance", "A SQL JOIN command", "A Python package manager", "A React component"],
                    "correct": 0,
                    "explanation": "PCA projects high-dimensional data onto lower-dimensional principal component axes."
                },
                {
                    "id": 6,
                    "question": "What is SMOTE used for?",
                    "options": ["Synthetic Minority Over-sampling Technique to balance imbalanced classification target distributions", "Deleting null values", "Encrypting database passwords", "Compiling Python code"],
                    "correct": 0,
                    "explanation": "SMOTE generates synthetic minority class examples along feature space line segments."
                },
                {
                    "id": 7,
                    "question": "What is MLflow used for in MLOps?",
                    "options": ["Tracking experiment metrics, parameters, code versions, and packaging model artifacts", "Writing React frontend code", "Designing CSS styles", "Running Linux servers"],
                    "correct": 0,
                    "explanation": "MLflow manages the complete machine learning lifecycle, from tracking to deployment."
                },
                {
                    "id": 8,
                    "question": "What is the Activation Function in Neural Networks (e.g. ReLU)?",
                    "options": ["Introduces non-linear decision boundaries into the neural network mapping", "Turns off computer screen", "Validates HTML code", "Deletes model weights"],
                    "correct": 0,
                    "explanation": "Activation functions enable neural networks to learn non-linear feature relationships."
                },
                {
                    "id": 9,
                    "question": "What is Hyperparameter Tuning (GridSearch vs RandomizedSearch)?",
                    "options": ["Systematically searching configuration parameter combinations to optimize model validation scores", "Writing Python comments", "Updating SQL table schemas", "Formatting JSON output"],
                    "correct": 0,
                    "explanation": "Grid and random search evaluate parameter combinations against validation metrics."
                },
                {
                    "id": 10,
                    "question": "What is K-Means Clustering?",
                    "options": ["An unsupervised clustering algorithm that partitions data points into K clusters around centroid means", "A supervised regression model", "A neural network architecture", "A SQL query statement"],
                    "correct": 0,
                    "explanation": "K-Means iteratively updates K centroid positions to minimize intra-cluster variance."
                },
                {
                    "id": 11,
                    "question": "What is the ROC-AUC score?",
                    "options": ["Area Under the Receiver Operating Characteristic curve measuring classification discrimination ability across all thresholds", "Percentage of missing data", "Average file size", "Speed of Python code"],
                    "correct": 0,
                    "explanation": "ROC-AUC quantifies how well a classifier distinguishes between positive and negative classes."
                },
                {
                    "id": 12,
                    "question": "What is One-Hot Encoding?",
                    "options": ["Converting categorical variables into binary indicator vectors (0s and 1s)", "Encrypting text files", "Deleting non-numerical columns", "Sorting data in descending order"],
                    "correct": 0,
                    "explanation": "One-hot encoding converts categorical labels into numeric columns for model training."
                },
                {
                    "id": 13,
                    "question": "What is Data Drift in production ML models?",
                    "options": ["Changes in input data distribution over time causing production model accuracy degradation", "Moving files across folders", "Deleting database tables", "Updating Python packages"],
                    "correct": 0,
                    "explanation": "Data drift occurs when inference inputs diverge from training distribution statistical properties."
                },
                {
                    "id": 14,
                    "question": "What is PyTorch `DataLoader`?",
                    "options": ["Batches, shuffles, and loads datasets asynchronously for efficient GPU neural network training", "Downloads datasets from internet", "Deletes temporary images", "Creates React components"],
                    "correct": 0,
                    "explanation": "DataLoader simplifies batching, shuffling, and multi-process data loading in PyTorch."
                },
                {
                    "id": 15,
                    "question": "What is the difference between L1 (Lasso) and L2 (Ridge) Regularization?",
                    "options": ["L1 adds absolute weight sum (drives coefficients to zero); L2 adds squared weight sum (penalizes large weights)", "They are identical", "L1 is for images; L2 is for text", "L2 deletes data rows"],
                    "correct": 0,
                    "explanation": "L1 regularization performs feature selection by shrinking insignificant feature weights to exact zero."
                }
            ],
            "senior": [
                {
                    "id": 1,
                    "question": "How do you address Data Leakage in time-series predictive modeling pipelines?",
                    "options": ["Use TimeSeriesSplit cross-validation and ensure feature engineering parameters are computed strictly on past training windows", "Shuffle all rows randomly", "Use future data to fill missing past values", "Delete date columns"],
                    "correct": 0,
                    "explanation": "Time-aware splitting prevents future test set information from leaking into training feature transformations."
                },
                {
                    "id": 2,
                    "question": "What is SHAP (SHapley Additive exPlanations) in Model Explainability?",
                    "options": ["A game-theoretic framework measuring feature attribution values to explain individual model predictions", "A computer monitor calibration tool", "A database search index", "A Python web framework"],
                    "correct": 0,
                    "explanation": "SHAP values quantify how much each feature pushes a prediction away from the baseline average."
                },
                {
                    "id": 3,
                    "question": "What is the vanishing gradient problem in deep neural networks and how is it mitigated?",
                    "options": ["Gradients shrink exponentially during backpropagation; mitigated using ReLU, Residual Connections (ResNets), and LayerNorm", "Gradients become infinite", "Model weights delete automatically", "CPU fan stops running"],
                    "correct": 0,
                    "explanation": "Residual connections allow gradients to flow directly through skip connections without vanishing."
                },
                {
                    "id": 4,
                    "question": "What is Concept Drift versus Data Drift?",
                    "options": ["Data drift is change in input feature distribution; Concept drift is change in statistical relationship between features and target output", "They mean the same thing", "Concept drift is for text only", "Data drift only happens in SQL"],
                    "correct": 0,
                    "explanation": "Concept drift occurs when the underlying ground truth mapping P(Y|X) changes over time."
                },
                {
                    "id": 5,
                    "question": "What is Feature Store in enterprise MLOps (e.g. Feast or Hopsworks)?",
                    "options": ["Centralized repository for serving consistent feature engineering transformations across offline training and online real-time inference", "A store selling software CDs", "A SQL database backup folder", "A CSS UI component"],
                    "correct": 0,
                    "explanation": "Feature stores eliminate train-serve skew by synchronizing batch and streaming feature definitions."
                },
                {
                    "id": 6,
                    "question": "How does Attention Mechanism work in Transformer neural architectures?",
                    "options": ["Calculates dynamic Query-Key dot-product attention weights to represent contextual relationships between all tokens in a sequence", "Turns off idle GPU cores", "Ignores long text sentences", "Filters out numbers"],
                    "correct": 0,
                    "explanation": "Self-attention computes dynamic weight matrices allowing models to attend to all sequence tokens simultaneously."
                },
                {
                    "id": 7,
                    "question": "What is Model Quantization (e.g. FP16 to INT8)?",
                    "options": ["Compressing model parameter weight precision to reduce memory footprint and accelerate inference on edge/CPU hardware", "Deleting model layers", "Increasing model size by 4x", "Writing models in HTML"],
                    "correct": 0,
                    "explanation": "Quantization reduces float precision, drastically cutting RAM and GPU memory usage."
                },
                {
                    "id": 8,
                    "question": "What is Early Stopping in training deep learning models?",
                    "options": ["Halting model training when validation loss stops improving for a specified number of epochs (patience) to prevent overfitting", "Unplugging the computer", "Stopping training after 1 second", "Deleting model checkpoints"],
                    "correct": 0,
                    "explanation": "Early stopping monitors validation metrics and stops training before overfitting degrades generalization."
                },
                {
                    "id": 9,
                    "question": "What is AB Testing in machine learning deployment?",
                    "options": ["Routing a portion of live user traffic to a new candidate model vs control model to evaluate real business KPI metrics", "Testing keyboard keys A and B", "Comparing 2 Python scripts", "Deleting 50% of user data"],
                    "correct": 0,
                    "explanation": "A/B testing validates whether a newly deployed model yields statistically significant business metric improvements."
                },
                {
                    "id": 10,
                    "question": "What is the curse of dimensionality?",
                    "options": ["As feature dimensions increase, data becomes sparse in high-dimensional space making distance metrics less informative", "Having 1000 SQL rows", "Having small hard drive space", "A syntax error"],
                    "correct": 0,
                    "explanation": "High dimensionality dilutes distance metrics like Euclidean distance, requiring exponential data to sample space."
                },
                {
                    "id": 11,
                    "question": "What is Low-Rank Adaptation (LoRA) for fine-tuning Large Language Models?",
                    "options": ["Freezes pretrained model weights and injects trainable rank decomposition matrices into Transformer layers", "Deletes half of model layers", "Trains model from scratch", "Converts model to Python text"],
                    "correct": 0,
                    "explanation": "LoRA drastically reduces trainable parameter counts during fine-tuning while retaining performance."
                },
                {
                    "id": 12,
                    "question": "What is Model Distillation (Teacher-Student Framework)?",
                    "options": ["Training a smaller, faster student model to replicate outputs and soft probability distributions of a large teacher model", "Downloading model weights", "Compressing PDF files", "Filtering out duplicate rows"],
                    "correct": 0,
                    "explanation": "Distillation transfers knowledge from large complex models to lightweight inference models."
                },
                {
                    "id": 13,
                    "question": "How do gradient clipping methods prevent exploding gradients in Recurrent / Transformer Networks?",
                    "options": ["Rescales parameter gradient norms to a maximum threshold when gradients exceed safe numerical limits", "Deletes negative gradients", "Multiplies gradients by zero", "Stops model training"],
                    "correct": 0,
                    "explanation": "Gradient clipping caps gradient step sizes, maintaining numerical stability during backpropagation."
                },
                {
                    "id": 14,
                    "question": "What is TF-IDF (Term Frequency-Inverse Document Frequency)?",
                    "options": ["A numerical statistic reflecting how important a word is to a document relative to a corpus collection", "A vector database index", "A neural network loss function", "A Python package manager"],
                    "correct": 0,
                    "explanation": "TF-IDF penalizes common stop words while emphasizing rare informative keywords in document collections."
                },
                {
                    "id": 15,
                    "question": "What is cosine distance versus Euclidean distance in high-dimensional vector search?",
                    "options": ["Cosine distance measures orientation/angle independent of magnitude; Euclidean measures straight-line spatial distance", "They are identical", "Euclidean is for text; Cosine is for images", "Cosine distance cannot be negative"],
                    "correct": 0,
                    "explanation": "Cosine similarity focuses on directional vector alignment, making it ideal for text embeddings regardless of length."
                },
                {
                    "id": 16,
                    "question": "What is Kernel Trick in Support Vector Machines (SVM)?",
                    "options": ["Implicitly mapping data into higher-dimensional feature spaces to find linear separating hyperplanes without computing coordinates", "A trick to speed up CPU", "A Python function", "A database index"],
                    "correct": 0,
                    "explanation": "Kernel functions compute inner products in high-dimensional spaces efficiently."
                },
                {
                    "id": 17,
                    "question": "What is Precision-Recall AUC versus ROC-AUC for highly imbalanced target classification?",
                    "options": ["PR-AUC focuses on minority positive class performance without being skewed by large True Negative counts", "ROC-AUC is always better", "They give identical numbers", "PR-AUC is for regression"],
                    "correct": 0,
                    "explanation": "PR-AUC provides clearer performance differentiation when evaluating rare event detection."
                },
                {
                    "id": 18,
                    "question": "What is Model Drift monitoring via Kolmogorov-Smirnov (KS) test?",
                    "options": ["Statistical test comparing continuous output probability distributions between baseline training data and production inference", "Testing Wi-Fi signal strength", "Checking hard drive bad sectors", "Formatting SQL queries"],
                    "correct": 0,
                    "explanation": "KS tests determine whether production output distributions statistically deviate from baseline."
                },
                {
                    "id": 19,
                    "question": "What is Softmax Function in Multi-Class Classification?",
                    "options": ["Normalizes a vector of K real values into a probability distribution summing to 1", "Multiplies numbers by 2", "Deletes negative numbers", "Calculates mean squared error"],
                    "correct": 0,
                    "explanation": "Softmax converts raw logits into class probability scores."
                },
                {
                    "id": 20,
                    "question": "What is PyTorch `torch.no_grad()`?",
                    "options": ["Disables autograd gradient calculation context, reducing memory consumption during model evaluation and inference", "Deletes model checkpoint files", "Disables network internet access", "Stops Python process"],
                    "correct": 0,
                    "explanation": "`torch.no_grad()` turns off gradient tracking, saving RAM and speeding up prediction passes."
                }
            ]
        }
    },
    "java-engineer": {
        "id": "java-engineer",
        "title": "Java Software Engineer (Spring Boot)",
        "category": "Enterprise Development",
        "icon": "Cpu",
        "description": "Design high-scale enterprise microservices, REST APIs, and database transactions using Java 17+, Spring Boot, and Hibernate.",
        "skills": ["Java", "Spring Boot", "Spring Data JPA", "PostgreSQL", "Microservices", "Maven", "Kafka"],
        "requirements": [
            "Strong core Java 17+ fundamentals (Streams, Concurrency, OOP, Memory Management).",
            "Proficiency in Spring Boot 3+, Spring Security, Spring Data JPA / Hibernate ORM.",
            "REST API design, DTO mapping, transactional boundaries (@Transactional), and microservices.",
            "Experience with build tools (Maven/Gradle) and database management (PostgreSQL/MySQL)."
        ],
        "faqs": [
            {
                "id": 1,
                "question": "How does Spring Boot handle dependency injection and auto-configuration?",
                "answer_star": "Situation: Needed to build a modular enterprise payment gateway.\nTask: Expose modular Spring Beans without complex XML configurations.\nAction: Used `@SpringBootApplication`, `@Autowired` constructor injection, and custom `@Configuration` classes.\nResult: Clean dependency injection and rapid microservice startup.",
                "key_points": ["Spring ApplicationContext", "Constructor Injection", "AutoConfiguration", "Spring Beans"]
            }
        ],
        "questions": {
            "fresher": [
                {
                    "id": 1,
                    "question": "What is the JVM in Java development?",
                    "options": ["Java Virtual Machine that executes compiled Java bytecode", "A database engine", "A CSS framework", "A text editor"],
                    "correct": 0,
                    "explanation": "JVM converts Java bytecode into machine-level instructions for host operating systems."
                },
                {
                    "id": 2,
                    "question": "What is Spring Boot?",
                    "options": ["An opinionated framework for building standalone production-grade Spring applications", "A computer hard drive", "A browser plugin", "A CSS framework"],
                    "correct": 0,
                    "explanation": "Spring Boot minimizes Spring configuration with auto-configuration and embedded servers."
                },
                {
                    "id": 3,
                    "question": "Which annotations mark a class as a REST controller in Spring Boot?",
                    "options": ["@RestController", "@ComponentOnly", "@Servlet", "@Page"],
                    "correct": 0,
                    "explanation": "@RestController combines @Controller and @ResponseBody for REST API responses."
                },
                {
                    "id": 4,
                    "question": "What is the difference between JDK and JRE?",
                    "options": ["JDK includes development tools (javac compiler); JRE only contains runtime execution libraries", "They are identical", "JRE is for C++ only", "JDK is a database"],
                    "correct": 0,
                    "explanation": "JDK is for developing Java applications; JRE is for running pre-compiled applications."
                },
                {
                    "id": 5,
                    "question": "What is Maven?",
                    "options": ["A build automation and dependency management tool using `pom.xml`", "A database management GUI", "A React component", "A text editor"],
                    "correct": 0,
                    "explanation": "Maven manages project dependencies, build lifecycles, and plugins."
                },
                {
                    "id": 6,
                    "question": "What is Hibernate in Java?",
                    "options": ["An Object-Relational Mapping (ORM) framework for mapping Java objects to database tables", "A sleep mode for computers", "A CSS framework", "A Python package"],
                    "correct": 0,
                    "explanation": "Hibernate simplifies database interaction by mapping Java entities to SQL tables."
                },
                {
                    "id": 7,
                    "question": "Which access modifier allows visibility only within the same class?",
                    "options": ["private", "public", "protected", "default"],
                    "correct": 0,
                    "explanation": "private members are encapsulated and accessible strictly inside the declaring class."
                },
                {
                    "id": 8,
                    "question": "What is garbage collection in Java?",
                    "options": ["Automatic memory management that reclaims unreferenced heap objects", "Deleting spam emails", "Formatting hard drives", "Closing browser tabs"],
                    "correct": 0,
                    "explanation": "JVM Garbage Collector automatically frees memory occupied by unreachable objects."
                },
                {
                    "id": 9,
                    "question": "What is an Interface in Java?",
                    "options": ["A reference type specifying abstract methods that classes must implement", "A physical monitor screen", "A SQL database row", "A CSS stylesheet"],
                    "correct": 0,
                    "explanation": "Interfaces define contracts for classes to implement."
                },
                {
                    "id": 10,
                    "question": "Which exception is thrown when accessing a null object reference in Java?",
                    "options": ["NullPointerException", "IndexOutOfBoundsException", "ClassNotFoundException", "IOException"],
                    "correct": 0,
                    "explanation": "NullPointerException occurs when attempting to dereference a null object pointer."
                }
            ],
            "intermediate": [
                {
                    "id": 1,
                    "question": "What is the purpose of `@Transactional` in Spring Framework?",
                    "options": ["Wraps method execution inside a database transaction boundary with auto-commit or rollback on exception", "Encrypts user passwords", "Translates text to Spanish", "Deletes temporary files"],
                    "correct": 0,
                    "explanation": "@Transactional manages database transactions declaratively."
                },
                {
                    "id": 2,
                    "question": "What is Java Stream API introduced in Java 8?",
                    "options": ["A functional processing pipeline for collections supporting filter, map, and reduce operations", "A video streaming service", "A database engine", "A CSS animation"],
                    "correct": 0,
                    "explanation": "Streams allow functional-style operations on elements sequences."
                },
                {
                    "id": 3,
                    "question": "What is the difference between `String`, `StringBuilder`, and `StringBuffer`?",
                    "options": ["String is immutable; StringBuilder is mutable (non-thread-safe); StringBuffer is mutable and thread-safe", "They are identical", "StringBuilder is for HTML", "String uses 100MB RAM"],
                    "correct": 0,
                    "explanation": "StringBuilder is fast for single-threaded string concatenation; StringBuffer is synchronized."
                },
                {
                    "id": 4,
                    "question": "What is Spring Data JPA repository interface?",
                    "options": ["Provides pre-built CRUD and pagination methods without writing boilerplate SQL queries", "A database engine", "A frontend UI component", "A text editor"],
                    "correct": 0,
                    "explanation": "JpaRepository provides ready-to-use database access methods."
                },
                {
                    "id": 5,
                    "question": "What is Java Memory Model (Heap vs Stack)?",
                    "options": ["Heap stores dynamic objects and instance variables; Stack stores method frames, primitive locals, and reference pointers", "Heap is for images; Stack is for text", "Stack is on hard drive", "They are identical"],
                    "correct": 0,
                    "explanation": "Stack handles method call execution frames; Heap stores shared object instances."
                },
                {
                    "id": 6,
                    "question": "What is `@SpringBootTest` used for?",
                    "options": ["Annotates integration test classes to bootstrap the complete Spring ApplicationContext", "Deletes failing tests", "Formats code", "Installs Maven"],
                    "correct": 0,
                    "explanation": "@SpringBootTest loads full context for end-to-end integration testing."
                },
                {
                    "id": 7,
                    "question": "What is Lombok library in Java?",
                    "options": ["Reduces boilerplate code using annotations like `@Data`, `@Getter`, `@Setter`, and `@AllArgsConstructor`", "A database engine", "A React library", "A Linux OS"],
                    "correct": 0,
                    "explanation": "Lombok generates getters, setters, and constructors at compile time."
                },
                {
                    "id": 8,
                    "question": "What is the difference between `@Component`, `@Service`, and `@Repository` in Spring?",
                    "options": ["They are specialized `@Component` stereotypes for general beans, business logic layer, and DAO data layer", "They are completely different languages", "Repository is for React", "Service is for HTML"],
                    "correct": 0,
                    "explanation": "Stereotypes organize Spring beans by architectural layer."
                },
                {
                    "id": 9,
                    "question": "What is `Optional<T>` in Java 8?",
                    "options": ["A container object used to explicitly represent present or missing values to prevent NullPointerExceptions", "A parameter for CSS", "An optional SQL database", "A Python package"],
                    "correct": 0,
                    "explanation": "Optional models nullability explicitly in method return types."
                },
                {
                    "id": 10,
                    "question": "What is Spring Security?",
                    "options": ["A powerful authentication and access-control framework for Java enterprise applications", "A physical lock for servers", "A database backup tool", "A CSS framework"],
                    "correct": 0,
                    "explanation": "Spring Security handles authentication, authorization, and protection against web attacks."
                },
                {
                    "id": 11,
                    "question": "What is Java Reflection API?",
                    "options": ["Inspects and modifies class runtime behavior, fields, and methods dynamically", "Reflects monitor screen light", "Copies files on disk", "Formats SQL queries"],
                    "correct": 0,
                    "explanation": "Reflection allows dynamic inspection and invocation of class members at runtime."
                },
                {
                    "id": 12,
                    "question": "What is `@PathVariable` vs `@RequestParam` in Spring MVC?",
                    "options": ["`@PathVariable` extracts URI path segment parameters; `@RequestParam` extracts query string parameters", "They are identical", "@RequestParam is for HTML", "@PathVariable is for CSS"],
                    "correct": 0,
                    "explanation": "@PathVariable maps URI placeholders `/users/{id}`; @RequestParam maps `/users?id=1`."
                },
                {
                    "id": 13,
                    "question": "What is CompletableFuture in Java 8+",
                    "options": ["Represents asynchronous non-blocking computation stages with composable callbacks", "A future version of Java", "A database table", "A React component"],
                    "correct": 0,
                    "explanation": "CompletableFuture supports asynchronous event chaining and parallel processing."
                },
                {
                    "id": 14,
                    "question": "What is Java Garbage Collection G1 (Garbage-First)?",
                    "options": ["A low-latency generational garbage collector that partitions heap into region blocks", "A file deletion tool", "A SQL query optimizer", "A Maven plugin"],
                    "correct": 0,
                    "explanation": "G1 GC minimizes pause times by prioritizing regions with most garbage."
                },
                {
                    "id": 15,
                    "question": "What is Flyway in Spring Boot?",
                    "options": ["An open-source database migration tool that uses SQL scripts for versioned schema updates", "A frontend UI router", "A container builder", "A Java compiler"],
                    "correct": 0,
                    "explanation": "Flyway applies versioned SQL migration scripts on application startup."
                }
            ],
            "senior": [
                {
                    "id": 1,
                    "question": "What are Java Virtual Threads (Project Loom in Java 21)?",
                    "options": ["Lightweight user-mode threads managed by the JVM that dramatically increase concurrency throughput over OS platform threads", "Threads on GPU", "Virtual reality headsets", "HTML tags"],
                    "correct": 0,
                    "explanation": "Virtual threads allow millions of concurrent tasks with minimal memory overhead."
                },
                {
                    "id": 2,
                    "question": "How do you prevent LazyInitializationException in Hibernate?",
                    "options": ["Eager load relationships, use JOIN FETCH queries, or initialize proxies within active transaction boundary", "Disable transactions", "Delete child entities", "Restart server"],
                    "correct": 0,
                    "explanation": "LazyInitializationException occurs when accessing uninitialized lazy proxies outside an active Session."
                },
                {
                    "id": 3,
                    "question": "What is Spring Cloud Eureka and API Gateway?",
                    "options": ["Eureka handles service discovery registry; Gateway routes and load-balances client requests across registered instances", "They format HTML pages", "They compress PDF files", "They delete database tables"],
                    "correct": 0,
                    "explanation": "Eureka registers dynamic microservice IP addresses; Gateway handles central routing."
                },
                {
                    "id": 4,
                    "question": "What is the difference between optimistic locking and pessimistic locking in JPA?",
                    "options": ["Optimistic locking uses a `@Version` field to check for concurrent updates; Pessimistic locking locks DB rows at database level", "They mean the same thing", "Pessimistic locking is for text", "Optimistic locking deletes rows"],
                    "correct": 0,
                    "explanation": "Optimistic locking checks version numbers on commit; Pessimistic locking uses `SELECT FOR UPDATE` locks."
                },
                {
                    "id": 5,
                    "question": "How does Spring AOP (Aspect-Oriented Programming) implement cross-cutting concerns?",
                    "options": ["Uses dynamic proxy objects (JDK dynamic proxies or CGLIB) to intercept method calls for logging, security, and transactions", "Rewrites Java bytecodes directly", "Uses HTML templates", "Deletes class files"],
                    "correct": 0,
                    "explanation": "Spring AOP creates proxy wrappers to execute advice logic before, after, or around target methods."
                },
                {
                    "id": 6,
                    "question": "What is Java ConcurrentHashMap implementation detail?",
                    "options": ["Provides thread-safe read/write operations by partitioning hash table into synchronized segment buckets without locking whole map", "Locks entire JVM", "Deletes keys on collision", "Uses single thread"],
                    "correct": 0,
                    "explanation": "ConcurrentHashMap permits concurrent reads and lock-free operations across independent hash buckets."
                },
                {
                    "id": 7,
                    "question": "What is CQRS (Command Query Responsibility Segregation) pattern?",
                    "options": ["Separates read data models from update/mutation data models to optimize performance and scalability independently", "Combines read and write in 1 SQL query", "Deletes database logs", "Formats CSS files"],
                    "correct": 0,
                    "explanation": "CQRS segregates write operations (Commands) from read operations (Queries)."
                },
                {
                    "id": 8,
                    "question": "What is Saga Pattern in distributed microservices?",
                    "options": ["Manages distributed transactions across multiple microservices via a sequence of local transactions with compensating rollbacks", "A database engine", "A Java frontend framework", "A Maven configuration"],
                    "correct": 0,
                    "explanation": "Sagas guarantee eventual consistency across microservices using compensating undo actions."
                },
                {
                    "id": 9,
                    "question": "What is the volatile keyword in Java memory concurrency?",
                    "options": ["Ensures variable reads and writes go directly to main memory rather than thread CPU caches, guaranteeing visibility across threads", "Makes variables read-only", "Deletes variables on exit", "Speeds up calculation"],
                    "correct": 0,
                    "explanation": "`volatile` guarantees visibility of changes across threads and prevents instruction reordering."
                },
                {
                    "id": 10,
                    "question": "What is JVM tuning parameter `-Xms` vs `-Xmx`?",
                    "options": ["`-Xms` sets initial heap allocation size; `-Xmx` sets maximum heap allocation limit", "`-Xms` sets CPU speed", "`-Xmx` formats hard drive", "They are identical"],
                    "correct": 0,
                    "explanation": "`-Xms` defines starting heap size; `-Xmx` caps maximum allowed heap memory."
                },
                {
                    "id": 11,
                    "question": "What is Spring WebFlux?",
                    "options": ["A fully non-blocking reactive web framework built on Reactive Streams and Netty event loop engine", "A CSS framework", "A SQL migration tool", "A text editor"],
                    "correct": 0,
                    "explanation": "WebFlux enables reactive, event-driven web applications using Mono and Flux types."
                },
                {
                    "id": 12,
                    "question": "What is Java ClassLoader hierarchy?",
                    "options": ["Bootstrap ClassLoader -> Extension/Platform ClassLoader -> Application ClassLoader following delegation principle", "A database table structure", "A React component hierarchy", "A CSS grid layout"],
                    "correct": 0,
                    "explanation": "ClassLoaders load `.class` files dynamically using parent-first delegation."
                },
                {
                    "id": 13,
                    "question": "What is Apache Kafka used for in Java architectures?",
                    "options": ["A high-throughput distributed event streaming platform for real-time data pipelines and messaging", "Writing frontend code", "Designing database tables", "Formatting PDF files"],
                    "correct": 0,
                    "explanation": "Kafka handles real-time data streams and log publication across distributed topic clusters."
                },
                {
                    "id": 14,
                    "question": "What is OutOfMemoryError: Metaspace in Java 8+?",
                    "options": ["Occurs when native memory allocated for class metadata definitions exceeds configured `-XX:MaxMetaspaceSize`", "When hard drive is full", "When Wi-Fi disconnects", "When monitor is off"],
                    "correct": 0,
                    "explanation": "Metaspace stores loaded class metadata in native memory."
                },
                {
                    "id": 15,
                    "question": "What is `@EventListener` in Spring Framework?",
                    "options": ["Binds a method to listen and process application events published via `ApplicationEventPublisher`", "Listens to mouse clicks", "Connects to database", "Formats JSON"],
                    "correct": 0,
                    "explanation": "Allows decoupled event-driven communication inside Spring applications."
                },
                {
                    "id": 16,
                    "question": "What is JDBC Batch Processing?",
                    "options": ["Grouping multiple SQL statements into a single database network call to accelerate bulk write operations", "Deleting database rows", "Writing Java comments", "Formatting HTML code"],
                    "correct": 0,
                    "explanation": "Batch processing executes bulk SQL operations in a single round-trip."
                },
                {
                    "id": 17,
                    "question": "What is Java Module System (JPMS / Project Jigsaw in Java 9+)?",
                    "options": ["Encapsulates packages into modules (`module-info.java`) with explicit module dependency declarations", "A database module", "A React component", "A Maven plugin"],
                    "correct": 0,
                    "explanation": "JPMS modularizes the JDK and applications, controlling package exports."
                },
                {
                    "id": 18,
                    "question": "What is Spring Batch?",
                    "options": ["A lightweight framework for processing large volumes of batch jobs (ETL, CSV imports, report generation)", "A CSS framework", "A database GUI", "A web browser"],
                    "correct": 0,
                    "explanation": "Spring Batch provides robust job execution, chunk processing, and retry capabilities."
                },
                {
                    "id": 19,
                    "question": "What is the Double-Checked Locking pattern in Singleton design?",
                    "options": ["Reduces synchronization overhead by checking singleton instance existence before and after acquiring a lock", "Locks 2 database tables", "Checks passwords twice", "Deletes duplicate objects"],
                    "correct": 0,
                    "explanation": "Double-checked locking ensures thread-safe singleton initialization without locking every access."
                },
                {
                    "id": 20,
                    "question": "What is GraalVM Native Image compilation?",
                    "options": ["Ahead-of-Time (AOT) compiles Java applications into standalone native executables with instant startup and tiny memory footprints", "Compiles HTML to PDF", "Runs Java on WebAssembly", "Deletes JVM"],
                    "correct": 0,
                    "explanation": "GraalVM Native Image compiles Java bytecode into native machine executables."
                }
            ]
        }
    },
    "mobile-android": {
        "id": "mobile-android",
        "title": "Mobile App Developer (Android / React Native)",
        "category": "Mobile Development",
        "icon": "Layout",
        "description": "Build high-performance mobile applications for Android and iOS using React Native, Kotlin, and Jetpack Compose.",
        "skills": ["React Native", "Kotlin", "Android Studio", "TypeScript", "Redux", "REST APIs"],
        "requirements": [
            "Experience building cross-platform mobile apps with React Native / Flutter or native Android (Kotlin).",
            "State management, offline caching (AsyncStorage/SQLite), and REST/GraphQL integration.",
            "Understanding of mobile UI components, navigation, push notifications, and app store deployment.",
            "Knowledge of native bridge modules, mobile performance optimization, and memory profiling."
        ],
        "faqs": [
            {
                "id": 1,
                "question": "How do you optimize list rendering in React Native (FlatList)?",
                "answer_star": "Situation: A dynamic feed list was dropping frames during fast scrolling.\nTask: Achieve 60fps smooth scrolling.\nAction: Optimized FlatList using `getItemLayout`, `keyExtractor`, `removeClippedSubviews`, and memoized item components.\nResult: Eliminated frame drops and smooth scrolling performance.",
                "key_points": ["FlatList Optimization", "getItemLayout", "removeClippedSubviews", "React.memo"]
            }
        ],
        "questions": {
            "fresher": [
                {
                    "id": 1,
                    "question": "What is React Native?",
                    "options": ["A framework for building native iOS and Android apps using React and JavaScript", "A web browser", "A SQL database", "A desktop OS"],
                    "correct": 0,
                    "explanation": "React Native compiles React code into native mobile UI components."
                },
                {
                    "id": 2,
                    "question": "What is Kotlin?",
                    "options": ["A modern, concise programming language official for Android development by Google", "A database engine", "A CSS framework", "A text editor"],
                    "correct": 0,
                    "explanation": "Kotlin is the primary language recommended by Google for native Android app development."
                },
                {
                    "id": 3,
                    "question": "Which React Native component is used to render scrollable lists efficiently?",
                    "options": ["FlatList", "Div", "ScrollView", "Span"],
                    "correct": 0,
                    "explanation": "FlatList virtualizes list items, rendering only visible elements to optimize memory."
                },
                {
                    "id": 4,
                    "question": "What is AsyncStorage in React Native?",
                    "options": ["An unencrypted, asynchronous persistent key-value storage system for mobile devices", "A cloud server", "A SQL table", "A CSS preprocessor"],
                    "correct": 0,
                    "explanation": "AsyncStorage persists simple key-value data on mobile devices."
                },
                {
                    "id": 5,
                    "question": "What does Android Studio provide?",
                    "options": ["The official Integrated Development Environment (IDE) for Android application development", "A web browser", "A backend server", "A CSS editor"],
                    "correct": 0,
                    "explanation": "Android Studio is the official IDE for building, testing, and debugging Android apps."
                },
                {
                    "id": 6,
                    "question": "What is an Activity in native Android development?",
                    "options": ["A single, focused component representing a single screen with a user interface", "A fitness tracker", "A SQL query", "A CSS class"],
                    "correct": 0,
                    "explanation": "An Activity serves as the entry point for user interaction on a screen."
                },
                {
                    "id": 7,
                    "question": "Which file specifies Android app permissions like Camera and Internet?",
                    "options": ["AndroidManifest.xml", "build.gradle", "index.js", "style.css"],
                    "correct": 0,
                    "explanation": "AndroidManifest.xml declares essential app metadata, permissions, and activities."
                },
                {
                    "id": 8,
                    "question": "What is Expo in the React Native ecosystem?",
                    "options": ["A set of tools and services built around React Native to build and deploy mobile apps quickly", "A database engine", "A CSS framework", "A Python package"],
                    "correct": 0,
                    "explanation": "Expo simplifies React Native app development, testing, and device previews."
                },
                {
                    "id": 9,
                    "question": "What is APK in Android?",
                    "options": ["Android Package Kit, the package file format used by Android to distribute and install apps", "A database driver", "A programming language", "A font file"],
                    "correct": 0,
                    "explanation": "APK is the executable binary archive installed on Android devices."
                },
                {
                    "id": 10,
                    "question": "Which hook in React Native handles component mounting lifecycle?",
                    "options": ["useEffect", "useState", "useRef", "useCallback"],
                    "correct": 0,
                    "explanation": "useEffect with an empty dependency array `[]` executes when the component mounts."
                }
            ],
            "intermediate": [
                {
                    "id": 1,
                    "question": "What is the new React Native Architecture (Hermes engine & Fabric renderer)?",
                    "options": ["Hermes is a lightweight JS engine optimized for mobile; Fabric provides synchronous, direct C++ native layout rendering", "A new cloud server", "A SQL database engine", "A CSS preprocessor"],
                    "correct": 0,
                    "explanation": "Hermes improves startup time and reduces memory footprint; Fabric enables direct C++ layout rendering."
                },
                {
                    "id": 2,
                    "question": "How do Native Modules work in React Native?",
                    "options": ["Bridge modules written in Kotlin/Swift exposed to JavaScript to access native device APIs", "Using HTML iframe tags", "Writing CSS code", "Using SQL query scripts"],
                    "correct": 0,
                    "explanation": "Native Modules bridge custom Java/Kotlin or Objective-C/Swift native code to JavaScript."
                },
                {
                    "id": 3,
                    "question": "What is Jetpack Compose in Android development?",
                    "options": ["Android's modern declarative UI toolkit for building native Android interfaces in Kotlin", "A database engine", "A CSS preprocessor", "A build tool"],
                    "correct": 0,
                    "explanation": "Jetpack Compose replaces XML layouts with declarative Kotlin functions."
                },
                {
                    "id": 4,
                    "question": "What is ViewModel in Android Architecture Components?",
                    "options": ["Stores and manages UI-related data in a lifecycle-conscious way so data survives configuration changes like rotation", "A view tag in XML", "A SQL table", "A React component"],
                    "correct": 0,
                    "explanation": "ViewModels retain data state across screen rotation and lifecycle re-creation."
                },
                {
                    "id": 5,
                    "question": "What is Navigation in React Native (React Navigation)?",
                    "options": ["A library for routing and managing screen navigation stacks in React Native apps", "A GPS satellite map", "A SQL query builder", "A CSS layout rule"],
                    "correct": 0,
                    "explanation": "React Navigation manages Stack, Tab, and Drawer navigation in React Native."
                },
                {
                    "id": 6,
                    "question": "What is Push Notification service for Android and iOS?",
                    "options": ["FCM (Firebase Cloud Messaging) and APNs (Apple Push Notification service)", "Sending physical mail", "Writing text files", "Updating SQL database"],
                    "correct": 0,
                    "explanation": "FCM and APNs deliver real-time remote push notifications to mobile devices."
                },
                {
                    "id": 7,
                    "question": "What is Coroutines in Kotlin?",
                    "options": ["Lightweight concurrency design pattern for executing asynchronous tasks without blocking the main UI thread", "A SQL query", "A UI component", "A file compression tool"],
                    "correct": 0,
                    "explanation": "Kotlin Coroutines simplify async programming without heavy thread creation overhead."
                },
                {
                    "id": 8,
                    "question": "What is Gradle in Android project builds?",
                    "options": ["An automated build system that compiles Android resources, dependencies, and packaging into APK/AAB files", "A text editor", "A database engine", "A React hook"],
                    "correct": 0,
                    "explanation": "Gradle manages build configurations, flavor builds, and external dependencies."
                },
                {
                    "id": 9,
                    "question": "What is SQLite / Room DB in Android?",
                    "options": ["Room is an abstraction ORM layer over SQLite database for structured local data persistence", "A cloud server", "A CSS preprocessor", "A React Native bridge"],
                    "correct": 0,
                    "explanation": "Room provides compile-time SQL verification and abstraction over SQLite."
                },
                {
                    "id": 10,
                    "question": "What is the difference between `px`, `dp` (density-independent pixels), and `sp` in Android?",
                    "options": ["`dp` scales with screen pixel density; `sp` scales with screen density AND user font size preference", "They are identical", "`sp` is for images; `dp` is for colors", "`px` is density independent"],
                    "correct": 0,
                    "explanation": "`dp` ensures consistent UI component sizing across different screen densities; `sp` respects user font scaling."
                },
                {
                    "id": 11,
                    "question": "What is Deep Linking in mobile applications?",
                    "options": ["Using URIs (e.g. `myapp://profile/123`) to direct users straight to specific content screens inside an app", "Linking HTML files", "Connecting SQL tables", "Writing CSS links"],
                    "correct": 0,
                    "explanation": "Deep links open specific app screens directly from web URLs or push notifications."
                },
                {
                    "id": 12,
                    "question": "What is the difference between AAB (Android App Bundle) and APK?",
                    "options": ["AAB is uploaded to Google Play, which generates optimized custom APKs for specific device configurations", "AAB is a text file; APK is an image", "They are identical", "APK only works on iOS"],
                    "correct": 0,
                    "explanation": "App Bundles optimize download sizes by delivering device-specific resources."
                },
                {
                    "id": 13,
                    "question": "What is Fastlane in mobile DevOps?",
                    "options": ["An open-source platform that automates building, screenshot generation, and deploying iOS/Android apps to app stores", "A fast internet connection", "A database engine", "A React component"],
                    "correct": 0,
                    "explanation": "Fastlane automates app store deployment workflows and signing certificates."
                },
                {
                    "id": 14,
                    "question": "What is Flexbox in React Native layouts?",
                    "options": ["React Native's core layout engine (using Yoga) with default `flexDirection: 'column'`", "CSS grid only", "HTML block layout", "Absolute pixel positioning only"],
                    "correct": 0,
                    "explanation": "React Native defaults flex direction to `column` for mobile screen layouts."
                },
                {
                    "id": 15,
                    "question": "What is Redux Toolkit in mobile state management?",
                    "options": ["Standard approach for writing Redux logic with simplified store setup, reducers, and `createSlice`", "A database ORM", "A camera plugin", "An Android IDE"],
                    "correct": 0,
                    "explanation": "Redux Toolkit reduces Redux boilerplate for global app state management."
                }
            ],
            "senior": [
                {
                    "id": 1,
                    "question": "How does JavaScript Interface (JSI) in new React Native architecture bypass legacy asynchronous JSON bridges?",
                    "options": ["JSI exposes C++ Host Objects directly to JavaScript, enabling synchronous, direct C++ function calls without JSON serialization", "Using HTTP fetch calls", "By using LocalStorage", "By restarting the app"],
                    "correct": 0,
                    "explanation": "JSI enables direct memory reference sharing between JS and native C++ code."
                },
                {
                    "id": 2,
                    "question": "How do you optimize mobile app cold startup time (TTID - Time to Initial Display)?",
                    "options": ["Enabling Hermes engine pre-compilation, lazy loading non-critical JS modules, and deferring heavy initialization logic", "Increasing image size", "Writing everything in HTML", "Disabling app caching"],
                    "correct": 0,
                    "explanation": "Pre-compiled bytecode and deferred module loading dramatically accelerate app boot times."
                },
                {
                    "id": 3,
                    "question": "What is Hilt / Dagger in Android native architecture?",
                    "options": ["A compile-time dependency injection framework for managing object lifetimes across Android components", "A database engine", "A CSS framework", "A game engine"],
                    "correct": 0,
                    "explanation": "Hilt simplifies Dagger dependency injection across Android activities and ViewModels."
                },
                {
                    "id": 4,
                    "question": "What is Memory Leak detection tool LeakCanary for Android?",
                    "options": ["A library that automatically detects retained Activity/Fragment references and memory leaks in Android apps", "A bird image generator", "A code linter", "A SQL database GUI"],
                    "correct": 0,
                    "explanation": "LeakCanary monitors un-Garbage-Collected objects to detect native memory leaks."
                },
                {
                    "id": 5,
                    "question": "How do you implement Secure Storage on mobile (iOS Keychain & Android Keystore)?",
                    "options": ["Encrypting sensitive tokens using hardware-backed cryptographic keys stored inside device secure enclaves", "Storing tokens in plain text text files", "Saving keys in public GitHub", "Using console.log"],
                    "correct": 0,
                    "explanation": "Keychain and EncryptedSharedPreferences use hardware-backed encryption keys."
                },
                {
                    "id": 6,
                    "question": "What is CodePush / OTA (Over-The-Air) updates in React Native?",
                    "options": ["Deploying JS bundle and asset updates directly to user devices without submitting a new app store release", "Downloading new phones", "Updating Android OS", "Deleting user apps"],
                    "correct": 0,
                    "explanation": "CodePush enables instant JavaScript bundle updates bypassing app store approval."
                },
                {
                    "id": 7,
                    "question": "How do background tasks work on Android (WorkManager)?",
                    "options": ["WorkManager schedules deferrable, guaranteed background work respecting battery optimizations (Doze mode)", "Runs tasks on main thread", "Deletes background apps", "Forces screen to stay on"],
                    "correct": 0,
                    "explanation": "WorkManager handles persistent background tasks across device restarts and battery restrictions."
                },
                {
                    "id": 8,
                    "question": "What is offline-first mobile sync architecture?",
                    "options": ["Reading/writing to local SQLite/Realm DB first, and syncing changes asynchronously to backend with conflict resolution", "Blocking UI when offline", "Deleting data when offline", "Requiring 5G internet at all times"],
                    "correct": 0,
                    "explanation": "Offline-first apps ensure complete app usability offline, synchronizing state upon reconnect."
                },
                {
                    "id": 9,
                    "question": "What is ANR (Application Not Responding) in Android?",
                    "options": ["Occurs when the UI main thread is blocked for more than 5 seconds by heavy processing or synchronous I/O", "When app is deleted", "When phone battery dies", "When internet is slow"],
                    "correct": 0,
                    "explanation": "ANR dialogs appear when long-running operations block the main UI thread."
                },
                {
                    "id": 10,
                    "question": "What is Reanimated 3 in React Native animation?",
                    "options": ["A library executing animations on the UI thread at 60/120fps via worklets without crossing the JS bridge", "A video editor", "A SQL query tool", "A CSS framework"],
                    "correct": 0,
                    "explanation": "Reanimated worklets run directly on the UI thread, bypassing JavaScript bridge lag."
                },
                {
                    "id": 11,
                    "question": "What is ProGuard / R8 in Android build pipeline?",
                    "options": ["Code shrinking, optimization, and obfuscation tool that reduces APK size and protects against reverse engineering", "A database engine", "A camera plugin", "A CSS preprocessor"],
                    "correct": 0,
                    "explanation": "R8 shrinks unused code and obfuscates class/method names to harden APKs."
                },
                {
                    "id": 12,
                    "question": "What is SSL Pinning in mobile security?",
                    "options": ["Hardcoding expected server certificate public keys inside the app to prevent Man-In-The-Middle (MITM) attacks", "Pinning photos to screen", "Disabling HTTPS", "Using HTTP only"],
                    "correct": 0,
                    "explanation": "SSL Pinning ensures the client app connects strictly to servers with matching public key signatures."
                },
                {
                    "id": 13,
                    "question": "What is Kotlin Flow / StateFlow / SharedFlow?",
                    "options": ["Cold and hot reactive data streams for emitting sequential values asynchronously in Kotlin", "A CSS framework", "A SQL migration tool", "A text editor"],
                    "correct": 0,
                    "explanation": "StateFlow and SharedFlow provide reactive state and event streaming in Kotlin."
                },
                {
                    "id": 14,
                    "question": "What is Modular Mobile Architecture by Feature?",
                    "options": ["Structuring app codebase into decoupled feature modules (e.g. `:feature:auth`, `:feature:dashboard`) for faster parallel builds", "Writing 1 giant 10,000 line file", "Using 10 separate apps", "Deleting code folders"],
                    "correct": 0,
                    "explanation": "Feature modularization improves build parallelism and code isolation across large dev teams."
                },
                {
                    "id": 15,
                    "question": "What is Android Lifecycle-aware components?",
                    "options": ["Components that automatically respond to lifecycle state changes (ON_START, ON_PAUSE, ON_DESTROY) without manual listener management", "Battery saving modes", "Screen brightness sliders", "App uninstallation tools"],
                    "correct": 0,
                    "explanation": "Lifecycle-aware components manage their own lifecycle subscriptions cleanly, preventing leaks."
                },
                {
                    "id": 16,
                    "question": "What is TurboModules in React Native Architecture?",
                    "options": ["Lazy-loaded native modules that are instantiated on-demand when accessed by JavaScript", "A Turbo engine in cars", "A fast Wi-Fi router", "A database index"],
                    "correct": 0,
                    "explanation": "TurboModules improve startup time by loading native modules lazily instead of at launch."
                },
                {
                    "id": 17,
                    "question": "What is Android App Links versus Custom Schemes?",
                    "options": ["App Links use verified HTTP domain association (`assetlinks.json`); Custom Schemes use unverified custom URI protocols", "They are identical", "App Links only work on iOS", "Custom schemes are for SQL"],
                    "correct": 0,
                    "explanation": "App Links verify web domain ownership, opening URLs directly in app without disambiguation dialogs."
                },
                {
                    "id": 18,
                    "question": "How do you profile mobile app CPU and GPU performance using Flipper or Android Studio Profiler?",
                    "options": ["Analyzing CPU thread flame charts, memory heap dumps, and GPU rendering frame times", "Taking screenshots", "Writing code comments", "Checking phone battery temperature"],
                    "correct": 0,
                    "explanation": "Profilers visualize frame rendering times, thread activity, and memory allocation bottlenecks."
                },
                {
                    "id": 19,
                    "question": "What is Dynamic Delivery / Dynamic Feature Modules in Android?",
                    "options": ["Downloading specific app feature modules on-demand from Google Play when requested by the user", "Downloading wallpapers", "Deleting app features", "Updating phone firmware"],
                    "correct": 0,
                    "explanation": "Dynamic Feature Modules allow users to download optional features only when needed."
                },
                {
                    "id": 20,
                    "question": "What is Biometric Authentication API (Fingerprint / FaceID) integration?",
                    "options": ["Using Android BiometricPrompt or iOS LocalAuthentication framework to authenticate users securely via hardware sensors", "Comparing photo files", "Asking for 4-digit PIN in plain text", "Deleting app storage"],
                    "correct": 0,
                    "explanation": "BiometricPrompt provides secure device-level biometric authentication."
                }
            ]
        }
    },
    "cyber-security": {
        "id": "cyber-security",
        "title": "Cybersecurity & Web Security Specialist",
        "category": "Security & Audit",
        "icon": "Cpu",
        "description": "Assess web vulnerabilities, OWASP Top 10 risks, penetration testing, cryptosystems, and secure API design.",
        "skills": ["Web Security", "OWASP Top 10", "Penetration Testing", "Cryptography", "Python", "OAuth2", "Linux"],
        "requirements": [
            "Deep understanding of OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, SSRF, Broken Auth).",
            "Proficiency in web application penetration testing, security auditing, and threat modeling.",
            "Knowledge of modern cryptosystems (AES, RSA, ECC, Hashing, TLS 1.3).",
            "Experience with security tools (Burp Suite, Wireshark, Nmap, OWASP ZAP).",
            "Understanding of identity frameworks (OAuth2, OIDC, SAML, JWT) and secure SDLC practices."
        ],
        "faqs": [
            {
                "id": 1,
                "question": "How do you prevent Cross-Site Scripting (XSS) in modern web applications?",
                "answer_star": "Situation: Legacy input fields were vulnerable to reflected XSS injection.\nTask: Secure input handling across the web platform.\nAction: Enforced context-aware output encoding, sanitized HTML with DOMPurify, and configured strict Content Security Policy (CSP) headers.\nResult: Completely mitigated script injection vectors across the application.",
                "key_points": ["Content Security Policy (CSP)", "Context-Aware Encoding", "DOMPurify Sanitization", "HttpOnly Cookies"]
            }
        ],
        "questions": {
            "fresher": [
                {
                    "id": 1,
                    "question": "What is OWASP?",
                    "options": ["Open Web Application Security Project, a non-profit foundation providing web security guidance", "An operating system", "A web browser", "A SQL database"],
                    "correct": 0,
                    "explanation": "OWASP provides free, open standards and guidance for securing software applications."
                },
                {
                    "id": 2,
                    "question": "What is SQL Injection (SQLi)?",
                    "options": ["A vulnerability where malicious SQL statements are inserted into input fields to manipulate database queries", "Injecting medicine into a computer", "Deleting CSS stylesheets", "Faster SQL query execution"],
                    "correct": 0,
                    "explanation": "SQLi occurs when untrusted user input alters database query logic."
                },
                {
                    "id": 3,
                    "question": "What is Cross-Site Scripting (XSS)?",
                    "options": ["A vulnerability allowing attackers to inject malicious client-side scripts into web pages viewed by other users", "A CSS styling tool", "A server reboot command", "A file download protocol"],
                    "correct": 0,
                    "explanation": "XSS attacks execute untrusted JavaScript code in a victim's browser session."
                },
                {
                    "id": 4,
                    "question": "What is HTTPS?",
                    "options": ["Hypertext Transfer Protocol Secure, extending HTTP with TLS/SSL encryption", "A faster version of HTML", "A database engine", "A programming language"],
                    "correct": 0,
                    "explanation": "HTTPS encrypts communications between web browsers and servers."
                },
                {
                    "id": 5,
                    "question": "What is a Firewall?",
                    "options": ["A network security device that monitors and filters incoming and outgoing network traffic based on security rules", "A physical wall made of bricks", "An anti-virus software on phone", "A CSS layout rule"],
                    "correct": 0,
                    "explanation": "Firewalls inspect and control network traffic according to security policies."
                },
                {
                    "id": 6,
                    "question": "What is Phishing?",
                    "options": ["A social engineering attack where attackers impersonate trustworthy entities to steal credentials or data", "Catching fish in river", "Writing Python code", "Debugging SQL queries"],
                    "correct": 0,
                    "explanation": "Phishing deceives victims into revealing sensitive passwords or financial credentials."
                },
                {
                    "id": 7,
                    "question": "What is Multi-Factor Authentication (MFA)?",
                    "options": ["Requiring two or more verification factors to gain access to a resource", "Using 2 different passwords", "Logging in from 2 computers", "Using 2 web browsers"],
                    "correct": 0,
                    "explanation": "MFA combines knowledge (password), possession (authenticator app), or inherence (biometrics)."
                },
                {
                    "id": 8,
                    "question": "What is hashing versus encryption?",
                    "options": ["Hashing is a one-way deterministic transformation; encryption is a two-way reversible transformation using a key", "They are identical", "Hashing is reversible", "Encryption is one-way"],
                    "correct": 0,
                    "explanation": "Hashes cannot be decrypted back to original text; encrypted data can be decrypted using secret keys."
                },
                {
                    "id": 9,
                    "question": "Which tool is popular for network packet analysis?",
                    "options": ["Wireshark", "Photoshop", "Excel", "Blender"],
                    "correct": 0,
                    "explanation": "Wireshark is an industry-standard network protocol analyzer."
                },
                {
                    "id": 10,
                    "question": "What is Nmap used for?",
                    "options": ["Network discovery and security vulnerability port scanning", "Writing React code", "Creating database backups", "Designing logos"],
                    "correct": 0,
                    "explanation": "Nmap scans networks to discover open ports, host services, and operating systems."
                }
            ],
            "intermediate": [
                {
                    "id": 1,
                    "question": "What is Cross-Site Request Forgery (CSRF)?",
                    "options": ["An attack forcing an authenticated victim's browser to execute unauthorized state-changing actions on a trusted web application", "Injecting SQL into inputs", "Cracking passwords", "Stealing Wi-Fi passwords"],
                    "correct": 0,
                    "explanation": "CSRF tricks a victim's browser into sending authenticated HTTP requests without consent."
                },
                {
                    "id": 2,
                    "question": "How do Anti-CSRF tokens mitigate CSRF attacks?",
                    "options": ["Generates secret, unpredictable tokens bound to user sessions that must be included in state-changing POST requests", "By disabling cookies", "By encrypting database tables", "By hiding IP addresses"],
                    "correct": 0,
                    "explanation": "Unique CSRF tokens validate that requests originated from authentic application forms."
                },
                {
                    "id": 3,
                    "question": "What is Server-Side Request Forgery (SSRF)?",
                    "options": ["An attack where a vulnerable web application is induced to make unexpected HTTP requests to internal/external systems", "Client-side XSS", "SQL injection", "Deleting server logs"],
                    "correct": 0,
                    "explanation": "SSRF allows attackers to abuse backend server privileges to query internal network resources."
                },
                {
                    "id": 4,
                    "question": "What is the difference between Symmetric and Asymmetric Encryption?",
                    "options": ["Symmetric uses the same key for encryption/decryption; Asymmetric uses a public key to encrypt and private key to decrypt", "They are identical", "Asymmetric is faster", "Symmetric uses 2 keys"],
                    "correct": 0,
                    "explanation": "Asymmetric encryption uses key pairs (public/private), making key distribution secure."
                },
                {
                    "id": 5,
                    "question": "What is Burp Suite used for?",
                    "options": ["An integrated web application security testing and penetration testing proxy platform", "Writing Python code", "Building React UI", "Formatting SQL queries"],
                    "correct": 0,
                    "explanation": "Burp Suite intercepts and manipulates HTTP traffic to audit web application security."
                },
                {
                    "id": 6,
                    "question": "What is bcrypt / Argon2 hashing used for?",
                    "options": ["Salted, adaptive password hashing designed to withstand brute-force GPU cracking attacks", "Encrypting PDF files", "Formatting HTML text", "Speeding up database queries"],
                    "correct": 0,
                    "explanation": "Bcrypt and Argon2 include work factors (cost) to slow down brute-force key cracking."
                },
                {
                    "id": 7,
                    "question": "What is `SameSite` attribute on HTTP cookies (`Strict`, `Lax`, `None`)?",
                    "options": ["Controls whether cookies are sent with cross-site requests to defend against CSRF", "Sets cookie expiration date", "Encrypts cookie content", "Deletes cookies"],
                    "correct": 0,
                    "explanation": "SameSite restricts cookie transmission during cross-origin navigations."
                },
                {
                    "id": 8,
                    "question": "What is Content Security Policy (CSP) header?",
                    "options": ["An HTTP header defining approved domain sources for loading scripts, styles, images, and frames", "A CSS font rule", "A SQL permission", "A Python package"],
                    "correct": 0,
                    "explanation": "CSP mitigates XSS by restricting untrusted inline scripts and external domains."
                },
                {
                    "id": 9,
                    "question": "What is OAuth 2.0?",
                    "options": ["An industry-standard authorization framework enabling third-party applications to obtain limited access to user accounts", "An authentication protocol", "A database engine", "A CSS framework"],
                    "correct": 0,
                    "explanation": "OAuth 2.0 provides delegated access authorization via access tokens."
                },
                {
                    "id": 10,
                    "question": "What is OpenID Connect (OIDC)?",
                    "options": ["An identity authentication layer built on top of OAuth 2.0 to verify user identity via ID tokens", "A database search index", "A CSS framework", "A Python web server"],
                    "correct": 0,
                    "explanation": "OIDC adds standardized identity authentication capabilities to OAuth 2.0."
                },
                {
                    "id": 11,
                    "question": "What is a Principle of Least Privilege (PoLP)?",
                    "options": ["Granting users and processes only the minimum access permissions necessary to perform their specific job functions", "Giving everyone full admin access", "Deleting user accounts", "Using 1 shared password"],
                    "correct": 0,
                    "explanation": "Least privilege limits potential damage from compromised accounts or insider threats."
                },
                {
                    "id": 12,
                    "question": "What is a Zero-Day Vulnerability?",
                    "options": ["A software security flaw unknown to the vendor for which no official security patch yet exists", "A vulnerability discovered on day zero of the year", "A bug in HTML code", "An expired SSL certificate"],
                    "correct": 0,
                    "explanation": "Zero-day vulnerabilities represent unpatched flaws actively exposed to exploitation."
                },
                {
                    "id": 13,
                    "question": "What is HTTP Strict Transport Security (HSTS)?",
                    "options": ["An HTTP header forcing browsers to interact with the server exclusively via secure HTTPS connections", "A firewall brand", "A SQL database index", "A CSS rule"],
                    "correct": 0,
                    "explanation": "HSTS prevents SSL stripping attacks by enforcing HTTPS connections."
                },
                {
                    "id": 14,
                    "question": "What is Salt in password hashing?",
                    "options": ["Random data concatenated with passwords prior to hashing to prevent rainbow table dictionary attacks", "A physical chemical compound", "A SQL table column", "A CSS class"],
                    "correct": 0,
                    "explanation": "Salts ensure identical passwords produce distinct hash values, thwarting rainbow tables."
                },
                {
                    "id": 15,
                    "question": "What is Input Sanitization versus Output Encoding?",
                    "options": ["Sanitization strips dangerous tags from inputs; Encoding transforms special characters before rendering into HTML/JS contexts", "They mean the same thing", "Sanitization is for CSS", "Encoding deletes data"],
                    "correct": 0,
                    "explanation": "Output encoding ensures user inputs are rendered as inert text data rather than executable code."
                }
            ],
            "senior": [
                {
                    "id": 1,
                    "question": "What is Zero Trust Security Architecture (`Never Trust, Always Verify`)?",
                    "options": ["Assuming network locality does not imply trust; enforcing continuous authentication, authorization, and micro-segmentation", "Trusting all internal network computers", "Deleting firewall rules", "Disabling multi-factor auth"],
                    "correct": 0,
                    "explanation": "Zero Trust assumes threat actors exist both inside and outside enterprise perimeter boundaries."
                },
                {
                    "id": 2,
                    "question": "How does Diffie-Hellman Key Exchange allow 2 parties to establish a shared secret over an insecure channel?",
                    "options": ["Leverages discrete logarithm mathematical hardness so parties exchange public values to compute identical shared keys without transmitting secret keys", "Sends secret key in plain text", "Uses shared password file", "Uses RSA certificates"],
                    "correct": 0,
                    "explanation": "Diffie-Hellman enables secure key exchange without exposing private keys over the wire."
                },
                {
                    "id": 3,
                    "question": "What is a Timing Attack in cryptographic implementation and how is constant-time comparison used to fix it?",
                    "options": ["Extracting secrets by measuring small execution time variations in code; fixed using `hmac.compare_digest()` constant-time algorithms", "Attacking computer clocks", "Deleting system timestamps", "Using fast internet"],
                    "correct": 0,
                    "explanation": "Constant-time string comparison prevents attackers from guessing secret characters based on response timing."
                },
                {
                    "id": 4,
                    "question": "What is JWT Signature Confusion Attack (e.g. `alg: none` or RSA to HMAC key confusion)?",
                    "options": ["Manipulating token headers to force server to accept unverified tokens or use public key as HMAC secret", "Stealing hard drive", "Cracking Wi-Fi router", "Deleting user DB"],
                    "correct": 0,
                    "explanation": "Signature confusion attacks trick flawed token verifiers into accepting forged signature claims."
                },
                {
                    "id": 5,
                    "question": "What is DNS Rebinding Attack and how is it mitigated?",
                    "options": ["Abusing browser Same-Origin Policy by resolving victim domain to public IP then switching to internal 127.0.0.1 IP; mitigated via Host header validation", "Rebinding network cables", "Deleting DNS records", "Using static HTML"],
                    "correct": 0,
                    "explanation": "Host header validation and IP filtering block DNS rebinding attempts against local web applications."
                },
                {
                    "id": 6,
                    "question": "What is XML External Entity (XXE) Injection?",
                    "options": ["An attack against applications parsing XML input where external entities resolve local server files or internal network endpoints", "Injecting HTML into React", "Deleting XML files", "Formatting JSON text"],
                    "correct": 0,
                    "explanation": "XXE flaws allow attackers to disclose internal server files or trigger SSRF by manipulating XML DTD parsers."
                },
                {
                    "id": 7,
                    "question": "What is Perfect Forward Secrecy (PFS) in TLS 1.3?",
                    "options": ["Generating unique ephemeral session keys per connection so compromising a long-term private key cannot decrypt past recorded traffic", "Using passwords that never expire", "Encrypting database backups", "Deleting server logs"],
                    "correct": 0,
                    "explanation": "PFS uses ephemeral Diffie-Hellman keys, preventing retroactive decryption of historical traffic."
                },
                {
                    "id": 8,
                    "question": "What is Subresource Integrity (SRI) attribute on `<script>` tags?",
                    "options": ["A security feature validating cryptographic hash integrity of fetched CDN scripts (e.g. `integrity=\"sha384-...\"`) before execution", "Compressing JS scripts", "Formatting HTML tags", "Deleting unused JS files"],
                    "correct": 0,
                    "explanation": "SRI protects web applications from compromised third-party CDN scripts."
                },
                {
                    "id": 9,
                    "question": "What is Web Application Firewall (WAF) rule tuning (e.g. AWS WAF or Cloudflare WAF)?",
                    "options": ["Configuring managed rate-limiting, GEO-blocking, SQLi/XSS inspection rules while monitoring false positive blocks", "Buying a physical firewall box", "Disabling web security", "Deleting SSL certs"],
                    "correct": 0,
                    "explanation": "WAF rule tuning filters malicious HTTP payloads at the edge while avoiding disruption of legitimate traffic."
                },
                {
                    "id": 10,
                    "question": "What is SAST versus DAST in Security Pipeline Testing?",
                    "options": ["SAST (Static Application Security Testing) analyzes source code without execution; DAST (Dynamic) tests running applications against live attack payloads", "SAST is for database; DAST is for CSS", "They are identical", "DAST deletes source code"],
                    "correct": 0,
                    "explanation": "SAST inspects code repositories during build time; DAST audits running endpoints during QA."
                },
                {
                    "id": 11,
                    "question": "What is Insecure Direct Object Reference (IDOR)?",
                    "options": ["A access control flaw where an application uses user-supplied input to access objects directly without authorization checks (e.g. `/api/user/123`)", "A CSS layout bug", "A broken URL link", "A SQL syntax error"],
                    "correct": 0,
                    "explanation": "IDOR vulnerabilities allow unauthorized users to access arbitrary record IDs by manipulating URL parameters."
                },
                {
                    "id": 12,
                    "question": "What is HTTP Request Smuggling (CL.TE / TE.CL)?",
                    "options": ["Exploiting discrepancy in handling Content-Length and Transfer-Encoding headers between front-end proxy and back-end server", "Smuggling physical USB drives", "Sending spam emails", "Deleting HTTP headers"],
                    "correct": 0,
                    "explanation": "Request smuggling desynchronizes boundary processing, allowing attackers to hijack adjacent HTTP requests."
                },
                {
                    "id": 13,
                    "question": "What is Threat Modeling (STRIDE framework)?",
                    "options": ["Systematic approach to identifying security threats: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege", "Writing Python unit tests", "Designing database tables", "Formatting PDF documents"],
                    "correct": 0,
                    "explanation": "STRIDE categorizes system threat vectors to prioritize architectural security mitigations."
                },
                {
                    "id": 14,
                    "question": "What is Cross-Origin Resource Sharing (CORS) preflight request (`OPTIONS`)?",
                    "options": ["An automatic browser request asking permission before sending complex cross-origin requests containing custom headers or non-simple HTTP methods", "Downloading images", "Deleting cookies", "Refreshing page"],
                    "correct": 0,
                    "explanation": "Browsers issue OPTIONS preflight checks to verify server CORS headers before dispatching unsafe requests."
                },
                {
                    "id": 15,
                    "question": "What is Hardware Security Module (HSM)?",
                    "options": ["A physical computing device that safeguards and manages digital cryptographic keys for strong authentication and decryption", "A computer graphics card", "A RAM memory stick", "A Wi-Fi router"],
                    "correct": 0,
                    "explanation": "HSMs provide tamper-resistant hardware environments for cryptographic operations."
                },
                {
                    "id": 16,
                    "question": "What is OAuth 2.0 PKCE (Proof Key for Code Exchange) flow?",
                    "options": ["Generates dynamic code verifiers and challenges to prevent authorization code interception on public native/SPA clients", "Encrypts database text", "Formats JSON tokens", "Deletes user sessions"],
                    "correct": 0,
                    "explanation": "PKCE eliminates reliance on static client secrets for single-page and mobile applications."
                },
                {
                    "id": 17,
                    "question": "What is Command Injection vulnerability?",
                    "options": ["Executing arbitrary OS shell commands on host server via unsanitized user inputs passed to functions like `os.system()`", "Injecting SQL into tables", "Writing CSS code", "Deleting HTML tags"],
                    "correct": 0,
                    "explanation": "Command injection allows attackers to run unauthorized shell commands on the server host."
                },
                {
                    "id": 18,
                    "question": "What is Certificate Pinning and dynamic key rotation in mobile apps?",
                    "options": ["Pinning specific leaf/intermediate CA certificates while maintaining backup pin sets to prevent outage during certificate renewal", "Changing Wi-Fi passwords", "Deleting app storage", "Using HTTP only"],
                    "correct": 0,
                    "explanation": "Backup pin sets prevent mobile app outages when server TLS certificates expire or rotate."
                },
                {
                    "id": 19,
                    "question": "What is Container Breakout in Docker/Linux security?",
                    "options": ["Escaping container isolation boundaries to gain root privileges on the underlying host operating system", "Closing a Docker window", "Restarting a container", "Deleting a Dockerfile"],
                    "correct": 0,
                    "explanation": "Container breakouts exploit kernel flaws or misconfigurations (`--privileged`) to compromise the host node."
                },
                {
                    "id": 20,
                    "question": "What is Secret Scanning in CI/CD pipeline automation?",
                    "options": ["Scanning code commits and history (e.g. GitGuardian or Trufflehog) for accidentally committed API keys, tokens, or private keys", "Scanning for viruses", "Formatting code indentation", "Deleting empty files"],
                    "correct": 0,
                    "explanation": "Secret scanning prevents accidental exposure of credentials in public or private code repositories."
                }
            ]
        }
    }
}

