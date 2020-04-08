FROM golang as builder

ENV GO111MODULE=on
WORKDIR /go/src/saturn/
COPY go.mod .
COPY go.sum .
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /go/bin/saturn ./cmd/saturn

FROM alpine
WORKDIR /
RUN apk --no-cache add ca-certificates
COPY --from=builder /go/bin/saturn /app/
COPY --from=builder /go/src/saturn/feeds.opml /
ENTRYPOINT ["/app/saturn"]