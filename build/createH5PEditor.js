"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var cache_manager_1 = require("cache-manager");
var cache_manager_redis_store_1 = __importDefault(require("cache-manager-redis-store"));
var ioredis_1 = __importDefault(require("ioredis"));
var debug_1 = __importDefault(require("debug"));
var H5P = __importStar(require("@lumieducation/h5p-server"));
var dbImplementations = __importStar(require("@lumieducation/h5p-mongos3"));
var h5p_redis_lock_1 = __importDefault(require("@lumieducation/h5p-redis-lock"));
/**
 * Create a H5PEditor object.
 * Which storage classes are used depends on the configuration values set in
 * the environment variables.re If you set no environment variables, the local
 * filesystem storage classes will be used.
 *
 * CONTENTSTORAGE=mongos3 Uses MongoDB/S3 backend for content storage
 * CONTENT_MONGO_COLLECTION Specifies the collection name for content storage
 * CONTENT_AWS_S3_BUCKET Specifies the bucket name for content storage
 * TEMPORARYSTORAGE=s3 Uses S3 backend for temporary file storage
 * TEMPORARY_AWS_S3_BUCKET Specifies the bucket name for temporary file storage
 *
 * Further environment variables to set up MongoDB and S3 can be found in
 * docs/packages/h5p-mongos3/mongo-s3-content-storage.md and docs/packages/h5p-mongos3/s3-temporary-file-storage.md!
 * @param config the configuration object
 * @param localLibraryPath a path in the local filesystem in which the H5P libraries (content types) are stored
 * @param localContentPath a path in the local filesystem in which H5P content will be stored (only necessary if you want to use the local filesystem content storage class)
 * @param localTemporaryPath a path in the local filesystem in which temporary files will be stored (only necessary if you want to use the local filesystem temporary file storage class).
 * @param translationCallback a function that is called to retrieve translations of keys in a certain language; the keys use the i18next format (e.g. namespace:key).
 * @returns a H5PEditor object
 */
