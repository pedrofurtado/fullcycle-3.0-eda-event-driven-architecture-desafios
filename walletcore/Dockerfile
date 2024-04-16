FROM golang:1.20

WORKDIR /app

RUN apt-get update && apt-get install -y librdkafka-dev

COPY go.mod .

COPY go.sum .

RUN go mod download

COPY . .

RUN go build -o build/main ./cmd/walletcore/main.go

EXPOSE 8080

CMD ["./build/main"]