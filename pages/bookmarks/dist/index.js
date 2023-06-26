"use strict";
exports.__esModule = true;
var Card_1 = require("@/components/Card");
var bookmarks_json_1 = require("@/public/bookmarks.json");
function BookmarksPage() {
    var bookmarkList = bookmarks_json_1["default"].map(function (bookmark, index) {
        var title = bookmark.title, children = bookmark.children, icon = bookmark.icon, url = bookmark.url;
        if (url) {
            return React.createElement(Card_1["default"], { key: index, title: title, cover: icon, url: url });
        }
        return (React.createElement("div", { key: index, className: "grid gap-2  p-2" },
            React.createElement("h4", { className: "inline-block justify-self-start  rounded-sm px-6 text-lg text-[#4B4737] " }, title),
            React.createElement("div", { className: "grid grid-cols-6 place-content-center place-items-center gap-6 px-6" }, children === null || children === void 0 ? void 0 : children.map(function (_a, index) {
                var title = _a.title, icon = _a.icon, url = _a.url;
                return (React.createElement(Card_1["default"], { key: index, cover: icon, url: url, title: title }));
            }))));
    });
    return (React.createElement("div", { className: "grid gap-6 bg-gradient-to-tr from-[#36C486] to-[#ffeb68]" }, bookmarkList));
}
exports["default"] = BookmarksPage;
