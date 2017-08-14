QUnit.test("JSON2JSR353 convertJSON2Java", function(assert) {
    let json2jsr353 = new JSON2JSR353();
    let sJavaCode = json2jsr353.convertJSON2Java({
        "one": 1,
        "two": ["two-one", "two-two"],
        "three": "asdasd",
        "four": {
            "_deferred": {
                "more": {
                    "one": 1
                }
            }
        }
    }, "");
    assert.equal(sJavaCode, "\nJson.createObjectBuilder().add(\"one\", 1).add(\"two\", \n    Json.createArrayBuilder().add(\"two-one\").add(\"two-two\").build()\n).add(\"three\", \"asdasd\").add(\"four\", \n    Json.createObjectBuilder().add(\"_deferred\", \n        Json.createObjectBuilder().add(\"more\", \n            Json.createObjectBuilder().add(\"one\", 1).build()\n        ).build()\n    ).build()\n).build()\n");
});

QUnit.test("JSON2JSR353 convertJSON2Java", function(assert) {
    let json2jsr353 = new JSON2JSR353();
    let sJavaCode = json2jsr353.convertJSON2Java({
        "null": null,
        "bTrue": true,
        "bFalse": false
    }, "");
    assert.equal(sJavaCode, "\nJson.createObjectBuilder().add(\"null\", JsonValue.NULL).add(\"bTrue\", JsonValue.TRUE).add(\"bFalse\", JsonValue.FALSE).build()\n");
});

