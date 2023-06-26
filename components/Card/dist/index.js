"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
function Card(_a) {
    var title = _a.title, cover = _a.cover, url = _a.url;
    return (React.createElement("a", { href: url, target: "_blank", className: "relative flex h-24 w-40 items-center justify-center overflow-hidden rounded-md  bg-[#008C5E] p-3 hover:bg-[#3BA75C] active:bg-[#00715F]" },
        React.createElement("h5", { className: "overflow-hidden text-ellipsis whitespace-nowrap" }, title),
        cover && (React.createElement(image_1["default"], { className: "absolute bottom-0 right-0", src: cover, alt: "", width: 20, height: 20 }))));
}
exports["default"] = Card;
