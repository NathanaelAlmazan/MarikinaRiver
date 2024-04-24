"use client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { styled } from "@mui/material/styles";
import { Icon } from "@iconify/react";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(135deg, #1A4984, #2C94E2);",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(135deg, #1A4984, #2C94E2);",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient(135deg, #1A4984, #2C94E2);",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient(135deg, #1A4984, #2C94E2);",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <Icon icon="arcticons:audio-spectrum-analyzer" style={{ width: 40, height: 40 }} />,
    2: <Icon icon="fontisto:date" style={{ width: 30, height: 30 }} />,
    3: <Icon icon="carbon:chart-relationship" style={{ width: 30, height: 30 }} />,
    4: <Icon icon="eos-icons:neural-network" style={{ width: 30, height: 30 }} />
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  {
    id: 1,
    name: "Embedding Layer",
    desc: "The embedding layer converts the precipitation, temperature, humidity, and wind speed data into a format that the Transformer model can understand and process effectively.",
  },
  {
    id: 2,
    name: "Positional Encoding",
    desc: "Positional encoding adds the temporal information such as time of the year into the input. This helps the Transformer model understand the sequence of events.",
  },
  {
    id: 3,
    name: "Self-Attention Layer",
    desc: "Self-Attention layer analyzes how changes in precipitation, temperature, humidity, and wind speed impact Marikina River Level This enable the model to understand the relationship between meterological and river level data.",
  },
  {
    id: 4,
    name: "Feed Forward Network",
    desc: "The feed forward network is a complex function trained to estimate Marikina River level using the extracted relationship from precipitation, temperature, humidity, wind speed, and river level behavior.",
  }
];

export default function TriviaSection() {
  return (
    <Container id='model-section' component="section" maxWidth="lg" sx={{ my: 8 }}>
      <Box>
        <Typography component="div" variant="h4" align="center" paddingBottom={5}>
          How RiverCast Works?
        </Typography>
        
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <Stepper
            alternativeLabel
            activeStep={steps.length}
            orientation="vertical"
          >
            {steps.map((step) => (
              <Step key={step.name}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  <Typography variant="subtitle1" component="div" paddingBottom={2}>
                    {step.name}
                  </Typography>
                  <Typography variant="body2" component="div">
                    {step.desc}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
          
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Stepper
            alternativeLabel
            activeStep={steps.length}
            connector={<ColorlibConnector />}
          >
            {steps.map((step) => (
              <Step key={step.name}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  <Typography variant="subtitle1" component="div" paddingBottom={2}>
                    {step.name}
                  </Typography>
                  <Typography variant="body2" component="div">
                    {step.desc}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

      </Box>
    </Container>
  );
}