QUnit.test("JSON2JSR353 escapeStringAsJavaVariable", function(assert) {
    let json2jsr353 = new JSON2JSR353();
    assert.equal(json2jsr353.escapeStringAsJavaVariable("\"\""), "\"\\\"\\\"\"");
    assert.equal(json2jsr353.escapeStringAsJavaVariable("\r\n"), "\"\\r\\n\"");
    assert.equal(json2jsr353.escapeStringAsJavaVariable("\r\n\r\n\r\n"), "\"\\r\\n\\r\\n\\r\\n\"");
});
QUnit.test("JSON2JSR353 convertMultiPartBoundary2JavaString", function(assert) {
    let json2jsr353 = new JSON2JSR353();
    let sMultiPartContent = "\r\n--batch_08b5-082f-c632\r\nContent-Type: multipart/mixed; boundary=changeset_d322-3bee-e03f\r\n\r\n--changeset_d322-3bee-e03f\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nPOST Aussaats HTTP/1.1\r\nsap-cancel-on-close: true\r\nContent-Type: application/json\r\nsap-contextid-accept: header\r\nAccept: application/json\r\nAccept-Language: en\r\nDataServiceVersion: 2.0\r\nMaxDataServiceVersion: 2.0\r\nContent-Length: 637\r\n\r\n{\"Id\":\"5a418a05-27aa-c286-973f-1887cef498ce\",\"Name\":\"Aussaat (Beetsaat) Aug 11, 2017\",\"GeplanterStart\":\"\\/Date(1502434800000)\\/\",\"GeplantesEnde\":\"\\/Date(1502463600000)\\/\",\"GeplanteDauerInStunden\":8,\"__metadata\":{\"type\":\"application.Aussaat\",\"uri\":\"/application/Agrar.svc/Aussaats('5a418a05-27aa-c286-973f-1887cef498ce')\"},\"FlaecheInHektar\":0.9523124302402138,\"StatusDetails\":{\"__deferred\":{\"uri\":\"Statuss('4AB87834-7695-4B9C-8695-F880E5C5F640')\"}},\"VerfahrenDetails\":{\"__deferred\":{\"uri\":\"Verfahrens('d37d827f-21c4-479d-8414-fd8e7fac5bac')\"}},\"ArbeitsortDetails\":[{\"__deferred\":{\"uri\":\"Anbaus('f83aa67d-05a1-44c9-82be-8d718dc1cbdd')\"}}]}\r\n--changeset_d322-3bee-e03f\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nPOST Aussaats('5a418a05-27aa-c286-973f-1887cef498ce')/RessourceDetails HTTP/1.1\r\nsap-cancel-on-close: true\r\nContent-Type: application/json\r\nsap-contextid-accept: header\r\nAccept: application/json\r\nAccept-Language: en\r\nDataServiceVersion: 2.0\r\nMaxDataServiceVersion: 2.0\r\nContent-Length: 557\r\n\r\n{\"Name\":\"Sämaschine\",\"Menge\":8,\"Gesamtkosten\":0,\"Dtype\":\"MaschinenUnterstuetzung\",\"Objekt_Dtype\":\"Maschine\",\"__metadata\":{\"type\":\"application.Ressource\",\"uri\":\"/application/Agrar.svc/Ressources('9d3215c6-b472-3d1c-5751-1dc4d37f879f')\"},\"Id\":\"9d3215c6-b472-3d1c-5751-1dc4d37f879f\",\"ObjektDetails1\":{\"__deferred\":{\"uri\":\"Maschines('07952cc6-44d7-41fd-9064-0ed838e7c013')\"}},\"MassnahmeDetails\":{\"__deferred\":{\"uri\":\"Aussaats('5a418a05-27aa-c286-973f-1887cef498ce')\"}},\"EinheitDetails\":{\"__deferred\":{\"uri\":\"Einheits('37645944-f977-406f-9815-cc3d4556082a')\"}}}\r\n--changeset_d322-3bee-e03f\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nPOST Aussaats('5a418a05-27aa-c286-973f-1887cef498ce')/RessourceDetails HTTP/1.1\r\nsap-cancel-on-close: true\r\nContent-Type: application/json\r\nsap-contextid-accept: header\r\nAccept: application/json\r\nAccept-Language: en\r\nDataServiceVersion: 2.0\r\nMaxDataServiceVersion: 2.0\r\nContent-Length: 553\r\n\r\n{\"Name\":\"Traktor\",\"Menge\":8,\"Gesamtkosten\":0,\"Dtype\":\"MaschinenUnterstuetzung\",\"Objekt_Dtype\":\"Maschine\",\"__metadata\":{\"type\":\"application.Ressource\",\"uri\":\"/application/Agrar.svc/Ressources('479cfd54-7d79-018e-ab60-5a285c054f51')\"},\"Id\":\"479cfd54-7d79-018e-ab60-5a285c054f51\",\"ObjektDetails1\":{\"__deferred\":{\"uri\":\"Maschines('8304c72f-618b-4fac-802b-dc57770ebc36')\"}},\"MassnahmeDetails\":{\"__deferred\":{\"uri\":\"Aussaats('5a418a05-27aa-c286-973f-1887cef498ce')\"}},\"EinheitDetails\":{\"__deferred\":{\"uri\":\"Einheits('37645944-f977-406f-9815-cc3d4556082a')\"}}}\r\n--changeset_d322-3bee-e03f--\r\n\r\n--batch_08b5-082f-c632--\r\n";
    let sJavaCode = json2jsr353.convertMultiPartBoundary2JavaString(sMultiPartContent, "batch_08b5-082f-c632", 0, "");
    // console.log(sJavaCode.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/\"/g, "\\\""));
    assert.equal(sJavaCode, "String postData0 = \"\";\npostData0 += \"--batch_08b5-082f-c632\";\npostData0 += \"\\r\\nContent-Type: multipart/mixed; boundary=changeset_d322-3bee-e03f\";\nString postData_01 = \"\";\npostData_01 += \"--changeset_d322-3bee-e03f\";\npostData_01 += \"\\r\\nContent-Type: application/http\\r\\nContent-Transfer-Encoding: binary\";\npostData_01 += \"POST Aussaats HTTP/1.1\\r\\nsap-cancel-on-close: true\\r\\nContent-Type: application/json\\r\\nsap-contextid-accept: header\\r\\nAccept: application/json\\r\\nAccept-Language: en\\r\\nDataServiceVersion: 2.0\\r\\nMaxDataServiceVersion: 2.0\\r\\n\";\nJsonObject postData_01_0 = \nJson.createObjectBuilder().add(\"Id\", \"5a418a05-27aa-c286-973f-1887cef498ce\").add(\"Name\", \"Aussaat (Beetsaat) Aug 11, 2017\").add(\"GeplanterStart\", \"/Date(1502434800000)/\").add(\"GeplantesEnde\", \"/Date(1502463600000)/\").add(\"GeplanteDauerInStunden\", 8).add(\"__metadata\", \n    Json.createObjectBuilder().add(\"type\", \"application.Aussaat\").add(\"uri\", \"/application/Agrar.svc/Aussaats('5a418a05-27aa-c286-973f-1887cef498ce')\").build()\n).add(\"FlaecheInHektar\", 0.9523124302402138).add(\"StatusDetails\", \n    Json.createObjectBuilder().add(\"__deferred\", \n        Json.createObjectBuilder().add(\"uri\", \"Statuss('4AB87834-7695-4B9C-8695-F880E5C5F640')\").build()\n    ).build()\n).add(\"VerfahrenDetails\", \n    Json.createObjectBuilder().add(\"__deferred\", \n        Json.createObjectBuilder().add(\"uri\", \"Verfahrens('d37d827f-21c4-479d-8414-fd8e7fac5bac')\").build()\n    ).build()\n).add(\"ArbeitsortDetails\", \n    Json.createArrayBuilder().add(\n        Json.createObjectBuilder().add(\"__deferred\", \n            Json.createObjectBuilder().add(\"uri\", \"Anbaus('f83aa67d-05a1-44c9-82be-8d718dc1cbdd')\").build()\n        ).build()\n    ).build()\n).build()\n;\npostData_01 += postData_01_0.toString();\npostData_01 += \"--changeset_d322-3bee-e03f\";\npostData_01 += \"\\r\\nContent-Type: application/http\\r\\nContent-Transfer-Encoding: binary\";\npostData_01 += \"POST Aussaats('5a418a05-27aa-c286-973f-1887cef498ce')/RessourceDetails HTTP/1.1\\r\\nsap-cancel-on-close: true\\r\\nContent-Type: application/json\\r\\nsap-contextid-accept: header\\r\\nAccept: application/json\\r\\nAccept-Language: en\\r\\nDataServiceVersion: 2.0\\r\\nMaxDataServiceVersion: 2.0\\r\\n\";\nJsonObject postData_01_1 = \nJson.createObjectBuilder().add(\"Name\", \"Sämaschine\").add(\"Menge\", 8).add(\"Gesamtkosten\", 0).add(\"Dtype\", \"MaschinenUnterstuetzung\").add(\"Objekt_Dtype\", \"Maschine\").add(\"__metadata\", \n    Json.createObjectBuilder().add(\"type\", \"application.Ressource\").add(\"uri\", \"/application/Agrar.svc/Ressources('9d3215c6-b472-3d1c-5751-1dc4d37f879f')\").build()\n).add(\"Id\", \"9d3215c6-b472-3d1c-5751-1dc4d37f879f\").add(\"ObjektDetails1\", \n    Json.createObjectBuilder().add(\"__deferred\", \n        Json.createObjectBuilder().add(\"uri\", \"Maschines('07952cc6-44d7-41fd-9064-0ed838e7c013')\").build()\n    ).build()\n).add(\"MassnahmeDetails\", \n    Json.createObjectBuilder().add(\"__deferred\", \n        Json.createObjectBuilder().add(\"uri\", \"Aussaats('5a418a05-27aa-c286-973f-1887cef498ce')\").build()\n    ).build()\n).add(\"EinheitDetails\", \n    Json.createObjectBuilder().add(\"__deferred\", \n        Json.createObjectBuilder().add(\"uri\", \"Einheits('37645944-f977-406f-9815-cc3d4556082a')\").build()\n    ).build()\n).build()\n;\npostData_01 += postData_01_1.toString();\npostData_01 += \"--changeset_d322-3bee-e03f\";\npostData_01 += \"\\r\\nContent-Type: application/http\\r\\nContent-Transfer-Encoding: binary\";\npostData_01 += \"POST Aussaats('5a418a05-27aa-c286-973f-1887cef498ce')/RessourceDetails HTTP/1.1\\r\\nsap-cancel-on-close: true\\r\\nContent-Type: application/json\\r\\nsap-contextid-accept: header\\r\\nAccept: application/json\\r\\nAccept-Language: en\\r\\nDataServiceVersion: 2.0\\r\\nMaxDataServiceVersion: 2.0\\r\\n\";\nJsonObject postData_01_2 = \nJson.createObjectBuilder().add(\"Name\", \"Traktor\").add(\"Menge\", 8).add(\"Gesamtkosten\", 0).add(\"Dtype\", \"MaschinenUnterstuetzung\").add(\"Objekt_Dtype\", \"Maschine\").add(\"__metadata\", \n    Json.createObjectBuilder().add(\"type\", \"application.Ressource\").add(\"uri\", \"/application/Agrar.svc/Ressources('479cfd54-7d79-018e-ab60-5a285c054f51')\").build()\n).add(\"Id\", \"479cfd54-7d79-018e-ab60-5a285c054f51\").add(\"ObjektDetails1\", \n    Json.createObjectBuilder().add(\"__deferred\", \n        Json.createObjectBuilder().add(\"uri\", \"Maschines('8304c72f-618b-4fac-802b-dc57770ebc36')\").build()\n    ).build()\n).add(\"MassnahmeDetails\", \n    Json.createObjectBuilder().add(\"__deferred\", \n        Json.createObjectBuilder().add(\"uri\", \"Aussaats('5a418a05-27aa-c286-973f-1887cef498ce')\").build()\n    ).build()\n).add(\"EinheitDetails\", \n    Json.createObjectBuilder().add(\"__deferred\", \n        Json.createObjectBuilder().add(\"uri\", \"Einheits('37645944-f977-406f-9815-cc3d4556082a')\").build()\n    ).build()\n).build()\n;\npostData_01 += postData_01_2.toString();\npostData0 += postData_01;\n");
});
QUnit.test("JSON2JSR353 convertHAR2Java", function(assert) {
    let json2jsr353 = new JSON2JSR353();
    let oHarObject = {
        "log": {
            "version": "1.2",
            "creator": {
                "name": "WebInspector",
                "version": "537.36"
            },
            "pages": [{
                "startedDateTime": "2017-08-11T14:30:41.783Z",
                "id": "page_2",
                "title": "https://example.com/application/index.jsf",
                "pageTimings": {
                    "onContentLoad": 324.0340000484139,
                    "onLoad": 3451.82700001169
                }
            }],
            "entries": [{
                "startedDateTime": "2017-08-11T14:30:58.685Z",
                "time": 276.6950000077486,
                "request": {
                    "method": "POST",
                    "url": "https://example.com/application/Agrar.svc/$batch",
                    "httpVersion": "unknown",
                    "headers": [{
                            "name": "content-type",
                            "value": "multipart/mixed;boundary=batch_270b-f0a8-fded"
                        },
                        {
                            "name": "accept",
                            "value": "application/json"
                        }
                    ],
                    "queryString": [],
                    "cookies": [],
                    "headersSize": -1,
                    "bodySize": 3863,
                    "postData": {
                        "mimeType": "multipart/mixed;boundary=batch_270b-f0a8-fded",
                        "text": "\r\n--batch_270b-f0a8-fded\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nGET Aussaats('5a418a05-27aa-c286-973f-1887cef498ce')/RessourceDetails?$skip=1&$top=999 HTTP/1.1\r\nsap-contextid-accept: header\r\nAccept: application/json\r\nAccept-Language: en\r\nDataServiceVersion: 2.0\r\nMaxDataServiceVersion: 2.0\r\nsap-cancel-on-close: true\r\n\r\n\r\n--batch_270b-f0a8-fded\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nGET Einheits/$count?$filter=Visible%20eq%20true%20and%20Id%20eq%20%2737645944-f977-406f-9815-cc3d4556082a%27 HTTP/1.1\r\nsap-contextid-accept: header\r\nAccept: text/plain, */*;q=0.5\r\nAccept-Language: en\r\nDataServiceVersion: 2.0\r\nMaxDataServiceVersion: 2.0\r\nsap-cancel-on-close: true\r\n\r\n\r\n--batch_270b-f0a8-fded\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nGET Einheits?$skip=0&$top=1000&$orderby=EinheitKategorieDetails/Id%20asc,KurzBezeichnung%20asc&$filter=Visible%20eq%20true%20and%20Id%20eq%20%2737645944-f977-406f-9815-cc3d4556082a%27 HTTP/1.1\r\nsap-contextid-accept: header\r\nAccept: application/json\r\nAccept-Language: en\r\nDataServiceVersion: 2.0\r\nMaxDataServiceVersion: 2.0\r\nsap-cancel-on-close: true\r\n\r\n\r\n--batch_270b-f0a8-fded\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nGET Einheits/$count?$filter=Visible%20eq%20true%20and%20(EinheitKategorieDetails/Id%20eq%20%271bfcae80-42df-4f12-97ae-9803ba179d02%27%20or%20EinheitKategorieDetails/Id%20eq%20%27f6b057f9-7b3e-4787-b832-03a82aa4bce3%27) HTTP/1.1\r\nsap-contextid-accept: header\r\nAccept: text/plain, */*;q=0.5\r\nAccept-Language: en\r\nDataServiceVersion: 2.0\r\nMaxDataServiceVersion: 2.0\r\nsap-cancel-on-close: true\r\n\r\n\r\n--batch_270b-f0a8-fded\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nGET Einheits?$skip=0&$top=1000&$orderby=EinheitKategorieDetails/Id%20asc,KurzBezeichnung%20asc&$filter=Visible%20eq%20true%20and%20(EinheitKategorieDetails/Id%20eq%20%271bfcae80-42df-4f12-97ae-9803ba179d02%27%20or%20EinheitKategorieDetails/Id%20eq%20%27f6b057f9-7b3e-4787-b832-03a82aa4bce3%27) HTTP/1.1\r\nsap-contextid-accept: header\r\nAccept: application/json\r\nAccept-Language: en\r\nDataServiceVersion: 2.0\r\nMaxDataServiceVersion: 2.0\r\nsap-cancel-on-close: true\r\n\r\n\r\n--batch_270b-f0a8-fded\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nGET Verfahrens/$count?$filter=(Id%20eq%20%2703bd40d3-0ec4-45fe-919f-195e822ae0cf%27%20or%20Id%20eq%20%27180a675a-f9fb-443a-b7d6-9e3d548c43fa%27%20or%20Id%20eq%20%2721421809-9aa5-49c7-ac27-f2d56644e2fa%27%20or%20Id%20eq%20%278e986522-d2ad-453b-bff7-b5982edd3381%27%20or%20Id%20eq%20%27a982fdfd-1335-4912-9280-03df21fca9fb%27%20or%20Id%20eq%20%27d2b8afdb-b85e-4183-b9c2-81eb7cf53ca6%27%20or%20Id%20eq%20%27d37d827f-21c4-479d-8414-fd8e7fac5bac%27%20or%20Id%20eq%20%27f8042142-c46d-46ea-8f05-05d7aeaa6fd8%27) HTTP/1.1\r\nsap-contextid-accept: header\r\nAccept: text/plain, */*;q=0.5\r\nAccept-Language: en\r\nDataServiceVersion: 2.0\r\nMaxDataServiceVersion: 2.0\r\nsap-cancel-on-close: true\r\n\r\n\r\n--batch_270b-f0a8-fded\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nGET Verfahrens?$skip=0&$top=1000&$orderby=Name%20asc&$filter=(Id%20eq%20%2703bd40d3-0ec4-45fe-919f-195e822ae0cf%27%20or%20Id%20eq%20%27180a675a-f9fb-443a-b7d6-9e3d548c43fa%27%20or%20Id%20eq%20%2721421809-9aa5-49c7-ac27-f2d56644e2fa%27%20or%20Id%20eq%20%278e986522-d2ad-453b-bff7-b5982edd3381%27%20or%20Id%20eq%20%27a982fdfd-1335-4912-9280-03df21fca9fb%27%20or%20Id%20eq%20%27d2b8afdb-b85e-4183-b9c2-81eb7cf53ca6%27%20or%20Id%20eq%20%27d37d827f-21c4-479d-8414-fd8e7fac5bac%27%20or%20Id%20eq%20%27f8042142-c46d-46ea-8f05-05d7aeaa6fd8%27)&$expand=Massnahmeart2VerfahrenDetails HTTP/1.1\r\nsap-contextid-accept: header\r\nAccept: application/json\r\nAccept-Language: en\r\nDataServiceVersion: 2.0\r\nMaxDataServiceVersion: 2.0\r\nsap-cancel-on-close: true\r\n\r\n\r\n--batch_270b-f0a8-fded--\r\n"
                    }
                },
                "response": {
                    "status": 202,
                    "statusText": "",
                    "httpVersion": "unknown",
                    "headers": [],
                    "cookies": [],
                    "content": {
                        "size": 40644,
                        "mimeType": "multipart/mixed",
                        "encoding": "base64"
                    },
                    "redirectURL": "",
                    "headersSize": -1,
                    "bodySize": -1,
                    "_transferSize": 40781
                },
                "cache": {},
                "timings": {
                    "blocked": 1.34600000455976,
                    "dns": -1,
                    "connect": -1,
                    "send": 3.0280000064522,
                    "wait": 258.01900005899404,
                    "receive": 14.301999937742607,
                    "ssl": -1
                },
                "serverIPAddress": "54.93.50.215",
                "connection": "115861",
                "pageref": "page_2"
            }]
        }
    };
    let sResult = json2jsr353.convertHAR2Java(oHarObject);
    // console.log(sResult.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/\"/g, "\\\""));
    assert.equal(sResult, "Client client = ClientBuilder.newClient();\nclient.register(new LoggingFilter(Logger.getLogger(LoggingFilter.class.getName()), true));\nString postData0 = \"\";\npostData0 += \"--batch_270b-f0a8-fded\";\npostData0 += \"\\r\\nContent-Type: application/http\\r\\nContent-Transfer-Encoding: binary\";\npostData0 += \"GET Aussaats('5a418a05-27aa-c286-973f-1887cef498ce')/RessourceDetails?$skip=1&$top=999 HTTP/1.1\\r\\nsap-contextid-accept: header\\r\\nAccept: application/json\\r\\nAccept-Language: en\\r\\nDataServiceVersion: 2.0\\r\\nMaxDataServiceVersion: 2.0\\r\\nsap-cancel-on-close: true\";\npostData0 += \"\\r\\n\";\npostData0 += \"--batch_270b-f0a8-fded\";\npostData0 += \"\\r\\nContent-Type: application/http\\r\\nContent-Transfer-Encoding: binary\";\npostData0 += \"GET Einheits/$count?$filter=Visible%20eq%20true%20and%20Id%20eq%20%2737645944-f977-406f-9815-cc3d4556082a%27 HTTP/1.1\\r\\nsap-contextid-accept: header\\r\\nAccept: text/plain, */*;q=0.5\\r\\nAccept-Language: en\\r\\nDataServiceVersion: 2.0\\r\\nMaxDataServiceVersion: 2.0\\r\\nsap-cancel-on-close: true\";\npostData0 += \"\\r\\n\";\npostData0 += \"--batch_270b-f0a8-fded\";\npostData0 += \"\\r\\nContent-Type: application/http\\r\\nContent-Transfer-Encoding: binary\";\npostData0 += \"GET Einheits?$skip=0&$top=1000&$orderby=EinheitKategorieDetails/Id%20asc,KurzBezeichnung%20asc&$filter=Visible%20eq%20true%20and%20Id%20eq%20%2737645944-f977-406f-9815-cc3d4556082a%27 HTTP/1.1\\r\\nsap-contextid-accept: header\\r\\nAccept: application/json\\r\\nAccept-Language: en\\r\\nDataServiceVersion: 2.0\\r\\nMaxDataServiceVersion: 2.0\\r\\nsap-cancel-on-close: true\";\npostData0 += \"\\r\\n\";\npostData0 += \"--batch_270b-f0a8-fded\";\npostData0 += \"\\r\\nContent-Type: application/http\\r\\nContent-Transfer-Encoding: binary\";\npostData0 += \"GET Einheits/$count?$filter=Visible%20eq%20true%20and%20(EinheitKategorieDetails/Id%20eq%20%271bfcae80-42df-4f12-97ae-9803ba179d02%27%20or%20EinheitKategorieDetails/Id%20eq%20%27f6b057f9-7b3e-4787-b832-03a82aa4bce3%27) HTTP/1.1\\r\\nsap-contextid-accept: header\\r\\nAccept: text/plain, */*;q=0.5\\r\\nAccept-Language: en\\r\\nDataServiceVersion: 2.0\\r\\nMaxDataServiceVersion: 2.0\\r\\nsap-cancel-on-close: true\";\npostData0 += \"\\r\\n\";\npostData0 += \"--batch_270b-f0a8-fded\";\npostData0 += \"\\r\\nContent-Type: application/http\\r\\nContent-Transfer-Encoding: binary\";\npostData0 += \"GET Einheits?$skip=0&$top=1000&$orderby=EinheitKategorieDetails/Id%20asc,KurzBezeichnung%20asc&$filter=Visible%20eq%20true%20and%20(EinheitKategorieDetails/Id%20eq%20%271bfcae80-42df-4f12-97ae-9803ba179d02%27%20or%20EinheitKategorieDetails/Id%20eq%20%27f6b057f9-7b3e-4787-b832-03a82aa4bce3%27) HTTP/1.1\\r\\nsap-contextid-accept: header\\r\\nAccept: application/json\\r\\nAccept-Language: en\\r\\nDataServiceVersion: 2.0\\r\\nMaxDataServiceVersion: 2.0\\r\\nsap-cancel-on-close: true\";\npostData0 += \"\\r\\n\";\npostData0 += \"--batch_270b-f0a8-fded\";\npostData0 += \"\\r\\nContent-Type: application/http\\r\\nContent-Transfer-Encoding: binary\";\npostData0 += \"GET Verfahrens/$count?$filter=(Id%20eq%20%2703bd40d3-0ec4-45fe-919f-195e822ae0cf%27%20or%20Id%20eq%20%27180a675a-f9fb-443a-b7d6-9e3d548c43fa%27%20or%20Id%20eq%20%2721421809-9aa5-49c7-ac27-f2d56644e2fa%27%20or%20Id%20eq%20%278e986522-d2ad-453b-bff7-b5982edd3381%27%20or%20Id%20eq%20%27a982fdfd-1335-4912-9280-03df21fca9fb%27%20or%20Id%20eq%20%27d2b8afdb-b85e-4183-b9c2-81eb7cf53ca6%27%20or%20Id%20eq%20%27d37d827f-21c4-479d-8414-fd8e7fac5bac%27%20or%20Id%20eq%20%27f8042142-c46d-46ea-8f05-05d7aeaa6fd8%27) HTTP/1.1\\r\\nsap-contextid-accept: header\\r\\nAccept: text/plain, */*;q=0.5\\r\\nAccept-Language: en\\r\\nDataServiceVersion: 2.0\\r\\nMaxDataServiceVersion: 2.0\\r\\nsap-cancel-on-close: true\";\npostData0 += \"\\r\\n\";\npostData0 += \"--batch_270b-f0a8-fded\";\npostData0 += \"\\r\\nContent-Type: application/http\\r\\nContent-Transfer-Encoding: binary\";\npostData0 += \"GET Verfahrens?$skip=0&$top=1000&$orderby=Name%20asc&$filter=(Id%20eq%20%2703bd40d3-0ec4-45fe-919f-195e822ae0cf%27%20or%20Id%20eq%20%27180a675a-f9fb-443a-b7d6-9e3d548c43fa%27%20or%20Id%20eq%20%2721421809-9aa5-49c7-ac27-f2d56644e2fa%27%20or%20Id%20eq%20%278e986522-d2ad-453b-bff7-b5982edd3381%27%20or%20Id%20eq%20%27a982fdfd-1335-4912-9280-03df21fca9fb%27%20or%20Id%20eq%20%27d2b8afdb-b85e-4183-b9c2-81eb7cf53ca6%27%20or%20Id%20eq%20%27d37d827f-21c4-479d-8414-fd8e7fac5bac%27%20or%20Id%20eq%20%27f8042142-c46d-46ea-8f05-05d7aeaa6fd8%27)&$expand=Massnahmeart2VerfahrenDetails HTTP/1.1\\r\\nsap-contextid-accept: header\\r\\nAccept: application/json\\r\\nAccept-Language: en\\r\\nDataServiceVersion: 2.0\\r\\nMaxDataServiceVersion: 2.0\\r\\nsap-cancel-on-close: true\";\npostData0 += \"\\r\\n\";\n\nclient.target(\"https://example.com\").path(\"/application/Agrar.svc/$batch\").request().header(\"content-type\", \"multipart/mixed;boundary=batch_270b-f0a8-fded\").header(\"accept\", \"application/json\").post(Entity.text(\"postData0\"));\n");
});