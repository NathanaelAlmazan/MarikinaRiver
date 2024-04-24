"use client";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const questions = [
  {
    id: 1,
    ques: "What is the RiverCast Project?",
    ans: "The RiverCast Project is a machine learning software designed to forecast the Marikina River level up to a week in advance. It leverages meteorological data including precipitation, temperature, humidity, and wind speed to make accurate predictions. By harnessing the power of Internet of Things (IoT) technology and machine learning, the project's goal is to mitigate flood-related casualties by providing timely and precise forecasts, thereby enabling better preparedness and response measures.",
  },
  {
    id: 2,
    ques: "How does the system forecast Marikina River level?",
    ans: "First, the historical precipitation, temperature, humidity, and wind speed are converted into a format that the Transformer model can understand and process effectively using an embedding layer. Then, the temporal information such as time of the year is added into the input. This helps the Transformer model understand the sequence of events. Next, the self-Attention layer gives weight to certain events based on their impact on the river level. This allows the Transformer model to identify how changes in precipitation, temperature, humidity, and wind speed impact Marikina River Level. Finally, the feed forward network maps the extracted precipitation, temperature, humidity, and wind speed behavior into Marikina River levels.",
  },
  {
    id: 3,
    ques: "Who will benefit from this project?",
    ans: "Citizens living in Barangays along the Marikina River primarily benefits from this project. Currently, evacuation protocols in Marikina City are triggered by monitoring the Marikina River level. Evacuation alerts are issued when the river level reaches a critical point. By implementing this technology, the behavior of the Marikina River can be simulated in advance, offering a proactive approach to disaster preparedness, particularly during typhoons. This enhanced preparedness allows authorities to take preemptive measures and improve response strategies, ultimately reducing the impact of flooding on the community. Marikina River level forecast are now available in Barangay Nangka and Sto. Niño and the proponents are already working on forecasting Marikina River level at Barangay Tumana and Malanday too.",
  },
  {
    id: 4,
    ques: "Can I already use this system?",
    ans: "Yes, you can already use the RiverCast Project. However, while the RiverCast Project is publicly accessible, it's important to note that the system is still undergoing development. We are continuously validating and enhancing the accuracy of the model to avoid inaccurate predictions and prevent misleading flood alerts.",
  },
  {
    id: 5,
    ques: "What are the limitations of the model?",
    ans: "Currently, the model predicts Marikina River level using precipitation, temperature, humidity, and wind speed. However, the proponents observed a need for including topological variables as input to produce more accurate forecast. Moreover, despite the impressive performance, the deep learning nature of the model makes it difficult to interpret the underlying mechanisms driving its predictions.",
  },
];

export default function FaqSection() {
  return (
    <Container id="faq-section" component="section" maxWidth="lg" sx={{ my: 8 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
        <Grid item xs={12} md={4}>
          <Typography variant="h3" align="right">Frequently Asked Questions</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          {questions.map((question) => (
            <Accordion key={question.id} defaultExpanded={question.id === 3}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                {question.ques}
              </AccordionSummary>
              <AccordionDetails>{question.ans}</AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
