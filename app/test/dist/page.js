"use strict";
exports.__esModule = true;
var bookmarks_json_1 = require("@/public/bookmarks.json");
function TestPage() {
    var bookmarks = bookmarks_json_1["default"];
    return React.createElement("div", null, bookmarks[0].title);
}
exports["default"] = TestPage;
