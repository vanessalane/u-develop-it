# u-develop-it

## Description
Node/Express/SQLite backend that could be used to manage an election (in a world without security concerns). It includes the following endpoints:

**Candidates**
- Get all candidates:     GET `/candidates`
- Get a single candidate: GET `/candidate/:id`
- Create a candidate:     POST `/candidates`
- Update party:           PUT `/candidates/:id`
- Delete a candidate:     DELETE `/candidate/:id`

**Parties**
- Get all parties:    GET `/parties`
- Get a single party: GET `/party/:id`
- Delete a party:     DELETE `/party/:id`

**Votes**
- Get all votes:      GET `/votes`
- Create new vote:    POST `/vote`

**Voters**
- Get all voters:     GET `/voters`
- Get specific voter: GET `/voter/:id`
- Add voter:          POST `/voter`
- Update a voter:     PUT `/voter/:id`
- Delete a voter:     DELETE `/voter/:id`

## Usage
1. Clone the repo
2. Run `npm -i` to install dependencies
3. Run `npm run migrate` to create the relevant tables from the `db/schema.sql` file
4. Run `npm run seed` to seed the tables you created in step 3 (uses the `db/seeds.sql` file)
5. Run `npm start` to start the app.
6. Access the endpoints listed above at http://localhost:3001/api/

## Testing
After cloning the repo, run `npm test` to execute Jest tests

## Packages
- jest
- sqlite
- express

## Questions
If you have questions, email me at [vlane0593@gmail.com](mailto:vlane0593@gmail.com) or reach out on [GitHub](https://www.github.com/vanessalane).
