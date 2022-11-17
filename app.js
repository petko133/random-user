const express = require("express");
const User = require("./models/user");

const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(__dirname + "/public"));


app.get("/", (req, res, next) => {
    res.render("home");
});

app.get("/add-user", (req, res, next) => {
    fetch("https://randomuser.me/api/")
        .then((result) => {
            return result.json();
        })
        .then((data) => {
            const userName = `${data["results"][0]["name"]["title"]}, ${data["results"][0]["name"]["first"]} ${data["results"][0]["name"]["last"]}`;
            const gender = `${data["results"][0]["gender"]}`;
            const location = `${data["results"][0]["location"]["street"]["name"]} ${data["results"][0]["location"]["street"]["number"]}`;
            const city = `${data["results"][0]["location"]["city"]}`;
            const state = `${data["results"][0]["location"]["state"]}`;
            const country = `${data["results"][0]["location"]["country"]}`;
            const postcode = `${data["results"][0]["location"]["postcode"]}`;
            const email = `${data["results"][0]["email"]}`;
            const phone = `${data["results"][0]["phone"]}`;
            const dob = `${data["results"][0]["dob"]["date"]}`;
            const img = `${data["results"][0]["picture"]["large"]}`;
            const user = new User(
                userName,
                gender,
                location,
                city,
                state,
                country,
                postcode,
                email,
                phone,
                dob.slice(0, 10),
                img
            );
            user.save();
			res.redirect("users");
        });		
});

app.use("/users", (req, res, next) => {
    User.fetchAll((users) => {
        res.render("users", {
            users: users,
            path: "/users",
        });
    });
});

app.listen(3000);
