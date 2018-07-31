#!/usr/bin/env node

const opts = {}
if (process.env.NOIA_NODE_MASTER_ADDRESS) {
  opts.masterAddress = process.env.NOIA_NODE_MASTER_ADDRESS
}

if (process.env.NOIA_NODE_WS_PORT) {
  opts.wsPort = process.env.NOIA_NODE_WS_PORT;
}

if (process.env.NOIA_NODE_WALLET_ADDRESS) {
  opts.walletAddress = process.env.NOIA_NODE_WALLET_ADDRESS;
}

const Node = require("@noia-network/node")
const log = true

if (log) console.log("[NODE]: initializing node...")
const node = new Node(opts)
if (log) console.log("[NODE]: initialized.")

// Events
node.on("started", () => {
  if (log) console.log("[NODE]: started.")
})
node.master.on("connected", () => {
  if (log) console.log("[NODE]: connected to master.")
})
node.master.on("error", (err) => {
  if (log) console.log("[NODE]: could not connect to master.", err)
})
node.master.on("closed", info => {
  if (info && info.code !== 1000) {
    if (log) console.log(`[NODE]: connection with master closed, info =`, info)
    setTimeout(() => {
      node.restart()
    }, 30 * 1000)
  } else {
    if (log) console.log(`[NODE]: connection with master closed, normal exit`, info)
  }
})
node.master.on("cache", info => {
  if (log) console.log(`[NODE][IN]: cache request, resource = ${info.source.url}`)
})
node.master.on("clear", info => {
  if (log) console.log(`[NODE][IN]: clear request, infoHashes = ${info.infoHashes}`)
})
node.master.on("seed", info => {
  if (log) console.log("[NODE][IN]: seed request.")
})
if (node.clientSockets.http) {
  node.clientSockets.http.on("listening", info => {
    if (log) console.log(`[NODE]: listening for HTTP requests on port ${info.port}.`)
  })
  node.clientSockets.http.on("closed", () => { if (log) console.log(`[NODE]: closed HTTP server.`) })
}
if (node.clientSockets.ws) {
  node.clientSockets.ws.on("listening", info => {
    if (log) console.log(`[NODE]: listening for ${info.ssl ? "WSS" : "WS"} requests on port ${info.port}.`)
  })
  node.clientSockets.ws.on("closed", () => { if (log) console.log(`[NODE]: closed WS/WSS server.`) })
  node.clientSockets.ws.on("connections", count => {
    if (log) console.log(`[NODE]: WS Clients connections = ${count}`)
  })
}
node.contentsClient.on("seeding", infoHashes => {
  if (log) console.log("[NODE]: seeding contents: ", infoHashes)
})
node.clientSockets.on("resourceSent", info => {
  const client = `client ${info.ip}`
  const resource = `resource = ${info.resource.infoHash}`
  const url = `url = ${info.resource.url}`
  const size = `size = ${info.resource.size}`
  const sizeMB = `size = ${info.resource.size/1024/1024}`
  if (info.resource.url) {
    if (log) console.log(`[NODE]: HTTP sent to ${client} ${resource} ${sizeMB} ${url}`)
  } else {
    if (log) console.log(`[NODE]: WS sent to ${client} ${resource} ${sizeMB}`)
  }
})
node.on("destroyed", () => {
  if (log) console.log("[NODE]: stopped.")
})
node.on("error", error => {
  if (log) console.log("[NODE]: error =", error)
})

if (log) console.log("[NODE]: starting...")
node.start()
