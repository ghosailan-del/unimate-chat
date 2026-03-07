const express = require("express");
const cors = require("cors");

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static(__dirname))

const DID_API_KEY = "Z2hvc2FpbGFuQGdtYWlsLmNvbQ:f4xZ46n7pzio6yyqbid67";

// إنشاء فيديو يتكلم
app.post("/talk", async (req, res) => {
  const text = req.body.text;

  try {
    const response = await fetch("https://api.d-id.com/talks", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${Buffer.from(DID_API_KEY + ":").toString("base64")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        script: {
          type: "text",
          input: text,
          provider: {
            type: "microsoft",
            voice_id: "en-US-JennyNeural"
          }
        },
        // صورة الأفاتار (رابط مباشر للصورة)
        source_url: "https://i.postimg.cc/Gp9fWKDk/avatar.jpg"
      })
    });

    const data = await response.json();
    console.log("D-ID RESPONSE:", data);

    res.json(data);

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});