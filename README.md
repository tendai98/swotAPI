# swotAPI Project

swotAPI is an API designed for a SWOT (Strengths, Weaknesses, Opportunities, and Threats) application. It facilitates the interaction between the SWOT application and the server, allowing for the management of SWOT data. This API is built using Firebase for authentication and storage, and Node.js for server-side functionality.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Test Units](#test-units)
- [Contributing](#contributing)
- [License](#license)

## Installation

To use swotAPI, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/swotAPI.git
   ```

2. Navigate to the project directory:

   ```bash
   cd swotAPI
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

   The server will run on the default port 5000, or you can specify a different port using the `PORT` environment variable.

## Configuration

### Firebase Configuration

swotAPI relies on Firebase for authentication and data storage. Before using the API, make sure to configure your Firebase project by following these steps:

1. Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).

2. Retrieve the Firebase configuration JSON for your project, and replace the content of `json/app.json` with this configuration.

   ```json
   {
     "apiKey": "YOUR_API_KEY",
     "authDomain": "YOUR_AUTH_DOMAIN",
     "databaseURL": "YOUR_DATABASE_URL",
     "projectId": "YOUR_PROJECT_ID",
     "storageBucket": "YOUR_STORAGE_BUCKET",
     "messagingSenderId": "YOUR_MESSAGING_SENDER_ID",
     "appId": "YOUR_APP_ID"
   }
   ```

3. Set up Firebase Authentication, and make sure you have an email and password account configured for your system. You will need these credentials in the `auth.json` file.

### Authentication Configuration

In the `json/auth.json` file, specify your system's authentication credentials:

   ```json
   {
     "api": {
       "email": "your_system_email@example.com",
       "password": "your_system_password"
     }
   }
   ```

## Project Structure

The project is organized into different modules to handle various aspects of the SWOT application and API functionality. Here's an overview of the project structure:

- `modules/`: This directory contains modules for different functionalities, such as SWOT management, control, and session handling.
- `json/`: This directory stores configuration files, including `app.json` for Firebase configuration and `auth.json` for system authentication.
- `index.js`: The main entry point of the swotAPI server.

## Test Units

To ensure the functionality of swotAPI, you can use the following Bash test units as examples to interact with the API. These functions include the test URLs and demonstrate various API endpoints and their usage:

### Authentication

#### Authenticate a User

```bash
curl 'http://127.0.0.1:5000/api?cmd=control&op=auth&username=admin.controller@system.net&password=quarks_leptons3e8'
```

### User Management

#### Create Users

```bash
curl "http://127.0.0.1:5000/api?cmd=control&op=create&level=Manager&user=manager101&password=12345678&token=5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9"
curl "http://127.0.0.1:5000/api?cmd=control&op=create&level=Manager&user=manager102&password=12345678&token=5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9"
```

#### Read Users

```bash
curl "http://127.0.0.1:5000/api?cmd=control&op=read&level=Manager&token=5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9"
```

#### Delete Users

```bash
curl "http://127.0.0.1:5000/api?cmd=control&op=delete&user=manager104&level=Manager&token=5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9"
```

### Session Management

#### Create a Session

```bash
curl "http://127.0.0.1:5000/api?cmd=session&op=create&user=manager101&password=12345678&level=Manager"
```

#### Delete a Session

```bash
curl "http://127.0.0.1:5000/api?cmd=session&op=delete&token=24a5253159f33681609395c2d25f9c82206948d8043e18ec61e463759a5c0220"
```

### SWOT Management

#### Create SWOT Entries

```bash
curl "http://127.0.0.1:5000/api?cmd=swot&op=create&name=ManagersSWOT1&level=Manager&creator=manager101&token=36dfc524ba38c0d88bf0cdd0250881e41ff9f498af6329b340785d56c19ff286"
curl "http://127.0.0.1:5000/api?cmd=swot&op=create&name=ManagersSWOT2&level=Manager&creator=manager102&token=36dfc524ba38c0d88bf0cdd0250881e41ff9f498af6329b340785d56c19ff286"
```

#### Read SWOT Entries

```bash
curl "http://127.0.0.1:5000/api?cmd=swot&op=read&level=Manager&user=manager101&token=36dfc524ba38c0d88bf0cdd0250881e41ff9f498af6329b340785d56c19ff286"
```

#### Update SWOT Entries

```bash
curl "http://127.0.0.1:5000/api?cmd=swot&op=update&level=Manager&destination=manager102&id=EM1234&comment=This%20is%20a%20test%20Comment&score=1&target=strength&swotid=548445e067933bcc0802879f7af2d71c6f80e3739f

0a14e01a1f4af498824b86&token=36dfc524ba38c0d88bf0cdd0250881e41ff9f498af6329b340785d56c19ff286"
```

#### Delete SWOT Entries

```bash
curl "http://127.0.0.1:5000/api?cmd=swot&op=delete&level=Manager&creator=manager101&id=bd85eb587feab2cd55636eacf34197083a468fb6a5515e2150ce0898604e8409&token=36dfc524ba38c0d88bf0cdd0250881e41ff9f498af6329b340785d56c19ff286"
```

#### List SWOT Entries

```bash
curl "http://127.0.0.1:5000/api?cmd=swot&op=list&token=f0016a758e51da9083038bb1a1ad53a4384499a922da6efb0a56e5dd7785f838"
```

**Note:** Make sure to customize the base URL in the test units to match your server configuration.
```
