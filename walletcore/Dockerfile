FROM golang:1.20

WORKDIR /app

RUN apt-get update && apt-get install -y librdkafka-dev

COPY go.mod .

COPY go.sum .

RUN go mod download

COPY . .

EXPOSE 8080

CMD ["go", "run", "./cmd/walletcore/main.go"]
