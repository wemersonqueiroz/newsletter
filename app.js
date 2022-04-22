const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

const Test = Test => console.log(Test)

const app = express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req, res) {
  const fullName = req.body.fName
  const userEmail = req.body.uEmail
  console.log(fullName, userEmail)

  var data = {
    members: [
      {
        email_address: userEmail,
        status: "subscribed",
        FNAME: fullName,
      },
    ],
  }
  const jsonData = JSON.stringify(data)

  const url = "https://us14.api.mailchimp.com/3.0/lists/62ac69e389"
  const options = {
    method: "POST",
    auth: "Wemerson:d9ea492eb1e27cc87589385c69997d19-us14",
  }
  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data))
    })
  })

  request.write(jsonData)
  request.end()
})

app.listen(3000, function () {
  Test("Server is Running")
})

// MY MAILCHIMP API KEY d9ea492eb1e27cc87589385c69997d19-us14
// MAIL LIST ID 62ac69e389
