
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://mongodb151:admin@cluster0.ge5lxgs.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    
})

// Validation Passord 
const validatePassword = (password) => {
    const passpattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (password.match(passpattern)) {
        return true;
    } else {
        return false;
    }
}
// Validate Email
const validateEmail = (email) => {
    const emailpattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (email.match(emailpattern)) {
        return (true)
    }

    return (false)
}
// Validate Name
const validateName = (name) => {
    const namepattern = /^[a-zA-Z\s]+$/;
    if (name.match(namepattern)) {
        return (true)
    }

    return (false)
}



const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
});

const User = mongoose.model("user", UserSchema);

// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// Home Page
app.get('/', function (req, res) {
    res.status(200).send('This is not the route you are looking for ! Try using postman xD !! ');
});
const saltRounds = 1;

// 1. Create
app.post('/user/create', async (req, res) => {

    try {
        let valName = false;
        let valEmail = false;
        let valPass = false;

        if (await User.findOne({ email: req.body.email })) {
            res.status(400).send({ message: "Email already exists. Enter new Email adddress." });
        }
        else {
            if (validateName(req.body.name)) {
                valName = true;
            }
            else {
                valName = false;
                res.status(400).send({ message: "Enter Valid Name." });
            }

            if (validateEmail(req.body.email)) {
                valEmail = true;
            }
            else {
                valEmail = false;
                res.status(400).send({ message: "Enter Valid Email adddress." });
            }

            if (validatePassword(req.body.password)) {
                valPass = true;
            }
            else {
                valPass = false;
                res.status(400).send({ message: "Enter Valid Password(Minimum 6 chars along with 1 special char)." });
            }

            if (valName && valEmail && valPass) {
                const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
                const innerResult = User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword
                });
                res.status(201).send(innerResult);
            }
        }
    }
    catch {
        res.status(500).send({ message: "Internal Server Error" });
    }

});

// 2. Edit
app.put('/user/edit', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(req.body.name);
    console.log(req.body.password);
    var name = req.body.name;
    var password = req.body.password;
    let valName = false;
    let valPass = false;
    if (!user) {
        res.status(404).send({ message: "User not found." });
    }
    else {
        if (name == undefined && password == undefined) {   
            res.status(400).send({ message: "Enter Name or password to update." });
        }
        else {
            if ( name != undefined && password == undefined) {
                if (validateName(name)) {
                    valName = true;
                    const updateUser = User.findOneAndUpdate({ email: req.body.email }, {
                        $set: {
                            name: name
                        }
                    })
                    updateUser.then(updatedUser => {
                        if (!updatedUser) {
                            res.status(404).send({ message: "User not found." });
                        }
                        else {
                            res.status(202).send({ message: `User updated with new Name.` });
                        }
                    });
                }
                else {
                    valName = false;
                    res.status(400).send({ message: "Enter Valid Name." });
                }
            }
            else if (name == undefined && password != undefined) {
                if (validatePassword(password)) {
                    valPass = true;
                    const hashedPassword = await bcrypt.hash(password, saltRounds);
                    const updateUser = User.findOneAndUpdate({ email: req.body.email }, {
                        $set: {
                            password: hashedPassword
                        }
                    })
                    updateUser.then(updatedUser => {
                        if (!updatedUser) {
                            res.status(404).send({ message: "User not found." });
                        }
                        else {
                            res.status(202).send({ message: `User updated with new Password.` });
                        }
                    });
                }
                else {
                    valPass = false;
                    res.status(400).send({ message: "Enter Valid Password(Minimum 6 chars along with 1 special char)." });
                }
            }
            else if (name != undefined && password != undefined) {
                if (validateName(name) && validatePassword(password)) {
                    console.log("Here !! ")
                    valName = true;
                    valPass = true;
                    const hashedPassword = await bcrypt.hash(password, saltRounds);
                    const updateUser = User.findOneAndUpdate({ email: req.body.email }, {
                        $set: {
                            name: name,
                            password: hashedPassword
                        }
                    })
                    updateUser.then(updatedUser => {
                        if (!updatedUser) {
                            res.status(404).send({ message: "User not found." });
                        }
                        else {
                            res.status(202).send({ message: `User updated with new Name and Password.` });
                        }
                    });
                }
                else {
                    valName = false;
                    valPass = false;
                    res.status(400).send({ message: "Enter Valid Name and Enter Valid Password(Minimum 6 chars along with 1 special char)." });
                }
            }
        }
    }
});

// 3. Delete
app.delete('/user/delete', async (req, res) => {

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(404).send({ message: "User not found." });
    }
    else {
        const deleteUser = User.deleteOne({ email: req.body.email });
        deleteUser.then(deletedUser => {
            if (!deletedUser) {
                res.status(404).send({ message: "User not found." });
            }
            else {
                res.status(202).send({ message: `User deleted.` });
            }
        });
    }

});

// 4. Get Users
app.get('/user/getAll', async (req, res) => {

    User.find({}, function (error, users) {
        if (error) {
            return res.status(500).send({
                message: 'Error while finding records',
                data: []
            })
        } else {
            var user = users.map(function (elem) {
                return {
                    name: elem.name,
                    email: elem.email,
                    password: elem.password
                }
            })
            res.send(user);
        }
    });
});

// set port
var port = process.env.PORT || 800;
// startup our app at http://localhost:800
app.listen(port);
// shoutout to the user
console.log('App started at port ' + port);
// expose app
exports = module.exports = app;