const express = require("express");
const { listEvents, authorize, createEvent } = require(".");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/events", async (req, res) => {
  try {
    const auth = await authorize();
    const events = await listEvents(auth);
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// app.post("/create-event", async (req, res) => {
//   const event = {
//     summary: "Google I/O 2015",
//     location: "800 Howard St., San Francisco, CA 94103",
//     description: "A chance to hear more about Google's developer products.",
//     start: {
//       dateTime: "2015-05-28T09:00:00-07:00",
//       timeZone: "America/Los_Angeles",
//     },
//     end: {
//       dateTime: "2015-05-28T17:00:00-07:00",
//       timeZone: "America/Los_Angeles",
//     },
//     recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
//     attendees: [{ email: "lpage@example.com" }, { email: "sbrin@example.com" }],
//     reminders: {
//       useDefault: false,
//       overrides: [
//         { method: "email", minutes: 24 * 60 },
//         { method: "popup", minutes: 10 },
//       ],
//     },
//   };
//   try {
//     const auth = await authorize();
//     await createEvent(event, auth);
//   } catch (error) {
//     console.error("Error creating event:", error);
//     res.status(500).json({ error: "Failed to create events" });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
