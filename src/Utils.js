
import CryptoJS from 'crypto-js';

const TOKEN_KEY = 'ff591090-0805-4282-8493-e9435a4d3d67';
const setTokenData = (data) => {
    const temp = JSON.stringify(data);
    let enc = encrypt(temp);
    localStorage.setItem(TOKEN_KEY, enc);
}
const getTokenData = () => {
    let session_data = localStorage.getItem(TOKEN_KEY);
    if (session_data && session_data.length > 0) {
        let decrypted = decrypt(session_data);
        if (decrypted && decrypted.length > 0) {
            let data = JSON.parse(decrypted);
            if (data?.access_token?.length > 0) {
                return data;
            }
        }
    }
    return null;
}
const generateRandAlphaNumStr = (len) => {
    let rdmString = '';
    for (
        ;
        rdmString.length < len;
        rdmString += Math.random().toString(36).substring(2)
    );
    return rdmString.substring(0, len);
};

const encrypt = (param) => {
    let key = generateRandAlphaNumStr(32);
    let iv = generateRandAlphaNumStr(16);
    let encrypted = CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(param),
        CryptoJS.enc.Utf8.parse(key),
        {
            keySize: 128 / 8,
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }
    );
    return btoa(key + iv + encrypted.toString());
};

const decrypt = (param) => {
    try {
        param = atob(param);
        param = param.replace(' ', '+');
        let key = CryptoJS.enc.Utf8.parse(param.substring(0, 32));
        let iv = CryptoJS.enc.Utf8.parse(param.substring(32, 32 + 16));
        let encryptedText = param.substring(32 + 16);
        let decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch {
        return '';
    }
};
const loanTypes = [
    { name: 'Select Loan Type', value: "" },
    { name: 'Personal Loan', value: 1 },
    { name: 'Crop Loan', value: 2 },
    { name: 'Business Loan', value: 3 }
]
function arrayIndex(tableName, id) {
    return (`${tableName}_${id}`)
}
const numeric_dec_Only = (inputText) => {
    if (inputText) {
        if (inputText.split(".").length > 2) {
            return false;
        }
        let afetrDec = inputText.split(".")[1];
        if (afetrDec?.length > 2) {
            return false
        }
        let patt = /^[0-9.]*$/;
        let result = patt.test(inputText.replaceAll(',', '').toString());
        return result;
    } else {
        return true;
    }
};
const numericOnly = (inputText) => {
    if (inputText) {
        let patt = /^\d+$/;
        let result = patt.test(inputText.replaceAll(',', ''));
        return result;
    } else {
        return true;
    }
};
const alphaNumericOnly = (inputText) => {
    if (inputText) {
        let patt = /^[a-zA-Z0-9]+$/;
        let result = patt.test(inputText);
        return result;
    } else {
        return true;
    }
};
const getKeyForTable = (keyLabel, index) => {
    return keyLabel + '_' + index
}

const convertToPayload = (api_name = "", body = {}, header = {}, uriparam = {}, other = "") => {
    let payload = {
        "apiType": api_name,
        "requestPayload": body,
        "requestHeaders": header,
        "uriParams": uriparam,
        "additionalParam": other
    }
    return payload
}

const apiMethods = [
    { id: 0, name: "GET" },
    { id: 1, name: "POST" },
    { id: 2, name: "PUT" },
    { id: 3, name: "DELETE" },
    { id: 4, name: "PATCH" }
]

const isError = (formikFrom, fieldName) => {
    let condition = false;
    try {
        condition = (formikFrom.errors[fieldName] && formikFrom.touched[fieldName] || (formikFrom.isSubmitting && formikFrom.errors[fieldName]))
    } catch (_) {
        console.log(_)
        condition = false
    }
    return condition
}
async function sendEmail({ subject, body, toRecepients, ccRecepients = [], bccRecepients = [], attachments = {}, contentType }) {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}email/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            subject,
            contentType,
            toRecepients,
            ccRecepients,
            bccRecepients,
            attachments,
            body,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to send email');
    }

    return await response.json();
}

