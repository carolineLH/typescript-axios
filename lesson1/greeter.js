var User = /** @class */ (function () {
    function User(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + lastName;
    }
    return User;
}());
function greeter(person) {
    return person.firstName + ' ' + person.lastName;
}
var user = new User('liao', 'caroline');
console.log(greeter(user));
