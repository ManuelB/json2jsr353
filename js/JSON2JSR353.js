/**
 * JSON 2 JSR 353 Converter
 * 
 * This class can take JSON input as pure JSON or in HAR Format:
 * https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/HAR/Overview.html
 * 
 * It will generate Java Code based on JSR 353 when only JSON is provided.
 * 
 * It will generate a complete JAX RS Client based on JSR 339 when an HAR
 * formed JSON is given.
 * 
 * @author Manuel Blechschmidt <manuel.blechschmidt@incentergy.de>
 */
const JSON2JSR353 = function() {

};
/**
 * Converts a JSON to a JSR 353 compliant Java Code.
 * 
 * The function goes recursively through the object.
 * 
 * Example:
 *  
 * Test Input:
 * {
 *     "one" : 1,
 *     "two" : ["two-one", "two-two"],
 *     "three" : "asdasd",
 *     "four" : {
 *         "_deferred" : {
 *             "more" : {
 *                 "one" :1
 *             }
 *         }
 *     }
 * }
 * Output:
 * Json.createObjectBuilder().add("one", 1).add("two", 
 *     Json.createArrayBuilder().add("two-one").add("two-two").build()
 * ).add("three", "asdasd").add("four", 
 *     Json.createObjectBuilder().add("_deferred", 
 *         Json.createObjectBuilder().add("more", 
 *             Json.createObjectBuilder().add("one", 1).build()
 *         ).build()
 *     ).build()
 * ).build()
 * 
 * @param {object} vInput the object to convert
 * @param {string} sPrefix blanks to prefix the objects
 */
JSON2JSR353.prototype.convertJSON2Java = function(vInput, sPrefix) {
    var me = this;
    switch (typeof vInput) {
        case "string":
            return "\"" + vInput + "\"";
        case "number":
            return vInput;
        case "boolean":
            return vInput ? "JsonValue.TRUE" : "JsonValue.FALSE";
        case "undefined":
            return "null";
    }
    if (typeof vInput === "object") {
        if (vInput === null) {
            return "JsonValue.NULL";
        }
        let sExpression = "\n" + sPrefix + "Json.";
        if (Array.isArray(vInput)) {
            sExpression += "createArrayBuilder()";
            if (vInput.length > 0) {
                sExpression += ".add(" + vInput.map(function(o) {
                    return me.convertJSON2Java(o, sPrefix + "    ");
                }).join(").add(") + ")";
            }
            sExpression += ".build()\n";
        } else {
            sExpression += "createObjectBuilder()";
            if (Object.keys(vInput).length > 0) {
                sExpression += ".add(" + Object.keys(vInput).map(function(key) {
                    return "\"" + key + "\", " + me.convertJSON2Java(vInput[key], sPrefix + "    ");
                }).join(").add(") + ")";
            }
            sExpression += ".build()\n";
        }
        return sExpression + sPrefix.replace(/    /, "");
    }
    console.warning("Unexpected type supplied to convertJSON2Java: " + (typeof vInput));
    return "null";
}

/**
 * Converts a batch part of a multipart content to a Java variable definition
 * 
 * @param {string} sMultipartBoundaryString the string to convert
 * @param {string} sBoundary the boundary parameter
 * @param {int} i a counter to name the variable
 * @param {string} prefix for the variable in case of recursion is needed
 */
JSON2JSR353.prototype.convertMultiPartBoundary2JavaString = function(sMultipartBoundaryString, sBoundary, i, sPrefix) {
    let sPostDataDefinition = "String postData" + sPrefix + i + " = \"\";\n";
    let aPostParts = sMultipartBoundaryString.split("--" + sBoundary);
    // Remove first element
    aPostParts.shift();
    // Remove last element
    aPostParts.pop();
    for (let k in aPostParts) {
        sPostDataDefinition += "postData" + sPrefix + i + " += \"--" + this.escapeStringAsJavaVariable(sBoundary, false) + "\";\n";
        let sBatchRequest = aPostParts[k];
        let aBatchRequestParts = sBatchRequest.split(/\r\n\r\n/);
        let sHeaderOne = aBatchRequestParts.shift();
        let sContent = aBatchRequestParts.join("\r\n\r\n");
        sPostDataDefinition += "postData" + sPrefix + i + " += " + this.escapeStringAsJavaVariable(sHeaderOne) + ";\n";
        if (sHeaderOne.match(/Content-Type: application\/http/)) {
            aBatchRequestParts = sContent.split(/\r\n\r\n/);
            // GET Verfahrens/$count HTTP/1.1
            // sap-contextid-accept: header
            // Accept: text/plain, */*;q=0.5
            // Accept-Language: en
            // DataServiceVersion: 2.0
            // MaxDataServiceVersion: 2.0
            // sap-cancel-on-close: true
            sPostDataDefinition += "postData" + sPrefix + i + " += " + this.escapeStringAsJavaVariable(aBatchRequestParts[0].replace(/Content-Length: \d+$/, "")) + ";\n";
            if (aBatchRequestParts[0].match(/Content-Type: application\/json/)) {
                sPostDataDefinition += "JsonObject postData" + sPrefix + i + "_" + k + " = " + this.convertJSON2Java(JSON.parse(aBatchRequestParts[1]), "") + ";\n";
                sPostDataDefinition += "postData" + sPrefix + i + " += postData" + sPrefix + i + "_" + k + ".toString();\n";
            } else if (aBatchRequestParts.length > 1 && aBatchRequestParts[1] != "") {
                sPostDataDefinition += "postData" + sPrefix + i + " += " + this.escapeStringAsJavaVariable(aBatchRequestParts[1]) + ";\n";
            }
        } else if (sHeaderOne.match(/multipart\/mixed;\s*boundary=(.*)$/gm)) {
            sPostDataDefinition += this.convertMultiPartBoundary2JavaString(sContent, RegExp.$1, i + 1, sPrefix + "_" + i);
            sPostDataDefinition += "postData" + i + " += postData" + sPrefix + "_" + i + (i + 1) + ";\n";
        } else {
            sPostDataDefinition += "postData" + i + " += " + this.escapeStringAsJavaVariable(sContent) + ";\n";
        }
    }
    return sPostDataDefinition;
};
/**
 * Converts a HAR JSON Object to a complete JAX-RS JSR 339 client.
 * @param {object} oInput object to input
 */
