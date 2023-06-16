"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dbUser_1 = __importDefault(require("./models/dbUser"));
function render(editor) {
    var _this = this;
    return function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var contentIDs, contentIds, contentObjects;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbUser_1.default.findById(req.user.id)];
                case 1:
                    contentIDs = (_a.sent()).contentIDs;
                    return [4 /*yield*/, editor.contentManager.listContent()];
                case 2:
                    contentIds = _a.sent();
                    return [4 /*yield*/, Promise.all(contentIds.map(function (id) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = {};
                                        return [4 /*yield*/, editor.contentManager.getContentMetadata(id, req.user)];
                                    case 1: return [2 /*return*/, (_a.content = _b.sent(),
                                            _a.id = id,
                                            _a)];
                                }
                            });
                        }); }))];
                case 3:
                    contentObjects = _a.sent();
                    res.send("\n        <!doctype html>\n        <html>\n        <head>\n            <meta charset=\"utf-8\">\n            <script src=\"/node_modules/requirejs/require.js\"></script>\n            <link rel=\"stylesheet\" href=\"/node_modules/bootstrap/dist/css/bootstrap.min.css\">\n            <link rel=\"stylesheet\" href=\"/node_modules/@fortawesome/fontawesome-free/css/all.min.css\">\n            <title>H5P NodeJs Demo</title>\n            <style>\n                    /* Additional custom styles */\n                    .logout-button {\n                    position: absolute;\n                    top: 10px;\n                    right: 10px;\n                    }\n            </style>\n        </head>\n        <body>\n            <div class=\"container\">\n                <h1>H5P NodeJs Demo</h1>\n                <button class=\"btn btn-danger logout-button\" id=\"logout\">Log out</button>\n                <div class=\"alert alert-warning\">This demo is for debugging and demonstration purposes only and not suitable for production use!</div>                \n                <h2>\n                    <span class=\"fa fa-file\"></span> Existing content\n                </h2>\n                <a class=\"btn btn-primary my-2\" href=\"".concat(editor.config.baseUrl, "/new\"><span class=\"fa fa-plus-circle m-2\"></span>Create new content</a>\n                <div class=\"list-group\">\n                ").concat(contentObjects
                        .map(function (content) {
                        return "<div class=\"list-group-item\">\n                                <div class=\"d-flex w-10\">\n                                    <div class=\"me-auto p-2 align-self-center\">\n                                        <a href=\"".concat(editor.config.baseUrl).concat(editor.config.playUrl, "/").concat(content.id, "\">\n                                            <h5>").concat(content.content.title, "</h5>\n                                        </a>\n                                        <div class=\"small d-flex\">                                            \n                                            <div class=\"me-2\">\n                                                <span class=\"fa fa-book-open\"></span>\n                                                ").concat(content.content.mainLibrary, "\n                                            </div>\n                                            <div class=\"me-2\">\n                                                <span class=\"fa fa-fingerprint\"></span>\n                                                ").concat(content.id, "\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"p-2\">                                        \n                                        <a class=\"btn btn-secondary\" href=\"").concat(editor.config.baseUrl, "/edit/").concat(content.id, "\">\n                                            <span class=\"fa fa-pencil-alt m-1\"></span>\n                                            edit\n                                        </a>\n                                    </div>\n                                    <div class=\"p-2\">\n                                        <a class=\"btn btn-info\" href=\"").concat(editor.config.baseUrl).concat(editor.config.downloadUrl, "/").concat(content.id, "\">\n                                            <span class=\"fa fa-file-download m-1\"></span>\n                                            download\n                                        </a>\n                                    </div>\n                                    <div class=\"p-2\">\n                                        <a class=\"btn btn-info\" href=\"").concat(editor.config.baseUrl, "/html/").concat(content.id, "\">\n                                            <span class=\"fa fa-file-download m-1\"></span>\n                                            download HTML\n                                        </a>\n                                    </div>\n                                    <div class=\"p-2\">\n                                        <a class=\"btn btn-danger\" href=\"").concat(editor.config.baseUrl, "/delete/").concat(content.id, "\">\n                                            <span class=\"fa fa-trash-alt m-1\"></span>\n                                            delete\n                                        </a>\n                                    </div>\n                                </div>                                \n                            </div>");
                    })
                        .join(''), "\n                </div>\n            </div>\n\n            <script>\n                requirejs.config({\n                    baseUrl: \"assets/js\",\n                    paths: {\n                        react: '/node_modules/react/umd/react.development',\n                        \"react-dom\": '/node_modules/react-dom/umd/react-dom.development'\n                    }\n                });\n                requirejs([\n                    \"react\",\n                    \"react-dom\",\n                    \"./client/LibraryAdminComponent.js\",\n                    \"./client/ContentTypeCacheComponent.js\"], \n                    function (React, ReactDOM, LibraryAdmin, ContentTypeCache) {\n                        const libraryAdminContainer = document.querySelector('#library-admin-container');\n                        ReactDOM.render(React.createElement(LibraryAdmin.default, { endpointUrl: 'h5p/libraries' }), libraryAdminContainer);\n                        const contentTypeCacheContainer = document.querySelector('#content-type-cache-container');\n                        ReactDOM.render(React.createElement(ContentTypeCache.default, { endpointUrl: 'h5p/content-type-cache' }), contentTypeCacheContainer);\n                    });                \n            </script>\n            <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js\"></script>\n            <script src=\"https://code.jquery.com/jquery-3.6.0.min.js\"></script>\n            <script>\n                    $(document).ready(function(){\n                        $(\"#logout\").click(function(){\n                            $.ajax({\n                                url: \"/logout\",\n                                type: \"POST\",\n                                success: function(data){\n                                    alert(\"Logged out\");\n                                    window.location.href = \"/login\";\n                                },\n                                error: function(xhr, status, error) {\n                                    // Handle error\n                                    console.log(\"Logout failed. Error:\", error);\n                                },\n                            });\n                        });\n                    });\n            </script>\n        </body>\n        "));
                    return [2 /*return*/];
            }
        });
    }); };
}
exports.default = render;
//# sourceMappingURL=studentDashboard.js.map