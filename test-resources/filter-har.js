#!/usr/bin/jjs -fv

var System = Java.type("java.lang.System");
// Example:
// :!./% example.com.har.json 'function filter(oEntry) { return oEntry.request.url.match(/$/)  && oEntry.request.method === "POST" && oEntry.request.postData.text.match(/((POST)|(MERGE))/); }' 'function map(oEntry) { delete oEntry.response.content.text; return oEntry; }' | python -m json.tool > only-batch-post-without-content-example.com.har.json
// https://docs.oracle.com/javase/8/docs/technotes/guides/scripting/nashorn/shell.html
if (arguments.length == 0 || arguments.length > 3) {
    System.out.println("Usage: ");
    System.out.println("./filter-har.js my-har-file.json 'function filter(oEntry) { return oEntry.request.url.match(/$/) && oEntry.request.method === \"POST\"; }' 'function map(oEntry) { delete oEntry.response.content.text; return oEntry; }'");
    System.exit(0);
}
var Files = Java.type("java.nio.file.Files");
var Paths = Java.type("java.nio.file.Paths");
var sContent = new java.lang.String(Files.readAllBytes(Paths.get(arguments[0])));
var oContent = JSON.parse(sContent);
if (arguments.length > 1) {
    var fnFilter = eval('(' + arguments[1] + ')');
    oContent.log.entries = oContent.log.entries.filter(fnFilter);
}
if (arguments.length > 2) {
    var fnMapper = eval('(' + arguments[2] + ')');
    oContent.log.entries = oContent.log.entries.map(fnMapper);
}
System.out.println(JSON.stringify(oContent));