const sidebardata = [
    {
        collection_name: "Introduction",
        collection_id: 0,
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit, exercitationem suscipit. Id deserunt obcaecati nostrum illum, adipisci beatae! Ut, minus? Odio illo sapiente nesciunt commodi, aliquid deserunt aperiam ipsum soluta?",
        category: []
    },
    {
        collection_name: "Encryption & Decryption",
        collection_id: 1,
        "description": "We are using **AES (Advanced Encryption Standard)** encryption and decryption in our project.\n\n- **AES Encryption** secures data by converting it into an unreadable format.\n    \n- **AES Decryption** reverses this process, making the data accessible only to authorized users.\n    \n- This ensures **robust data protection**.\n    \n\n**Encryption Details :**\n\n- The **encrypted cipher** will be passed as a **Base64 encoded string**.\n    \n- The format of the encrypted data is defined in the **API specification.**\n    \n\n##### **Initialization Vector (IV)**\n\n- The **IV** is used during encryption to ensure each encryption operation produces a unique result, even for identical plaintext.\n    \n- It is **randomly generated** and **must be 16 bytes in length** to match the AES block size.\n    \n\n##### **Salt**\n\n- **Salt** is a unique value added to the password before hashing.\n    \n- This prevents identical passwords from generating the same encryption key.\n    \n\n**Key Generation**\n\n- **Algorithm Used:** PBKDF2WithHmacSHA256\n    \n- This algorithm derives a **secret key** from the **shared public key**.\n    \n- The process involves:\n    \n    - **Adding salt** to the key generation.\n        \n    - **Using a high iteration count** to enhance security.\n        \n\n**Sample Encrypted Payload**\n\nThe encrypted data will be passed as a **Base64 encoded string**:\n\nUZ4lK0cwNltGfoqKyIARFQeRT91BLZ43qfge0qs6IAMO7EV7ajX3+MlbP2W0YnKeKq/WJDc+tpbI2Okcb4LBsMbMxWNgSRby0+twvs49WSI7lRyiIyBxi0oFazp/d8gQ2IDDGcsL/sefIHCXZt//4/CIF/4xL4ekVxry22hDyys=\n\n##### **Request Encryption Process**\n\n##### **Public Key**\n\n- A **randomly generated string of length 32** is shared between the client and API.\n    \n\n##### **IV Generation**\n\n- A **16-byte initialization vector (IV)** is generated to ensure proper AES encryption.\n    \n\n**Encryption Steps**\n\nThe payload is encrypted by concatenating the following:\n\n1. **Salt** (randomly generated)\n    \n2. **IV** (16 bytes)\n    \n3. **Encrypted data** using AES/CBC/PKCS5Padding\n    \n\n- The final **encrypted data** is then **Base64 encoded**.\n    \n\n##### **Request Decryption Process**\n\n##### **Steps for Request Decryption**\n\n##### **Step 1: Base64 Decode**\n\n- The **Base64 encoded encrypted payload** is **decoded** back to its original byte format.\n    \n\n##### **Step 2: Extract Salt**\n\n- The **first 16 bytes** of the decoded byte array represent the salt.\n    \n\nsalt = substring(ciphertext, 0, 16);\n\n##### **Step 3: Extract IV**\n\n- The **next 16 bytes** of the decoded byte array represent the initialization vector (IV).\n    \n\niv = substring(ciphertext, 16, 32);\n\n##### **Step 4: Extract Response**\n\n- The **remaining portion** of the byte array contains the encrypted data (ciphertext).\n    \n\nresponse = substring(ciphertext, 32, ciphertext.length);\n\n##### **Step 5: Decryption**\n\n- The encrypted data is **decrypted** using the **AES/CBC/PKCS5Padding cipher**, with the extracted **salt** and **IV**\n    \n\nDecrypted Payload = decrypt(response, salt, iv);",
        category: [
            {
                category_name: "Login Api",
                category_id: 1,
                subcategory: [
                    {
                        api_name: "Otp Login Verification Request",
                        api_id: 1,
                        method: "POST",
                        request_header: [
                            {
                                "key": "client_id",
                                "value": "{{client_id}}",
                                "description": "Unique identifier for API authentication."
                            },
                            {
                                "key": "client_secret",
                                "value": "{{client_secret}}",
                                "description": "Confidential key for API authentication."
                            },
                            {
                                "key": "enc_key",
                                "value": "{{enc_key}}",
                                "description": "A key used to encrypt data.",
                                "type": "text"
                            },
                            {
                                "key": "x-auth-token",
                                "value": "{{x-auth_token}}",
                                "description": "It is a token that must be copied from the WhoAmI/UserToken API response body and included in the request to verify the identity of the user or client making the API call",
                                "type": "text"
                            }
                        ],
                        body: {
                            "mobileNo": "9975772385",
                            "masterSchemaId": "267bc9ca-9213-465f-a7f2-a928626a8b77"
                        },
                        response_header: [
                            {
                                "key": "client_id",
                                "value": "{{client_id}}",
                                "description": "Unique identifier for API authentication."
                            },
                            {
                                "key": "client_secret",
                                "value": "{{client_secret}}",
                                "description": "Confidential key for API authentication."
                            },
                        ],
                        response: [
                            { statusCode: 200, response: { message: "OTP sent successfully", status: true } },
                            { statusCode: 400, response: { message: "Invalid request", status: false } },
                            { statusCode: 404, response: { message: "Resource not found", status: false } },
                            { statusCode: 401, response: { message: "Authentication failed", status: false } },
                            { statusCode: 500, response: { message: "Internal Server Error", status: false } },
                        ],
                        "url": "{{service_base_url}}/oauth-app-qa/api/v1/generate-otp/mobile",
                    },
                ]
            }
        ]
    },
    {
        collection_name: "OAuth 2.0",
        collection_id: 2,
        category: [
            {
                category_name: "Login Api",
                category_id: 1,
                subcategory: [
                    {
                        api_name: "Otp Login Verification Request",
                        api_id: 1,
                        method: "POST",
                        request_header: [
                            {
                                "key": "client_id",
                                "value": "{{client_id}}",
                                "description": "Unique identifier for API authentication."
                            },
                            {
                                "key": "client_secret",
                                "value": "{{client_secret}}",
                                "description": "Confidential key for API authentication."
                            },
                            {
                                "key": "enc_key",
                                "value": "{{enc_key}}",
                                "description": "A key used to encrypt data.",
                                "type": "text"
                            },
                            {
                                "key": "x-auth-token",
                                "value": "{{x-auth_token}}",
                                "description": "It is a token that must be copied from the WhoAmI/UserToken API response body and included in the request to verify the identity of the user or client making the API call",
                                "type": "text"
                            }
                        ],
                        body: {
                            "mobileNo": "9975772385",
                            "masterSchemaId": "267bc9ca-9213-465f-a7f2-a928626a8b77"
                        },
                        response_header: [
                            {
                                "key": "client_id",
                                "value": "{{client_id}}",
                                "description": "Unique identifier for API authentication."
                            },
                            {
                                "key": "client_secret",
                                "value": "{{client_secret}}",
                                "description": "Confidential key for API authentication."
                            },
                        ],
                        response: [
                            { statusCode: 200, response: { message: "OTP sent successfully", status: true } },
                            { statusCode: 400, response: { message: "Invalid request", status: false } },
                            { statusCode: 404, response: { message: "Resource not found", status: false } },
                            { statusCode: 401, response: { message: "Authentication failed", status: false } },
                            { statusCode: 500, response: { message: "Internal Server Error", status: false } },
                        ],
                        "url": "{{service_base_url}}/oauth-app-qa/api/v1/generate-otp/mobile",
                    },
                ]
            }
        ]
    },
    {
        collection_name: "Sales API",
        collection_id: 3,
        "description": "**It includes an API for dealers, designed to manage various dealer-related activities and sales data, ensuring efficient operations.**",
        category: [
            {
                category_name: "Login Api",
                category_id: 1,
                subcategory: [
                    {
                        api_name: "Otp Login Verification Request",
                        api_id: 1,
                        method: "POST",
                        request_header: [
                            {
                                "key": "client_id",
                                "value": "{{client_id}}",
                                "description": "Unique identifier for API authentication."
                            },
                            {
                                "key": "client_secret",
                                "value": "{{client_secret}}",
                                "description": "Confidential key for API authentication."
                            },
                            {
                                "key": "enc_key",
                                "value": "{{enc_key}}",
                                "description": "A key used to encrypt data.",
                                "type": "text"
                            },
                            {
                                "key": "x-auth-token",
                                "value": "{{x-auth_token}}",
                                "description": "It is a token that must be copied from the WhoAmI/UserToken API response body and included in the request to verify the identity of the user or client making the API call",
                                "type": "text"
                            }
                        ],
                        body: {
                            "mobileNo": "9975772385",
                            "masterSchemaId": "267bc9ca-9213-465f-a7f2-a928626a8b77"
                        },
                        response_header: [
                            {
                                "key": "client_id",
                                "value": "{{client_id}}",
                                "description": "Unique identifier for API authentication."
                            },
                            {
                                "key": "client_secret",
                                "value": "{{client_secret}}",
                                "description": "Confidential key for API authentication."
                            },
                        ],
                        response: [
                            { statusCode: 200, response: { message: "OTP sent successfully", status: true } },
                            { statusCode: 400, response: { message: "Invalid request", status: false } },
                            { statusCode: 404, response: { message: "Resource not found", status: false } },
                            { statusCode: 401, response: { message: "Authentication failed", status: false } },
                            { statusCode: 500, response: { message: "Internal Server Error", status: false } },
                        ],
                        "url": "{{service_base_url}}/oauth-app-qa/api/v1/generate-otp/mobile",
                    },
                ]
            }
        ]
    },
    {
        collection_name: "Service API",
        collection_id: 4,
        "description": "**It includes an API for dealers, designed to manage various dealer-related activities and sales data, ensuring efficient operations.**",
        category: [
            {
                category_name: "Login Api",
                category_id: 1,
                subcategory: [
                    {
                        api_name: "Otp Login Verification Request",
                        api_id: 1,
                        method: "POST",
                        request_header: [
                            {
                                "key": "client_id",
                                "value": "{{client_id}}",
                                "description": "Unique identifier for API authentication."
                            },
                            {
                                "key": "client_secret",
                                "value": "{{client_secret}}",
                                "description": "Confidential key for API authentication."
                            },
                            {
                                "key": "enc_key",
                                "value": "{{enc_key}}",
                                "description": "A key used to encrypt data.",
                                "type": "text"
                            },
                            {
                                "key": "x-auth-token",
                                "value": "{{x-auth_token}}",
                                "description": "It is a token that must be copied from the WhoAmI/UserToken API response body and included in the request to verify the identity of the user or client making the API call",
                                "type": "text"
                            }
                        ],
                        body: {
                            "mobileNo": "9975772385",
                            "masterSchemaId": "267bc9ca-9213-465f-a7f2-a928626a8b77"
                        },
                        response_header: [
                            {
                                "key": "client_id",
                                "value": "{{client_id}}",
                                "description": "Unique identifier for API authentication."
                            },
                            {
                                "key": "client_secret",
                                "value": "{{client_secret}}",
                                "description": "Confidential key for API authentication."
                            },
                        ],
                        response: [
                            { statusCode: 200, response: { message: "OTP sent successfully", status: true } },
                            { statusCode: 400, response: { message: "Invalid request", status: false } },
                            { statusCode: 404, response: { message: "Resource not found", status: false } },
                            { statusCode: 401, response: { message: "Authentication failed", status: false } },
                            { statusCode: 500, response: { message: "Internal Server Error", status: false } },
                        ],
                        "url": "{{service_base_url}}/oauth-app-qa/api/v1/generate-otp/mobile",
                    },
                ]
            }
        ]
    }
]

