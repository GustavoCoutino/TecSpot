# Tec Spot

TecSpot is a parking System is a web-based application that allows users to manage parking reservations. With this system, users can easily make reservations, view available parking spaces, and cancel existing reservations. This project was done in 24 hours for the biggest Latin American student hackathon HackMTY.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributors](#contributors)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Make sure Node.js is installed on your system. You can download it from [https://nodejs.org/](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/yourusername/tec-spot-parking.git

   ```

2. Change into the project directory

   ```shell
   cd tec-spot-parking
   ```

3. Install the required dependencies

   ```shell
   npm install
   ```

4. Set up your PostgreSQL database and update the database configuration in /config/db.js.

5. Run

   ```shell
   npm start
   ```

### Usage

TecSpot is a web-based parking reservation system that allows users to:

Log In: Users can log in to their accounts using their unique identifier and password.

Register: New users can create accounts by providing their unique identifier, name, email, and password.

View Parking Spaces: Users can view available parking spaces.

Make Reservations: Authenticated users can reserve parking spaces by selecting the date and time.

Cancel Reservations: Users can cancel their parking reservations.

View Profile: Users can view their profile information, including reservations.

## Technologies Used

- **Node.js**: The runtime environment for the server.

- **Express.js**: The web application framework.

- **PostgreSQL**: The relational database management system.

- **HTML/CSS**: For the user interface.

- **Bootstrap**: A front-end framework for responsive design.

- **JavaScript**: The primary programming language for client-side logic.

## Contributors

- Gustavo Coutiño ([@gustavocoutino](https://github.com/GustavoCoutino))
- Rafael Alejandro Reyes Martinez ([@rafareyes](https://github.com/rafa-reyes04))
- Santiago Carrizales Becerra ([@santiagocarrizales](https://github.com/SantiagoCZB))
- Alfonso García Yague ([@alfonsoyague](https://github.com/p0nch000))

## License

This project is licensed under the [MIT License](LICENSE).
