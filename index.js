// Dependency
const axios = require("axios")

// Config
const baseNodeUrlList = [
    "https://symbol-testnet-api-1.next-web-technology.com:3001",
    "https://symbol-testnet-api-2.next-web-technology.com:3001"
]

const timeOut = 1000

// Utility
const urlGenerator = (baseUrl, method) => {
    try {
        const urlObject = method ? new URL(method, baseUrl) : new URL(baseUrl)
        const url = urlObject.toString()
        return url
    } catch (error) {
        console.error("Error! Invalid URL. Check base URL or method in urlGenerator.")
        return undefined
    }
}

const simpleAxiosRequest = async (url) => {
    console.log("url", url)
    if (url) {
        return await axios(url, { timeout : timeOut })
        .then((res) => {
            console.log("data", res.data)
            return res.data
        })
        .catch((error) => {
            // console.error(error)
            console.error("Error! axios failed. host setting of the node is not accurate or protocol (http or https) is not matched.")
            return undefined
        })
    } else {
        console.error("Error! simpleAxiosRequest failed. Because URL is invalid.")
        return undefined
    }
}

const domainToHttpApiNodeUrl = (domain) => {
    return "http://" + domain + ":3000"
}

const domainToHttpsApiNodeUrl = (domain) => {
    return "https://" + domain + ":3001"
}

// Infrastructure
const fetchNodeHealth = async (nodeUrl) => {
    const url = urlGenerator(nodeUrl, "/node/health")
    return await simpleAxiosRequest(url)
}

const fetchNodeInfo = async (nodeUrl) => {
    const url = urlGenerator(nodeUrl, "/node/info")
    return await simpleAxiosRequest(url)
}

const fetchNodePeers = async (nodeUrl) => {
    const url = urlGenerator(nodeUrl, "/node/peers")
    return await simpleAxiosRequest(url)
}

const fetchNodeStorage = async (nodeUrl) => {
    const url = urlGenerator(nodeUrl, "/node/storage")
    return await simpleAxiosRequest(url)
}

const fetchNodeTime = async (nodeUrl) => {
    const url = urlGenerator(nodeUrl, "/node/time")
    return await simpleAxiosRequest(url)
}

const fetchNodeServer = async (nodeUrl) => {
    const url = urlGenerator(nodeUrl, "/node/server")
    return await simpleAxiosRequest(url)
}

// App Logic
const hasApiNode = (nodeInfo) => {
    return nodeInfo.roles === 2 || nodeInfo.roles === 3
}

const filterNodeDomains = (nodePeers) => {
    const nodeDomains = nodePeers.filter((element1) => {
        return hasApiNode(element1)
    }).map((element2) => {
        return element2.host
    })
    return nodeDomains
}

const asyncTestIsHttpApi = async (nodeDomain) => {
    try {
        const nodeUrl = domainToHttpApiNodeUrl(nodeDomain)
        const nodeHealth = await fetchNodeHealth(nodeUrl)
            .catch((error) => {
                console.error(error)
                return undefined
            })
        if (nodeHealth) {
            const isHttpApi = nodeHealth.status.apiNode === "up" ? true : false
            return isHttpApi
        } else {
            console.error("Error! nodeHealth can't be fetched.")
            return false
        }
    } catch {
        console.error("Error! asyncTestIsHttpApi is failed.")
        return false
    }
}

const asyncTestIsHttpsApi = async (nodeDomain) => {
    try {
        const nodeUrl = domainToHttpsApiNodeUrl(nodeDomain)
        const nodeHealth = await fetchNodeHealth(nodeUrl)
            .catch((error) => {
                console.error(error)
                return undefined
            })
        if (nodeHealth) {
            const isHttpsApi = nodeHealth.status.apiNode === "up" ? true : false
            return isHttpsApi
        } else {
            console.error("Error! nodeHealth can't be fetched.")
            return false
        }
    } catch {
        console.error("Error! asyncTestIsHttpsApi is failed.")
        return false
    }
}

// Todo: recursive node explorer procedure is needed.

(async () => {
    const nodeUrl = baseNodeUrlList[0]
    const nodePeers = await fetchNodePeers(nodeUrl)
    const nodeDomains = filterNodeDomains(nodePeers)
    console.log("nodeDomains", nodeDomains)
    const httpApiNodeDomains = []
    for (const domain of nodeDomains) {
        const isHttpApi = await asyncTestIsHttpApi(domain)
        if (isHttpApi) {
            httpApiNodeDomains.push(domain)
        }
        console.log("http", domain, isHttpApi)
    }
    console.log("httpApiNodeDomains", httpApiNodeDomains)

    const httpsApiNodeDomains = []
    for (const domain of nodeDomains) {
        const isHttpsApi = await asyncTestIsHttpsApi(domain)
        if (isHttpsApi) {
            httpsApiNodeDomains.push(domain)
        }
        console.log("https", domain, isHttpsApi)
    }
    console.log("httpsApiNodeDomains", httpsApiNodeDomains)
})()