function createH5PEditor(config, localLibraryPath, localContentPath, localTemporaryPath, localContentUserDataPath, translationCallback) {
    return __awaiter(this, void 0, void 0, function () {
        var cache, lock, libraryStorage, mongoLibraryStorage, _a, _b, mongoS3LibraryStorage, _c, _d, _e, contentUserDataStorage, h5pEditor, _f, _g, _h, _j, _k, _l, _m;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    if (process.env.CACHE === 'in-memory') {
                        (0, debug_1.default)('h5p-example')("Using in memory cache for caching library storage.");
                        cache = (0, cache_manager_1.caching)({
                            store: 'memory',
                            ttl: 60 * 60 * 24,
                            max: Math.pow(2, 10)
                        });
                    }
                    else if (process.env.CACHE === 'redis') {
                        (0, debug_1.default)('h5p-example')("Using Redis for caching library storage (".concat(process.env.REDIS_HOST, ":").concat(process.env.REDIS_PORT, ", db: ").concat(process.env.REDIS_DB, ")"));
                        cache = (0, cache_manager_1.caching)({
                            store: cache_manager_redis_store_1.default,
                            host: process.env.REDIS_HOST,
                            port: process.env.REDIS_PORT,
                            auth_pass: process.env.REDIS_AUTH_PASS,
                            db: process.env.REDIS_DB,
                            ttl: 60 * 60 * 24
                        });
                    }
                    else {
                        (0, debug_1.default)('h5p-example')('Not using any cache for library storage');
                        // using no cache
                    }
                    if (process.env.LOCK === 'redis') {
                        (0, debug_1.default)('h5p-example')("Using Redis as lock provider (host: ".concat(process.env.LOCK_REDIS_HOST, ":").concat(process.env.LOCK_REDIS_PORT, ", db: ").concat(process.env.LOCK_REDIS_DB, ")."));
                        lock = new h5p_redis_lock_1.default(new ioredis_1.default(Number.parseInt(process.env.LOCK_REDIS_PORT), process.env.LOCK_REDIS_HOST, {
                            db: Number.parseInt(process.env.LOCK_REDIS_DB)
                        }));
                    }
                    else {
                        (0, debug_1.default)('h5p-example')("Using simple in-memory lock provider.");
                        lock = new H5P.SimpleLockProvider();
                    }
                    if (!(process.env.LIBRARYSTORAGE === 'mongo')) return [3 /*break*/, 3];
                    (0, debug_1.default)('h5p-example')('Using pure MongoDB for library storage.');
                    _b = (_a = dbImplementations.MongoLibraryStorage).bind;
                    return [4 /*yield*/, dbImplementations.initMongo()];
                case 1:
                    mongoLibraryStorage = new (_b.apply(_a, [void 0, (_o.sent()).collection(process.env.LIBRARY_MONGO_COLLECTION)]))();
                    return [4 /*yield*/, mongoLibraryStorage.createIndexes()];
                case 2:
                    _o.sent();
                    libraryStorage = mongoLibraryStorage;
                    return [3 /*break*/, 7];
                case 3:
                    if (!(process.env.LIBRARYSTORAGE === 'mongos3')) return [3 /*break*/, 6];
                    (0, debug_1.default)('h5p-example')('Using MongoDB / S3 for library storage');
                    _d = (_c = dbImplementations.MongoS3LibraryStorage).bind;
                    _e = [void 0, dbImplementations.initS3({
                            s3ForcePathStyle: true,
                            signatureVersion: 'v4'
                        })];
                    return [4 /*yield*/, dbImplementations.initMongo()];
                case 4:
                    mongoS3LibraryStorage = new (_d.apply(_c, _e.concat([(_o.sent()).collection(process.env.LIBRARY_MONGO_COLLECTION),
                        {
                            s3Bucket: process.env.LIBRARY_AWS_S3_BUCKET,
                            maxKeyLength: process.env.AWS_S3_MAX_FILE_LENGTH
                                ? Number.parseInt(process.env.AWS_S3_MAX_FILE_LENGTH, 10)
                                : undefined
                        }])))();
                    return [4 /*yield*/, mongoS3LibraryStorage.createIndexes()];
                case 5:
                    _o.sent();
                    libraryStorage = mongoS3LibraryStorage;
                    return [3 /*break*/, 7];
                case 6:
                    libraryStorage = new H5P.fsImplementations.FileLibraryStorage(localLibraryPath);
                    _o.label = 7;
                case 7:
                    contentUserDataStorage = new H5P.fsImplementations.FileContentUserDataStorage(localContentUserDataPath);
                    _g = (_f = H5P.H5PEditor).bind;
                    _h = [void 0, new H5P.cacheImplementations.CachedKeyValueStorage('kvcache', cache),
                        config,
                        process.env.CACHE
                            ? new H5P.cacheImplementations.CachedLibraryStorage(libraryStorage, cache)
                            : libraryStorage];
                    if (!(process.env.CONTENTSTORAGE !== 'mongos3')) return [3 /*break*/, 8];
                    _j = new H5P.fsImplementations.FileContentStorage(localContentPath);
                    return [3 /*break*/, 10];
                case 8:
                    _l = (_k = dbImplementations.MongoS3ContentStorage).bind;
                    _m = [void 0, dbImplementations.initS3({
                            s3ForcePathStyle: true,
                            signatureVersion: 'v4'
                        })];
                    return [4 /*yield*/, dbImplementations.initMongo()];
                case 9:
                    _j = new (_l.apply(_k, _m.concat([(_o.sent()).collection(process.env.CONTENT_MONGO_COLLECTION),
                        {
                            s3Bucket: process.env.CONTENT_AWS_S3_BUCKET,
                            maxKeyLength: process.env.AWS_S3_MAX_FILE_LENGTH
                                ? Number.parseInt(process.env.AWS_S3_MAX_FILE_LENGTH, 10)
                                : undefined
                        }])))();
                    _o.label = 10;
                case 10:
                    h5pEditor = new (_g.apply(_f, _h.concat([_j, process.env.TEMPORARYSTORAGE === 's3'
                            ? new dbImplementations.S3TemporaryFileStorage(dbImplementations.initS3({
                                s3ForcePathStyle: true,
                                signatureVersion: 'v4'
                            }), {
                                s3Bucket: process.env.TEMPORARY_AWS_S3_BUCKET,
                                maxKeyLength: process.env.AWS_S3_MAX_FILE_LENGTH
                                    ? Number.parseInt(process.env.AWS_S3_MAX_FILE_LENGTH, 10)
                                    : undefined
                            })
                            : new H5P.fsImplementations.DirectoryTemporaryFileStorage(localTemporaryPath),
                        translationCallback,
                        undefined,
                        {
                            enableHubLocalization: true,
                            enableLibraryNameLocalization: true,
                            lockProvider: lock
                        },
                        contentUserDataStorage])))();
                    if (!(h5pEditor.temporaryStorage instanceof
                        dbImplementations.S3TemporaryFileStorage)) return [3 /*break*/, 12];
                    return [4 /*yield*/, h5pEditor.temporaryStorage.setBucketLifecycleConfiguration(h5pEditor.config)];
                case 11:
                    _o.sent();
                    _o.label = 12;
                case 12: return [2 /*return*/, h5pEditor];
            }
        });
    });
}
exports.default = createH5PEditor;
//# sourceMappingURL=createH5PEditor.js.map