# HOD Realty - House of Dreams Real Estate

A modern real estate platform with React frontend and Spring Boot backend.

## 🚀 Quick Start

### Prerequisites
- **Java 21** (OpenJDK or Corretto)
- **Maven 3.6+**
- **Node.js 18+** and npm

### Running the Application

#### 1. Start Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
- Backend runs on: **http://localhost:8080**
- H2 Database Console: **http://localhost:8080/h2-console**
  - JDBC URL: `jdbc:h2:mem:testdb`
  - Username: `sa`
  - Password: *(leave empty)*

#### 2. Start Frontend (React + Vite)
Open a **new terminal** and run:
```bash
cd frontend
npm run dev
```
- Frontend runs on: **http://localhost:5173**
- Vite will automatically open your browser

---

## 🌐 Testing URLs

Once both servers are running:

### Public Pages
- **Homepage**: http://localhost:5173
- **Properties**: http://localhost:5173/properties
- **About**: http://localhost:5173/about
- **Contact**: http://localhost:5173/contact

### Admin Panel
- **Admin Dashboard**: http://localhost:5173/admin
- **Manage Properties**: http://localhost:5173/admin/properties
- **Manage Partners**: http://localhost:5173/admin/partners
- **Company Info**: http://localhost:5173/admin/company

### API Endpoints
- **Public Homepage Data**: http://localhost:8080/api/public/homepage
- **Properties API**: http://localhost:8080/api/public/properties
- **Admin API**: http://localhost:8080/api/admin/* (requires authentication)

---

## 📁 Project Structure

```
hod-realty/
├── backend/              # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/hod/realty/
│   │       │   ├── controller/   # REST controllers
│   │       │   ├── entity/       # JPA entities
│   │       │   ├── repository/   # Data repositories
│   │       │   └── config/       # Configuration
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
└── frontend/             # React frontend
    ├── src/
    │   ├── components/   # Reusable components
    │   ├── pages/        # Page components
    │   └── App.jsx
    ├── public/
    │   └── logos/        # Logo files
    └── package.json
```

---

## 🛠️ Development Commands

### Backend
```bash
# Run backend
cd backend
mvn spring-boot:run

# Build backend
mvn clean package

# Run tests
mvn test

# Clean build artifacts
mvn clean
```

### Frontend
```bash
# Install dependencies
cd frontend
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 🔧 Troubleshooting

### Backend Issues

**Problem**: `mvnw: command not found`
- **Solution**: Use `mvn` instead of `./mvnw`
  ```bash
  mvn spring-boot:run
  ```

**Problem**: Port 8080 already in use
- **Solution**: Kill the process or change port in `application.properties`
  ```bash
  # Find and kill process on port 8080
  lsof -ti:8080 | xargs kill -9
  ```

**Problem**: Java version mismatch
- **Solution**: Ensure Java 21 is installed
  ```bash
  java -version
  # Should show: openjdk version "21.x.x"
  ```

### Frontend Issues

**Problem**: Port 5173 already in use
- **Solution**: Vite will automatically use next available port (5174, 5175, etc.)

**Problem**: `npm: command not found`
- **Solution**: Install Node.js from https://nodejs.org/

**Problem**: Dependencies not installed
- **Solution**: Run `npm install` in frontend directory

---

## 🗄️ Database

The application uses **H2 in-memory database** for development.

### Access H2 Console
1. Start backend server
2. Navigate to: http://localhost:8080/h2-console
3. Use these credentials:
   - **JDBC URL**: `jdbc:h2:mem:testdb`
   - **Username**: `sa`
   - **Password**: *(leave empty)*

### Initial Data
The database is seeded with sample data on startup:
- Homepage sections (Hero, Features, etc.)
- Sample properties
- Counter statistics
- Partner information
- Company details

---

## 🎨 Logo Files

All logo files are located in `/frontend/public/logos/`:
- `hod-logo-light.png` - Current light version (for navbar)
- `hod-logo-dark.png` - Current dark version (for footer)
- `hod-logo-light-original.png` - Original light version (backup)
- `hod-logo-dark-original.png` - Original dark version (backup)

See `/frontend/public/logos/README.md` for detailed logo documentation.

---

## 🔐 Admin Authentication

Default admin credentials (configured in backend):
- **Username**: `admin`
- **Password**: `admin123`

> **Note**: Change these credentials in production!

---

## 📦 Tech Stack

### Backend
- Spring Boot 3.2.2
- Spring Data JPA
- Spring Security
- H2 Database
- Lombok
- Maven

### Frontend
- React 18
- Vite 5
- React Router 6
- Tailwind CSS
- Framer Motion
- Lucide React Icons

---

## 🚦 Running Both Servers (Advanced)

### Option 1: Separate Terminals (Recommended)
```bash
# Terminal 1 - Backend
cd backend && mvn spring-boot:run

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### Option 2: Background Process
```bash
# Start backend in background
cd backend && mvn spring-boot:run > server.log 2>&1 &

# Start frontend (foreground)
cd frontend && npm run dev
```

### Option 3: Single Command
```bash
# From project root
(cd backend && mvn spring-boot:run &) && (cd frontend && npm run dev)
```

---

## 🛑 Stopping Servers

### Stop Frontend
Press `Ctrl + C` in the terminal running `npm run dev`

### Stop Backend
Press `Ctrl + C` in the terminal running `mvn spring-boot:run`

Or kill the process:
```bash
# Find Java process
ps aux | grep spring-boot

# Kill by port
lsof -ti:8080 | xargs kill -9

# Kill all Maven processes
pkill -f "spring-boot:run"
```

---

## 📝 Notes

- Backend must be running for frontend API calls to work
- Frontend will show errors if backend is not accessible
- H2 database data is lost on server restart (in-memory)
- For production, configure a persistent database (PostgreSQL, MySQL)

---

## 🤝 Contributing

1. Make changes in your branch
2. Test both frontend and backend
3. Ensure no console errors
4. Verify all features work as expected

---

## 📄 License

Private project - All rights reserved
