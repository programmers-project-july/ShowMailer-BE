const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    const response = await fetch('https://us-central1-dev-alarm.cloudfunctions.net/sendEmailNotification');
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
};