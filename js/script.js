// show notification 
const showNotification = (msg, type) => {
    let bgColor;
    switch (type) {
        case "error":
            bgColor = "linear-gradient(to right, #93291e, #ed213a)"
            break;
        case "success":
            bgColor = "linear-gradient(to right, #1D976C, #93F9B9)"
            break;
        case "default":
            bgColor = "000"
    }


    Toastify({
        text: msg,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: bgColor
        },
        onClick: function () { } // Callback after click
    }).showToast();

}

// clear output 
const clearOutput = () => document.getElementById("output").innerHTML = " "

// footer year
let year = new Date().getFullYear()
document.getElementById("year").innerHTML = year

// get field value 
const getFieldValue = id => document.getElementById(id).value


// get random number 
const getRandomId = () => Math.random().toString(36).slice(2)


// email regex
let emailValidation = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

// ---------------------------------------------------------------------------------------------------------------

let users = []


const handleSubmit = () => {

    event.preventDefault()

    let firstName = getFieldValue("firstName")
    let lastName = getFieldValue("lastName")
    let email = getFieldValue("email")
    let dateOfBirth = getFieldValue("date")

    // console.log(emailValidation.test(email))


    firstName = firstName.trim()
    lastName = lastName.trim()
    email = email.trim()

    if (firstName.length < 3) {
        showNotification("please enter first name correctly", "error")
        return
    }
    if (lastName.length < 3) {
        showNotification("please enter last name correctly", "error")
        return
    }
    if (!emailValidation.test(email)) {
        showNotification("please enter email correctly", "error")
        return
    }
    if (!dateOfBirth) {
        showNotification("please enter date of birth correctly", "error")
        return
    }


    let user = {
        firstName,
        lastName,
        email,
        dateOfBirth,
        calculateAge: function () {
            let now = new Date()
            let dateOfBirth = new Date(this.dateOfBirth)
            let nowTime = now.getTime()
            let dateOfBirthTime = dateOfBirth.getTime()
            let msDifference = nowTime - dateOfBirthTime
            let age = Math.floor(msDifference / (1000 * 60 * 60 * 24 * 365))
            return age
        }
    }

    user.id = getRandomId()
    user.dateCreated = new Date().getTime()
    user.status = "active"
    user.role = "student"


    let userCheck = users.find(currElem => currElem.email == email)

    if(userCheck){
        showNotification("user already exists", "error")
        return
    }else{
        users.push(user)
        showNotification("user successfully added", "success")
    }

}



// show Table 
const showTable = () => {
    if (!users.length) {
        showNotification("there is no single user", "error")
    }

    let tableStartingCode = `<div class="table-responsive"><table class="table text-center">`
    let tableHead = `<tr><th>#</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Date of Birth</th><th>Age</th></tr>`
    let tableEndingCode = `</table></div>`
    let tableBody = ""
    users.forEach((currElem, index) => {
        tableBody += `<tr><td>${index + 1}</td><td>${currElem.firstName}</td><td>${currElem.lastName}</td><td>${currElem.email}</td><td>${currElem.dateOfBirth}</td><td>${currElem.calculateAge()}</td></tr>`
    })
    let table = tableStartingCode + tableHead + tableBody + tableEndingCode
    document.getElementById("output").innerHTML = table
}

// print users in console 
const printUsers = () => {
    console.log(users)
}


