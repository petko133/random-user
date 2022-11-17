const fs = require("fs");
const path = require("path");

const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "users.json"
);

const getUsersFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        }
        cb(JSON.parse(fileContent));
    });
};

module.exports = class User {
    constructor(
        name,
        gender,
        location,
        city,
        state,
        country,
        postcode,
        email,
        phone,
        dob,
        img
    ) {
        this.name = name;
        this.gender = gender;
        this.location = location;
        this.city = city;
        this.state = state;
        this.country = country;
        this.postcode = postcode;
        this.email = email;
        this.phone = phone;
        this.dob = dob;
        this.img = img;
    }
    save() {
        getUsersFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }
    static fetchAll(cb) {
        getUsersFromFile(cb);
    }
};
