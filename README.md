# goRide

**goRide** — A microservice-style ride-sharing backend (JavaScript).


---

## About

`goRide` is a JavaScript-based backend project split into multiple services (modules) implementing typical ride-sharing responsibilities (users, captains/drivers, rides, gateway/API). This README provides clear instructions to install, run and extend the project.

---

## Repository structure

* `gateway` — API gateway or entrypoint service
* `user` — user service (registration, profile, auth)
* `captain` — driver/captain service
* `ride` — ride management service (create ride, accept ride, status)
* `.gitignore` and a single commit history present in the repo. ([GitHub][1])


---

## Features

* Service-per-domain design (users, drivers/captains, rides, gateway)
* RESTful APIs (assumed) for creating users, starting rides, driver actions, and gateway routing
* Simple structure ready for local development, testing, and extension

---

## Tech stack (assumed)

* Node.js (JavaScript) 
* Express for REST APIs 
* MongoDB 
* npm for package management

---

## Architecture & design

`goRide` follows a small microservice pattern:

* **Gateway**: single entrypoint, handles routing, authentication, request validation and forwarding to services.
* **User service**: user signup, auth, profile management.
* **Captain service**: driver/captain registration, status (online/offline), location updates.
* **Ride service**: create/accept/complete ride lifecycle, pricing, ride history.

This separation allows independent development, testing, and scaling of each domain.

---

## Prerequisites

Install these before running locally:

* Node.js 
* npm 
* MongoDB
* Optional: Docker & Docker Compose (recommended if you add a compose file)

---

## Setup & run (local)

Run the following from the repository root or inside each service directory.

1. Clone the repo (if not already):

```bash
git clone https://github.com/Bharat1Rajput/goRide.git
cd goRide
```

2. Install dependencies for each service:

```bash
# from repository root
cd gateway
npm install

cd ../user
npm install

cd ../captain
npm install

cd ../ride
npm install
```

3. Configure environment variables (create `.env` files in each service; )

4. Start services (example using npm):

```bash
# Start gateway
cd gateway
npm start

# Start user service
cd ../user
npm start

# Start captain service
cd ../captain
npm start

# Start ride service
cd ../ride
npm start
```

If services include `dev` or `watch` scripts (e.g., `npm run dev`), use those during development.

---

## Environment variables (example)

Create a `.env` in each service with values appropriate to your environment. Example variables (adapt to actual code):

**gateway/.env**

```
PORT=4000
USER_SERVICE_URL=http://localhost:5001
CAPTAIN_SERVICE_URL=http://localhost:5002
RIDE_SERVICE_URL=http://localhost:5003
JWT_SECRET=replace_with_secure_secret
```

**user/.env**

```
PORT=5001
DB_URL=mongodb://localhost:27017/goride_user
JWT_SECRET=replace_with_secure_secret
```

**captain/.env**

```
PORT=5002
DB_URL=mongodb://localhost:27017/goride_captain
```

**ride/.env**

```
PORT=5003
DB_URL=mongodb://localhost:27017/goride_ride
```

> Replace DB connection strings and secrets with production-safe values or use a secrets manager for deployment.

---

## API examples


**Register user**

```bash
curl -X POST http://localhost:4000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"pass123"}'
```

**Login**

```bash
curl -X POST http://localhost:4000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"pass123"}'
```

**Create ride (rider)**

```bash
curl -X POST http://localhost:4000/api/rides \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"pickup":"Location A","dropoff":"Location B","fareEstimate":120}'
```

**Driver (captain) accept ride**

```bash
curl -X POST http://localhost:4000/api/captain/rides/<rideId>/accept \
  -H "Authorization: Bearer <CAPTAIN_TOKEN>"
```


---


## Contributing

1. Fork the repo.
2. Create a feature branch (`git checkout -b feat/awesome-feature`).
3. Commit changes with clear messages.
4. Push and open a Pull Request describing the change.
5. Make sure new code includes tests and follows existing style.


---

## License

```
MIT License
```

---

## Contact
LinkedIn - [http://linkedin.com/in/bharat-singh-1288a4254]
E Mail - bharattsingh33@gmail.com
