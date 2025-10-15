var emailjs = (function (e) {
    "use strict";

    class EmailJSResponseStatus {
        constructor(status = 0, text = "Network Error") {
            this.status = status;
            this.text = text;
        }
    }

    const config = {
        origin: "https://api.emailjs.com",
        blockHeadless: false,
        storageProvider: (() => {
            if (typeof localStorage !== "undefined") {
                return {
                    get: (key) => Promise.resolve(localStorage.getItem(key)),
                    set: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
                    remove: (key) => Promise.resolve(localStorage.removeItem(key))
                };
            }
        })()
    };

    const parseOptions = (options) => {
        if (!options) return {};
        if (typeof options === "string") return { publicKey: options };
        if (options.toString() === "[object Object]") return options;
        return {};
    };

    const init = function (options, origin = "https://api.emailjs.com") {
        if (!options) return;
        const opts = parseOptions(options);
        config.publicKey = opts.publicKey;
        config.blockHeadless = opts.blockHeadless;
        config.storageProvider = opts.storageProvider;
        config.blockList = opts.blockList;
        config.limitRate = opts.limitRate;
        config.origin = opts.origin || origin;
    };

    const sendRequest = async function (url, body, headers = {}) {
        const response = await fetch(config.origin + url, { method: "POST", headers, body });
        const text = await response.text();
        const statusObj = new EmailJSResponseStatus(response.status, text);
        if (response.ok) return statusObj;
        throw statusObj;
    };

    const validateKeys = (publicKey, serviceID, templateID) => {
        if (!publicKey || typeof publicKey !== "string")
            throw "The public key is required. Visit https://dashboard.emailjs.com/admin/account";
        if (!serviceID || typeof serviceID !== "string")
            throw "The service ID is required. Visit https://dashboard.emailjs.com/admin";
        if (!templateID || typeof templateID !== "string")
            throw "The template ID is required. Visit https://dashboard.emailjs.com/admin/templates";
    };

    const isHeadlessBrowser = (nav) => nav.webdriver || !nav.languages || nav.languages.length === 0;

    const headlessError = () => new EmailJSResponseStatus(451, "Unavailable For Headless Browser");

    const checkBlockList = (blockList, params) => {
        if (!blockList?.list?.length || !blockList.watchVariable) return false;
        const value = (() => {
            if (!Array.isArray(blockList.list))
                throw "The BlockList list has to be an array";
            if (typeof blockList.watchVariable !== "string")
                throw "The BlockList watchVariable has to be a string";

            const watchVar = blockList.watchVariable;
            return params instanceof FormData ? params.get(watchVar) : params[watchVar];
        })();
        return typeof value === "string" && blockList.list.includes(value);
    };

    const forbiddenError = () => new EmailJSResponseStatus(403, "Forbidden");

    const checkLimitRate = async (path, limitRate, storage) => {
        if (!limitRate?.throttle || !storage) return false;

        if (typeof limitRate.throttle !== "number" || limitRate.throttle < 0)
            throw "The LimitRate throttle has to be a positive number";
        if (limitRate.id && typeof limitRate.id !== "string")
            throw "The LimitRate ID has to be a non-empty string";

        const id = limitRate.id || path;
        const remaining = Number(await storage.get(id) || 0) - (Date.now() - limitRate.throttle);
        if (remaining > 0) return true;

        await storage.set(id, Date.now().toString());
        return false;
    };

    const tooManyRequestsError = () => new EmailJSResponseStatus(429, "Too Many Requests");

    const send = async (serviceID, templateID, templateParams, options) => {
        const opts = parseOptions(options);
        const publicKey = opts.publicKey || config.publicKey;
        const blockHeadless = opts.blockHeadless || config.blockHeadless;
        const storage = opts.storageProvider || config.storageProvider;
        const blockList = { ...config.blockList, ...opts.blockList };
        const limitRate = { ...config.limitRate, ...opts.limitRate };

        if (blockHeadless && isHeadlessBrowser(navigator)) return Promise.reject(headlessError());
        validateKeys(publicKey, serviceID, templateID);
        if (templateParams && typeof templateParams !== "object")
            throw "The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/";

        if (templateParams && checkBlockList(blockList, templateParams)) return Promise.reject(forbiddenError());
        if (await checkLimitRate(location.pathname, limitRate, storage)) return Promise.reject(tooManyRequestsError());

        const body = {
            lib_version: "4.4.1",
            user_id: publicKey,
            service_id: serviceID,
            template_id: templateID,
            template_params: templateParams
        };
        return sendRequest("/api/v1.0/email/send", JSON.stringify(body), { "Content-type": "application/json" });
    };

    const sendForm = async (serviceID, templateID, formSelector, options) => {
        const opts = parseOptions(options);
        const publicKey = opts.publicKey || config.publicKey;
        const blockHeadless = opts.blockHeadless || config.blockHeadless;
        const storage = opts.storageProvider || config.storageProvider;
        const blockList = { ...config.blockList, ...opts.blockList };
        const limitRate = { ...config.limitRate, ...opts.limitRate };

        if (blockHeadless && isHeadlessBrowser(navigator)) return Promise.reject(headlessError());

        const form = typeof formSelector === "string" ? document.querySelector(formSelector) : formSelector;
        validateKeys(publicKey, serviceID, templateID);
        if (!form || form.nodeName !== "FORM")
            throw "The 3rd parameter is expected to be the HTML form element or the style selector of the form";

        const formData = new FormData(form);
        if (checkBlockList(blockList, formData)) return Promise.reject(forbiddenError());
        if (await checkLimitRate(location.pathname, limitRate, storage)) return Promise.reject(tooManyRequestsError());

        formData.append("lib_version", "4.4.1");
        formData.append("service_id", serviceID);
        formData.append("template_id", templateID);
        formData.append("user_id", publicKey);

        return sendRequest("/api/v1.0/email/send-form", formData);
    };

    var api = {
        init,
        send,
        sendForm,
        EmailJSResponseStatus
    };

    e.EmailJSResponseStatus = EmailJSResponseStatus;
    e.default = api;
    e.init = init;
    e.send = send;
    e.sendForm = sendForm;
    Object.defineProperty(e, "__esModule", { value: true });

    return e;
})({});
