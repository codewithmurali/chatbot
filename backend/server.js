const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../frontend")));

const qaData = {
  "Who is the chairman of Prince shri venkateshwara padmavathy engineering College?":
    "Vasudevan",
  "What are the courses do you offer in this college?":
    "CSE, IT, ECE, MECH, CIVIL, EEE",
  "What are the fees structures of CSE dept?":
    "Tuition fees: 1,80,000, Bus fees: 30,000, Hostel fees: 75,000, Exam fees around 5000",
  "What are the fees structures of EEE dept?":
    "Tuition fees: 80,000, Bus fees: 30,000, Hostel fees: 75,000, Exam fees around 5000",
  "What are the fees structures of ECE dept?":
    "Tuition fees: 85,000, Bus fees: 30,000, Hostel fees: 75,000, Exam fees around 5000",
  "What are the fees structures of CIVIL dept?":
    "Tuition fees: 80,000, Bus fees: 30,000, Hostel fees: 75,000, Exam fees around 5000",
  "What are the fees structures of IT dept?":
    "Tuition fees: 1,80,000, Bus fees: 30,000, Hostel fees: 75,000, Exam fees around 5000",
  "Who are the professors for EEE dept?": {
    "Head of Department": "HEMA LATHA PHD",
    Professors: [
      "KALA PRIYADHARSHINI [Asst professor]",
      "MURALI [Asst professor]",
      "CHANDRAKALA [Asst professor]",
    ],
  },
  "Who are the professors for CSE dept?": {
    "Head of Department": "PREETHA M PHD",
    Professors: [
      "NISHANTHI R [ASST PROFESSOR]",
      "SATHYA S [Asst professor]",
      "ARUNA DEVI R [Asst professor]",
    ],
  },
  "Who are the professors for IT dept?": {
    "Head of Department": "REENA ME",
    Professors: [
      "LATHA B [Asst professor]",
      "ALLI RANI [Asst professor]",
      "VANAJA T [Asst professor]",
    ],
  },
  "Who are the professors for MECH dept?": {
    "Head of Department": "SATHI",
    Professors: [
      "VIJAYARAGAVAN [Asst professor]",
      "VIJAYARAJ [Asst professor]",
      "SHERIL [Asst professor]",
      "SURALI [Asst professor]",
    ],
  },
  "Who are the professors for CIVIL dept?": {
    "Head of Department": "", // Head not specified
    Professors: [
      "DHIVYA N [Asst professor]",
      "SANTHOSH KUMAR [Asst professor]",
      "KARTHIKA [Asst professor]",
    ],
  },
  "Who are the professors for ECE dept?": {
    "Head of Department": "KK SENTHIL KUMAR PHD",
    Professors: [
      "KALA NANDHINI [Asst professor]",
      "PRIMMIA [Asst professor]",
      "RAMYA [Asst professor]",
    ],
  },
  "Where is the college located?": "Ponmar, Mambakkam Road, Chennai-600127",
  "What is the office contact number?": "044-24991414, 9047040412",
  "Which is the college website?": "www.psvpec.in",
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.post('/message', (req, res) => {
  const message = req.body.message;

  if (!message) {
      return res.status(400).json({ error: 'Message is required' });
  }

  const response = qaData[message];

  if (!response) {
      return res.status(404).json({ error: 'Question not found' });
  }

  return res.json({ response });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});