# espress

REST web servers are great, and then we add "realtime" to them and figure out how to munge long-lived streaming responses into our app.

What if we had a client and server that treated streaming responses as first-class citizens?

What if a simple request/response cycle was just a short-lived, single event streaming response?

This is a framework to build that system.

## goals

* WebSocket based
* Use only one websocket
* Multiplex requests/response

## LICENSE

MIT

