Start:

docker run -d --rm --name my-postgres -e POSTGRES_PASSWORD='123qwe' --network demoapp postgres
docker run -d --rm --name my-redis --network demoapp redis

docker run -e PGHOST=my-postgres -e PGUSER=postgres -e PGPASSWORD=123qwe -e PGPORT=5432 -e REDIS_HOST=my-redis -e PGDATABASE=postgres --rm --name my-backend --network demoapp -v $(pwd):/opt/app -p 8080:5000 28e7309585da

Usage:

curl "localhost:8080/nwd?number1=100&number2=500"
curl "localhost:8080/values"

TEMAT: KALKULATOR WYNAGRODZEŃ