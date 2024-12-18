# How to install all the dependencies of the application:

1. Move to frontend folder and do `npm install`
2. Move to server folder and do `npm install`

# Before running our application server we need to run the MongoDB local server which is run on Mac OS using the command:

To install mongoDB in mac os:

`brew install mongodb-community@6.0`

To run the services:

`brew services start mongodb-community@6.0`

To stop the mongo db services you can use:

`brew services stop mongodb-community@6.0`

# Steps to setup mongo db localhost

For the purpose of this assignment you won't need to load the database locally since I have hosted it online.

# Steps to run the application:

The application is hosted at the following links:

1. Company X : https://manage-company-x.netlify.app/
2. Company Y : https://manage-company-y.netlify.app/
3. Compnay Z : https://manage-company-z.netlify.app/

The backend API's are hosted here:

1. Company X: https://companyx-d5lt.onrender.com
2. Company Y: https://companyy-0fs8.onrender.com
3. Company Z: https://companyz.onrender.com

# Steps to test the application

A general note: The API's response can be slow at times, therefore just wait for few minutes on the page, once the API loads then it is reponsive.

To test the application do the following:

## To test the company X, click the hosted link for company X then:

1. Click List parts, this should load the current list of parts in company X
2. Click List Purchase Orders, this should load the current list of PO's in company X
3. Click Find Part: Then type in the part number found in step 1, press "Find Part", this should then display the details for that part
4. Click Find PO: Then type in the PO number found in step 2, press "Find Purchase Order", this should then display the details for that PO
5. Click Submit PO: Then type in the PO number you want to submit (remember it needs to be a new one), type in the client number from the given client numbers in the word document for company X, which are 1,2 and 3. Then Click on select part, choose the one you want to add, type in the quantity, click Add Part, then you can repeat this to add more parts to the same Purchase order, they would be added in separate lines. After this, click Submit Purchase Order.
6. You can check the submitted PO through the website only, by going to the list PO tab.

## To test the company Y, click the hosted link for company Y then:

1. Click List parts, this should load the current list of parts in company Y
2. Click List Purchase Orders, this should load the current list of PO's in company Y
3. Click Find Part: Then type in the part number found in step 1, press "Find Part", this should then display the details for that part
4. Click Find PO: Then type in the PO number found in step 2, press "Find Purchase Order", this should then display the details for that PO
5. Click Submit PO: Then type in the PO number you want to submit (remember it needs to be a new one), type in the client number from the given client numbers in the word document for company Y, which are 1,2 and 3. Then Click on select part, choose the one you want to add, type in the quantity, click Add Part, then you can repeat this to add more parts to the same Purchase order, they would be added in separate lines. After this, click Submit Purchase Order.
6. You can check the submitted PO through the website only, by going to the list PO tab.

## To test the company Z, click the hosted link for company Z then:

1. Click List parts, this should load the current list of parts from Company X and Company Y
2. Click List Purchase Orders, this should load the current list of PO's in company Z
3. Click Find Part: Then type in the part number found in step 1, press "Find Part", this should then display the details for that part from Company X and Y.
4. Click Find PO: Then type in the PO number found in step 2, press "Find Purchase Order", this should then display the details for that PO from Company Z.
5. Click Submit PO: Then type in the PO number you want to submit (remember it needs to be a new one), type in the client number from the given client numbers in the word document for company Y, which are 1,2 and 3. Then Click on select part, choose the one you want to add, type in the quantity, click Add Part, then you can repeat this to add more parts to the same Purchase order, they would be added in separate lines. After this, click Submit Purchase Order.
6. You can check the submitted PO through the website only, by going to the list PO tab. You can check other companies websites as well, where it would show the submitted PO.
7. If you go to "List PO for employees", it should display the details of submitted PO with their respective companies where the order is submitted.

## To test application API's

1. For company X: Use the API link : https://companyx-d5lt.onrender.com with CompanyX attached to it, therefore the link would be https://companyx-d5lt.onrender.com/CompanyX

Then you can put any of the api routes such as 'parts' in CompanyX.mjs to test on postman. One example would be to use 'parts' as https://companyx-d5lt.onrender.com/CompanyX/parts to fetch the list of parts available.

2. For company Y: Use the API link : https://companyy-0fs8.onrender.com with CompanyY attached to it, therefore the link would be https://companyy-0fs8.onrender.com/CompanyY

Then you can put any of the api routes such as 'parts' in CompanyY.mjs to test on postman. One example would be to use 'parts' as https://companyy-0fs8.onrender.com/CompanyY/parts to fetch the list of parts available.

3. For company Z: Use the API link : https://companyz.onrender.com with CompanyZ attached to it, therefore the link would be https://companyz.onrender.com/CompanyZ

Then you can put any of the api routes such as 'parts' in CompanyZ.mjs to test on postman. One example would be to use 'parts' as https://companyz.onrender.com/CompanyZ/parts to fetch the list of parts available.

# Reference:

1. For learning MERN stack and how to make API's: https://www.mongodb.com/languages/mern-stack-tutorial
2. For learning how to implement the dropdown item selection feature: https://stackoverflow.com/questions/65419603/how-to-display-multiple-selected-values-from-a-dropdown-in-react
3. For learning how to get the current date: https://www.shecodes.io/athena/7466-how-to-get-current-date-in-react#:~:text=In%20React%2C%20you%20can%20use,can%20be%20formatted%20as%20desired.
4. To learn more about how to fetch API: https://www.codingthesmartway.com/how-to-fetch-api-data-with-react/
5. To learn how to use useEffect to fetch data on first mount of the component: https://dev.to/antdp425/react-fetch-data-from-api-with-useeffect-27le
