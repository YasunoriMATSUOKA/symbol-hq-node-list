// Dependency
const axios = require("axios")

// Config
const baseNodeUrlList = [
    "https://symbol-testnet-api-1.next-web-technology.com:3001",
    "https://symbol-testnet-api-2.next-web-technology.com:3001"
]
const defaultMinPageSize = 10
const defaultMaxPageSize = 100

// Utility
const portNo = (peerOrBrokerOrApi, httpOrHttps) => {
    let portNo
    if (peerOrBrokerOrApi === "peer") {
        if (httpOrHttps === "http") {
            portNo = 7900
        } else if (httpOrHttps === "https") {
            portNo = 7901
        } else {
            console.error('Arg must be string "http" or "https".')
        }
    } else if (peerOrBrokerOrApi === "broker") {
        if (httpOrHttps === "http") {
            portNo = 7902
        } else if (httpOrHttps === "https") {
            portNo = 7903
        } else {
            console.error('Arg must be string "http" or "https".')
        }
    } else if (peerOrBrokerOrApi === "api") {
        if (httpOrHttps === "http") {
            portNo = 3000
        } else if (httpOrHttps === "https") {
            portNo = 3001
        } else {
            console.error('Arg must be string "http" or "https".')
        }
    } else {
        console.error('Error! Arg must be string of "peer" or "broker" or "api".')
    }
}

const isPlusInteger = (number) => {
    return Number.isInteger(number) && Math.sign(number) === 1
}

const isValidPageSize = (number) => {
    return number >= defaultMinPageSize && number <= defaultMaxPageSize
}

// Block routes start
const fetchBLockWithHeight = async (nodeUrl, height) => {
    if (isPlusInteger(height)) {
        const method = "/block/" + height
        const urlObject = new URL(method, nodeUrl)
        const url = urlObject.toString()
        console.log("url", url)
        return await axios(url).then((response) => {
            const status = response.status
            console.log("status", status)
            const data = response.data
            console.log("body", data)
            return data
        }).catch((error) => {
            console.error(error)
        })
    } else {
        console.error("Error! height must be plus integer.")
    }
}

const fetchBLocksWithHeightAndLimit = async (nodeUrl, height, pageSize) => {
    if (isPlusInteger(height) && isPlusInteger(pageSize) && isValidPageSize(pageSize)) {
        const method = "/blocks/" + height + "/limit/" + pageSize
        const urlObject = new URL(method, nodeUrl)
        const url = urlObject.toString()
        console.log("url", url)
        return await axios(url).then((response) => {
            const status = response.status
            console.log("status", status)
            const data = response.data
            console.log("body", data)
            return data
        }).catch((error) => {
            console.error(error)
        })
    } else {
        if (!isPlusInteger(height)) {
            console.error("Error! height must be plus integer.")
        }
        if (!isPlusInteger(pageSize)) {
            console.error("Error! pageSize must be plus integer.")
        }
        if (!isValidPageSize(pageSize)) {
            console.error("Error! pageSize must be biger than min page size(=10 in default) and smaller than max page size(=100 in default).")
        }
    }
}

const fetchBLockTransactionsWithHeight = async (nodeUrl, height, pageSize, id, ordering) => {
    if (isPlusInteger(height)) {
        const method = "/block/" + height + "/transactions"
        const urlObject = new URL(method, nodeUrl)
        if (isPlusInteger(pageSize) && isValidPageSize(pageSize)) {
            urlObject.searchParams.set("pageSize", pageSize)
        }
        if (id) {
            urlObject.searchParams.set("id", id)
        }
        if (ordering === "-id" || ordering === "id") {
            urlObject.searchParams.set("ordering", ordering)
        }
        const url = urlObject.toString()
        console.log("url", url)
        return await axios(url).then((response) => {
            const status = response.status
            console.log("status", status)
            const data = response.data
            console.log("body", data)
            return data
        }).catch((error) => {
            console.error(error)
        })
    } else {
        if (!isPlusInteger(height)) {
            console.error("Error! height must be plus integer.")
        }
        if (pageSize) {
            if (!isPlusInteger(pageSize)) {
                console.error("Error! pageSize must be plus integer.")
            }
            if (!isValidPageSize(height)) {
                console.error("Error! pageSize must be biger than min page size(=10 in default) and smaller than max page size(=100 in default).")
            }
        }
        if (ordering) {
            if (ordering !== "-id" || ordering !== "id") {
                console.error("Error! ordering must be -id or id.")
            }
        }
    }
}
// Block routes end

// Chain routes start
const fetchChainHeight = async (nodeUrl) => {
    const urlObject = new URL("/chain/height", nodeUrl)
    const url = urlObject.toString()
    console.log("url", url)
    return await axios(url).then((response) => {
        const status = response.status
        console.log("status", status)
        const data = response.data
        console.log("body", data)
        return data
    }).catch((error) => {
        console.error(error)
    })
}

const fetchChainScore = async (nodeUrl) => {
    const urlObject = new URL("/chain/score", nodeUrl)
    const url = urlObject.toString()
    console.log("url", url)
    return await axios(url).then((response) => {
        const status = response.status
        console.log("status", status)
        const data = response.data
        console.log("body", data)
        return data
    }).catch((error) => {
        console.error(error)
    })
}
// Chain route end

