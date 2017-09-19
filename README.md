# Shopify's Winternship 2018 Backend Challenge
- Uses ES8 Async + Await
- Grabs data from Shopify's API and return invalid results
- Loops through multiple pages of the API

Note: All of the functions in the program that uses async+await has a try catch error handler. This is fine for small program like this but it would be better to just wrap them in an error handler function since I don't do anything special other than console.error the errors.
