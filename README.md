This was made for my Technical Test regarding my application to Emapta for Full Stack Technical Team Lead.


# The Test

Using your preferred front-end framework, build a form to capture one or more applicants.
The form should capture the following information:
● First name
● Last name
● Mobile number
● Email
 
The form will allow the user to add and remove applicants, however, there must be at least one applicant.
In addition, each applicant will include a checkbox to nominate the primary applicant. There must always be one, and only one, primary applicant.
Your project should be a standard NPM application that can be run with:
➢ npm install
➢ npm start

# Solution

Since ReactJs and TypeScript are part of the requirements on this position, I decided to use React. To give an output that is close to a real-world app, I then included the usage of SQLite for saving the data which also includes a migration. So the previous data on previous operations won't be gone upon refresh. In this case, both Front-end and Back-end development was done.

## What was used?

- Knex: for database migration
- SQLite: simple storage for this test
- React/TypeScript/Next.js: for building both front-end and back-end
- Tailwind Css: for faster development on design. 
- SCSS: for styling
- Winston: for Logging
- Zustand: for global state management
- yup: for object validation

## Front-end

It only consist of one page which can be accessed in `http://localhost:3000` when run locally.

## Back-end
Following endpoint was created and used:
- `GET /api/applicants` : returns all applicants
- `POST /api/applicants` : creates an applicant which then returns the inserted id to support dynamic appending of applicant in the front-end
- `DELETE /api/applicants?id={id}` : used to delete an applicant. Primary applicant cannot be deleted since there should always be one and one only primary applicant. Therefore, deletion will also fail if there is only 1 applicant remains.
- `POST /api/applicants/primary`: used to update the primary applicant. Only one applicant can be set to primary.

Applicant Schema:
```
{
    id?: number;
	is_primary?: boolean;
    last_name: string;
    last_name: string;
    mobile_number: string; // should be a valid mobile number
    email: string; // should be a valid email
}
```

## File Structure
- `public`: contains `fonts` _(I used the same font used in https://flkitover.com &#9996;)_ and `styles (scss)`
- `src > types`: contains reusable types/interfaces
- `src > stores`: contains stores for global state management
- `src > pages`: contains page routes
- `src > lib`: contains libraries/services that used both by the front-end _(fe folder)_ and back-end _(api folder)_
- `src > constants`: contains reusable constants
- `src > config`: contains configuration files
- `src > components`: contains reusable components that are used by the front-end
- `src > app`: contains default files created upon creating the project via `npx create-next-app@latest` which was then overwritten by the `src > pages`


## Tests

No regression or unit test was done in this, though code was made to be testable when needed.

## Database Migration

You should not worry about the migration as it automatically updates the checker's local machine by automatically creating `dev.sqlite3` file which also then includes an `applicant` table with one default row inserted upon running `npm start`.


# Running Locally

Install Dependencies
```
npm install
```

Run the development server:

```
npm start
```

# How much time I spent on this?
6 hours including this documentation