JSON2JSR353.prototype.convertHAR2Java = function(oInput) {
    const mOutputHeaders = {
        "Accept": true,
        "accept": true,
        "Accept-Language": true,
        "accept-language": true,
        "Content-Type": true,
        "content-type": true
    };
    let sOutput = "Client client = ClientBuilder.newClient();\n";
    sOutput += "client.register(new LoggingFilter(Logger.getLogger(LoggingFilter.class.getName()), true));\n";
    let sPostDataDefinition = "";
    for (let i in oInput.log.entries) {
        let oRequest = oInput.log.entries[i].request;
        let anchor = document.createElement("a");
        anchor.href = oRequest.url;
        let sRequestOutput = "client.target(\"" + anchor.protocol + "//" + anchor.host + "\").path(\"" + anchor.pathname + "\")";
        if (anchor.search) {
            let sSearch = anchor.search;
            // cut ? 
            sSearch = sSearch.substr(0, sSearch.length - 1);
            sRequestOutput += ".queryParam(" + sSearch.split(/&/).map(function(sParamPair) {
                    return sParamPair.split(/=/)
                })
                .map(function(aParamPair) {
                    return "\"" + aParamPair[0] + "\", \"" + aParamPair[1] + "\"";
                }).join(").queryParam(") + ")";
        }
        sRequestOutput += ".request()";

        for (let j in oRequest.headers) {
            let oHeader = oRequest.headers[j];
            if (mOutputHeaders[oHeader.name]) {
                sRequestOutput += ".header(\"" + oHeader.name + "\", \"" + oHeader.value + "\")";
            }
        }
        if (oRequest.method === "GET") {
            sRequestOutput += ".get();";
        } else if (oRequest.method === "POST") {
            sRequestOutput += ".post(";
            if (oRequest.postData.mimeType === "application/json") {
                sRequestOutput += "Entity.json(";
                sPostDataDefinition = "JsonObject postData" + i + " = " + this.convertJSON2Java(JSON.parse(oRequest.postData.text), "") + ";";
                sRequestOutput += "postData" + i + ")";
            } else if (oRequest.postData.mimeType.match(/multipart\/mixed;\s*boundary=(.*)$/)) {
                sRequestOutput += "Entity.text(";
                sPostDataDefinition = this.convertMultiPartBoundary2JavaString(oRequest.postData.text, RegExp.$1, i, "");
                sRequestOutput += "postData" + i;
                sRequestOutput += ")";
            } else {
                sRequestOutput += "Entity.text(\"";
                sRequestOutput += oRequest.postData.text;
                sRequestOutput += "\")";
            }
            sRequestOutput += ");\n";
        }
        sOutput += sPostDataDefinition + "\n" + sRequestOutput;
    }
    return sOutput;
};
/**
 * Encodes the given string as a string that can be used
 * in a Java variable.
 * @param {string} s the string to escape
 * @param {boolean} bQuotes should quotes be included
 */
JSON2JSR353.prototype.escapeStringAsJavaVariable = function(s, bQuotes) {
    if (bQuotes === undefined) {
        bQuotes = true;
    }
    return (bQuotes ? "\"" : "") + s.replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/"/g, "\\\"") + (bQuotes ? "\"" : "");
};
/**
 * Handler function for a form.
 */
JSON2JSR353.prototype.convertJSON2JavaSubmit = function() {
    document.getElementById("error").innerHTML = "";
    let sInput = document.getElementById("input").value;
    try {
        let oInput = JSON.parse(sInput);
        let sOutput;
        // HAR JSON detected
        if ("log" in oInput) {
            sOutput = this.convertHAR2Java(oInput);
        } else {
            sOutput = this.convertJSON2Java(oInput, "");
        }
        document.getElementById("output").value = sOutput;
    } catch (e) {
        document.getElementById("error").innerHTML = e.message;
    }
    // do not submit the form
    return false;
};