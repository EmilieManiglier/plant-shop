# Leaf Place

![ruby](https://img.shields.io/badge/Ruby-informational?style=flat&logo=ruby&logoColor=white&color=A61414)
![reactjs](https://img.shields.io/badge/ReactJs-1?logo=react&logoColor=fff&color=61DAFB)

## Setup dev environment

- Install `ruby` and `foreman`

```bash
# In your terminal
rbenv install 3.3.0
gem install bundler
rbenv rehash
```

- Reset database

```bash
# From app's root
./scripts/reset-db
```

- Start dev server

```bash
# From app's root
cd api && rails s

# Open an other terminal
cd front && yarn install && yarn start
```

👉 Front end is accessible at: [http://localhost:5100](http://localhost:5100)

## Running the tests (RSpec)

```bash
cd api
bundle exec rspec
```

## Testing API with Swagger UI

API Documentation can be found in [http://localhost:3000/api-docs](http://localhost:3000/api-docs).
All routes, except for the sign in and sign up, are protected by authentication

### How to test

- Login with the route `http://localhost:3000/api/v1/users/sign_in`
- Example body

```json
{
  "user": {
    "email": "user-1@kinoba.fr",
    "password": "password"
  }
}
```

- Copy the Bearer token in the response headers
- Click on the `Authorize` button at the top of the page
- Paste the Bearer token
- Click on `Authorize`

![Swagger Authentication](https://iili.io/J6glBbS.md.png)

- Make a call for an authenticated route, for example `/api/v1/products`
- The response status should be 200 🎉

## Active Admin Back-Office

- Back-office is accessible at: [http://localhost:3000/admin](http://localhost:3000/admin)
- Login with the default admin user

```
email: admin@kinoba.fr
password : password
```
