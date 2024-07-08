FROM golang:1.21.1-alpine

WORKDIR /usr/src

COPY go.mod go.sum ./
RUN go mod download

COPY . .

#RUN go build -v -o ./bin/main ./cmd/main.go

CMD ["./entrypoint.sh"]