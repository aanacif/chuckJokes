export class Backend {
    constructor() {
        this.baseUrl = "";
    }

    setBaseUrl(baseUrl) {
        this.baseUrl = baseUrl;
    }

    getBaseUrl() {
        return this.baseUrl;
    }

    async get(endpoint) {
        const response = await fetch(this.baseUrl + endpoint);
        return await response.json();
    }

    async post(endpoint, data = {}) {
        const response = await fetch(this.baseUrl + endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }
}