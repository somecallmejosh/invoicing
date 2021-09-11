# Mojeaux Invoicing

A buddy and I are working on this Invocing challenge from [Frontend Mentor](https://www.frontendmentor.io/challenges/invoice-app-i7KaLTQjl). We are intentionally splitting out the front end from Rails because, well... to be honest, we don't like it. Rails modern front end stuff seems a little too "backendy" for me (a front end dev), and a little too weird from Mike, my Rails developer buddy. Historically, we've built Rails apps together as a duo, and I've always complained about Rails asset pipeline, sprockets, and the like. And he's graciously accepted my challenge to use Rails purely as an API machine, letting me do all my front end dev work in Nuxt (my favorite).

## Requirements

Your users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete invoices
- Receive form validations when trying to create/edit an invoice
- Save draft invoices, and mark pending invoices as paid
- Filter invoices by status (draft/pending/paid)
- Toggle light and dark mode
- **Bonus**: Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)

Want some support on the challenge? [Join our Slack community](https://www.frontendmentor.io/slack) and ask questions in the **#help** channel.

### Expected Behaviour

- Creating an invoice
  - When creating a new invoice, an ID needs to be created. Each ID should be 2 random uppercased letters followed by 4 random numbers.
  - Invoices can be created either as drafts or as pending. Clicking "Save as Draft" should allow the user to leave any form field blank, but should create an ID if one doesn't exist and set the status to "draft". Clicking "Save & Send" should require all forms fields to be filled in, and should set the status to "pending".
  - Changing the Payments Terms field should set the `paymentDue` property based on the `createdAt` date plus the numbers of days set for the payment terms.
  - The `total` should be the sum of all items on the invoice.
- Editing an invoice
  - When saving changes to an invoice, all fields are required when the "Save Changes" button is clicked. If the user clicks "Cancel", any unsaved changes should be reset.
  - If the invoice being edited is a "draft", the status needs to be updated to "pending" when the "Save Changes" button is clicked. All fields are required at this stage.
- Users should be able to mark invoices as paid by clicking the "Mark as Paid" button. This should change the invoice's status to "paid".
- Users should receive a confirmation modal when trying to delete invoices.
- Feel free not to add custom styling for the date and dropdown form fields. The designs for those fields are optional extras and are mostly for illustration purposes.

# API 

## Invoices

### Create a new invoice

```
curl --location --request POST 'http://localhost:3000/invoices' \
--header 'Content-Type: application/json' \
--data-raw '{
  "invoice": {
      "description": "Sample work effort",
      "client_email": "cracker@jack.com",
      "client_name": "Acme Corp International",
      "payment_date": "2021-09-11",
      "sender_address_attributes": {
      "street": "12 WooWoo Ave",
                  "city": "Springfield",
      "post_code": "01110",
      "country": "US"
      },
      "client_address_attributes": {
      "street": "33 KoolAid Ave",
                  "city": "Springfield",
      "post_code": "01888",
      "country": "US"
    }
  }
}'
```

### Update an invoice
```
curl --location --request PATCH 'http://localhost:3000/invoices/23' \
--header 'Content-Type: application/json' \
--data-raw '{
  "invoice": {
    "id": 23,
      "description": "Sampled work effort",
      "sender_address_attributes": {
        "id": 44,
        "street": "45 WooWoo Ave",
         "city": "ALSKDJ"
      }
    }
  }...
}
```

### Delete an invoice
`curl --location --request DELETE 'http://localhost:3000/invoices/3'`

## Line Items

### Update a line item:
```
curl --location --request PATCH 'http://localhost:3000/invoices/3/line_items/4' \
--header 'Content-Type: application/json' \
--data-raw '{
  "line_item":{
    "id": 4,
    "invoiceId": 3,
    "name": "learningz"
  }...
}'
```

### Create a line item
```
curl --location --request POST 'http://localhost:3000/invoices/3/line_items' \
--header 'Content-Type: application/json' \
--data-raw '{
  "line_item":{
    "invoiceId": 3,
    "name": "apple and onion",
    "quantity": 1,
    "price": 700
  }
}'
```

### Delete a line item
`curl --location --request DELETE 'http://localhost:3000/invoices/3/line_items/20'`




## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
