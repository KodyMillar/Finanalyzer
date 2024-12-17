# Finanlyzer
Finanlyzer is a financial analytics web application that allows users to input financial data, such as investments, and view financial calculations like interest as well as financial statistics about financial input from all users, like the average interest for investments with a duration of one year.

## Technologies
Finanylizer uses a microservices architecture and separates the frontend from the backend in order to create a decoupled architecture. The services communicate with each other through REST API with HTTP and in some cases with a scheduler to create a soft state. 

The technologies we used are:
- React for the frontend
- Node.js for the backend
- Express.js for the web framework
- MongoDB to store analytics and computed data
- MySQL to store user financial input as well as usernames and passwords
- Python to perform data analytics from MySQL data and store analytics in MongoDB database
- Google OAuth API on Node.js to authorize users to view financial statistics and calculations
- Docker for containerization of services (used images from Dockerfiles in docker-compose file) 
- Kubernetes (not implemented but had planned to use to create scalability, availability, and fault-tolerance)
