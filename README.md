## Description

A basic wallet microservice architecutre

## Running the app
docker-compose up

## Testing
Once the docker-compose is done.
Make a post request to localhost:8080/api/deposit with sample data
{
    "amount": 200,
    "customerId": "1"
}