// Network routes start
const fetchNetwork = async (nodeUrl) => {
    const urlObject = new URL("/network", nodeUrl)
    const url = urlObject.toString()
    console.log("url", url)
    return await axios(url).then((response) => {
        const status = response.status
        console.log("status", status)
        const data = response.data
        console.log("body", data)
        return data
    }).catch((error) => {
        console.error(error)
    })
}

const fetchNetworkFees = async (nodeUrl) => {
    const urlObject = new URL("/network/fees", nodeUrl)
    const url = urlObject.toString()
    console.log("url", url)
    return await axios(url).then((response) => {
        const status = response.status
        console.log("status", status)
        const data = response.data
        console.log("body", data)
        return data
    }).catch((error) => {
        console.error(error)
    })
}

// Note: To use this method, maybe, Rest API server must be set optionally.
// Todo: Try after Rest API server optional configuration.
/*
const fetchNetworkProperties = async (nodeUrl) => {
    const urlObject = new URL("/network/properties", nodeUrl)
    const url = urlObject.toString()
    console.log("url", url)
    return await axios(url).then((response) => {
        const status = response.status
        console.log("status", status)
        const data = response.data
        console.log("body", data)
        return data
    }).catch((error) => {
        console.error(error)
    })
}
*/
// Network routes end

// Node routes start
const fetchNodeHealth = async (nodeUrl) => {
    const urlObject = new URL("/node/health", nodeUrl)
    const url = urlObject.toString()
    console.log("url", url)
    return await axios(url).then((response) => {
        const status = response.status
        console.log("status", status)
        const data = response.data
        console.log("body", data)
        return data
    }).catch((error) => {
        console.error(error)
    })
}

const fetchNodeInfo = async (nodeUrl) => {
    const urlObject = new URL("/node/info", nodeUrl)
    const url = urlObject.toString()
    console.log("url", url)
    return await axios(url).then((response) => {
        const status = response.status
        console.log("status", status)
        const data = response.data
        console.log("body", data)
        return data
    }).catch((error) => {
        console.error(error)
    })
}

const fetchNodePeers = async (nodeUrl) => {
    const urlObject = new URL("/node/peers", nodeUrl)
    const url = urlObject.toString()
    console.log("url", url)
    return await axios(url).then((response) => {
        const status = response.status
        console.log("status", status)
        const data = response.data
        console.log("body", data)
        return data
    }).catch((error) => {
        console.error(error)
    })
}

const fetchNodeStorage = async (nodeUrl) => {
    const urlObject = new URL("/node/storage", nodeUrl)
    const url = urlObject.toString()
    console.log("url", url)
    return await axios(url).then((response) => {
        const status = response.status
        console.log("status", status)
        const data = response.data
        console.log("body", data)
        return data
    }).catch((error) => {
        console.error(error)
    })
}

const fetchNodeTime = async (nodeUrl) => {
    const urlObject = new URL("/node/time", nodeUrl)
    const url = urlObject.toString()
    console.log("url", url)
    return await axios(url).then((response) => {
        const status = response.status
        console.log("status", status)
        const data = response.data
        console.log("body", data)
        return data
    }).catch((error) => {
        console.error(error)
    })
}

const fetchNodeServer = async (nodeUrl) => {
    const urlObject = new URL("/node/server", nodeUrl)
    const url = urlObject.toString()
    console.log("url", url)
    return await axios(url).then((response) => {
        const status = response.status
        console.log("status", status)
        const data = response.data
        console.log("body", data)
        return data
    }).catch((error) => {
        console.error(error)
    })
}

(async () => {
    const nodeUrl = baseNodeUrlList[0]
    
    // Block routes start
    const block1 = await fetchBLockWithHeight(nodeUrl, 1)
    const blocks20To11 = await fetchBLocksWithHeightAndLimit(nodeUrl, 20, 10)
    const block1TransactionsDefault = await fetchBLockTransactionsWithHeight(nodeUrl, 1)
    const block1TransactionsPageSize11 = await fetchBLockTransactionsWithHeight(nodeUrl, 1, 11)
    // Todo: id and ordering implementation is not worked well. This must be modified.
    const block1TransactionsPageSize11OrderingId = await fetchBLockTransactionsWithHeight(nodeUrl, 1, 11, undefined, "id")
    // Block routes end
    
    // Chain routes start
    const chainHeight = await fetchChainHeight(nodeUrl)
    const chainScore = await fetchChainScore(nodeUrl)
    // Chain routes end

    // Network routes start
    const network = await fetchNetwork(nodeUrl)
    const networkFees = await fetchNetworkFees(nodeUrl)
    // Note: Probably this method can only be used in optional configured node.
    /*
    const networkProperties = await fetchNetworkProperties(nodeUrl)
    */
    // Network routes end

    // Node routes start
    const nodeInfo = await fetchNodeInfo(nodeUrl)
    const peerNodes = await fetchNodePeers(nodeUrl)
    const nodeHealth = await fetchNodeHealth(nodeUrl)
    const nodeStorage = await fetchNodeStorage(nodeUrl)
    const nodeTime = await fetchNodeTime(nodeUrl)
    const nodeServer = await fetchNodeServer(nodeUrl)
    // Node routes end
})()