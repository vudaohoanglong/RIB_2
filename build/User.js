"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Example user object
 */
var User = /** @class */ (function () {
    function User(id, role) {
        this.id = id ? id : '1';
        this.name = 'Firstname Surname';
        this.canInstallRecommended = true;
        this.canUpdateAndInstallLibraries = true;
        this.canCreateRestricted = true;
        this.type = 'local';
        this.email = 'test@example.com';
        this.role = role ? role : 'Student';
    }
    return User;
}());
exports.default = User;
//# sourceMappingURL=User.js.map