const lang = [
    { img: "curl", lang: "curl" },
    { img: "javascript", lang: "javascript" },
    { img: "php", lang: "php" },
    { img: "python", lang: "python" },
    { img: "nodejs", lang: "Node.js" },
    { img: "go", lang: "GO" },
]

const generators = {
    curl: (apiData) => {
        const headers = apiData.request_header.map((h) => `--header '${h.key}: ${h.value}'`).join(" \\\n");
        return `curl --location --request ${apiData.method} '${apiData.url}' \\\n${headers} \\\n--header 'Content-Type: application/json' \\\n--data-raw '${apiData.body}'`;
    },

    php: (json, body) => {
        const headers = json.request.header.map((h) => `"${h.key}: ${h.value}"`).concat(`"Content-Type: application/json"`).join(",\n    ");
        return `<?php
                    $curl = curl_init();
                    $data = ${body};
                    curl_setopt_array($curl, [
                        CURLOPT_URL => "${json.request.url}",
                        CURLOPT_RETURNTRANSFER => true,
                        CURLOPT_CUSTOMREQUEST => "${json.request.method}",
                        CURLOPT_POSTFIELDS => json_encode($data),
                        CURLOPT_HTTPHEADER => [${headers}],
                    ]);
                    $response = curl_exec($curl);
                    $err = curl_error($curl);
                    curl_close($curl);
                    echo $err ? "cURL Error: $err" : $response;
                ?>`;
    },

    python: (json, body) => {
        const headers = json.request.header.reduce((acc, h) => ({ ...acc, [h.key]: h.value }), { "Content-Type": "application/json" });
        return `import requests
                url = "${json.request.url}"
                headers = ${JSON.stringify(headers, null, 2)}
                payload = ${body}
                response = requests.post(url, headers=headers, json=payload)
                print(response.text)`;
    },

    nodejs: (json, body) => {
        const headers = json.request.header.reduce((acc, h) => ({ ...acc, [h.key]: h.value }), { "Content-Type": "application/json" });
        return `const axios = require('axios');
                    const options = {
                                        method: '${json.request.method}',
                                        url: '${json.request.url}',
                                        headers: ${JSON.stringify(headers, null, 2)},
                                        data: ${body}
                                    };
                    axios.request(options)
                    .then(res => {
                        console.log(res.data);
                        })
                    .catch(err => {
                        console.error(err);
                    });`;
    },

    go: (json, body) => {
        return `package main
import (
  "bytes"
  "fmt"
  "net/http"
  "io/ioutil"
)
func main() {
  url := "${json.request.url}"
  payload := []byte(${JSON.stringify(body)})
  req, _ := http.NewRequest("${json.request.method
            }", url, bytes.NewBuffer(payload))
  ${json.request.header
                .map((h) => `req.Header.Set("${h.key}", "${h.value}")`)
                .join("\n  ")}
  req.Header.Set("Content-Type", "application/json")
  client := &http.Client{}
  res, _ := client.Do(req)
  defer res.Body.Close()
  body, _ := ioutil.ReadAll(res.Body)
  fmt.Println(string(body))
}`;
    },
};

export {
    sidebardata,
    isError,
    loanTypes,
    apiMethods,
    arrayIndex,
    numeric_dec_Only,
    numericOnly,
    alphaNumericOnly,
    getKeyForTable,
    convertToPayload,
    getTokenData,
    setTokenData,
    lang,
    sendEmail,
    generators
}