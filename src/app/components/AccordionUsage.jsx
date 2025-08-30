import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Container, Stack } from "@mui/material";

export default function AccordionUsage() {
  return (
    <Container maxWidth={"lg"} style={{ padding: "80px 40px" }}>
      <Stack mb={8}>
        <Typography
          variant="h3"
          textAlign={"center"}
          fontWeight={"SemiBold"}
          fontFamily={"Libre Bodoni"}
        >
          FAQs
        </Typography>
      </Stack>
      <Accordion defaultExpanded style={{ margin: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          style={{
            padding: "15px",
          }}
        >
          <Typography component="span" fontSize={20}>
            01 &#160; &#160; &#160; &#160; What is Majik Gift?
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ marginTop: -20 }}>
          <Typography
            fontFamily={"Lato"}
            fontWeight={"Regular"}
            color="text.lightWorkerCardText"
            fontSize={17}
            paddingLeft={7.5}
            lineHeight={2}
          >
            Majik Gift is your one-stop destination for everything spiritual.
            It’s more than just a shop — it’s a safe and nurturing space where
            you can explore, learn, and grow. At Majik Gift, you’ll find:
            <Typography component={"ul"}>
              <Typography component={"li"}>
                Spiritual Tools & Treasures – crystals, candles, books, and
                sacred items to support your journey.
              </Typography>
              <Typography component={"li"}>
                Healing & Readings – a place to receive guidance, clarity, and
                energy work in a safe and supportive environment.
              </Typography>
              <Typography component={"li"}>
                Learning & Growth – workshops, classes, and spiritual
                development opportunities where you can expand your knowledge
                and abilities.
              </Typography>
            </Typography>
            Majik Gift is a community hub for spirituality, where like-minded
            souls come together to share, heal, and connect. It’s designed to be
            both a safe place to work and a safe place to learn.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ margin: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          style={{
            padding: "15px",
          }}
        >
          <Typography component="span" fontSize={20}>
            02 &#160; &#160; &#160; &#160; What is Lightworker?
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ marginTop: -20 }}>
          <Typography
            fontFamily={"Lato"}
            fontWeight={"Regular"}
            color="text.lightWorkerCardText"
            fontSize={17}
            paddingLeft={7.5}
            lineHeight={2}
          >
            A Lightworker is someone who feels called to bring more light, love,
            and healing into the world. They are deeply sensitive to energy and
            often feel a strong inner pull to help others awaken, heal, or find
            peace.
            <Typography component={"ul"}>
              Key Traits of a Lightworker
              <Typography component={"li"}>
                Healers of Energy: They naturally uplift those around them,
                often without even trying. Their presence alone can feel calming
                or inspiring.
              </Typography>
              <Typography component={"li"}>
                Deep Empathy: Lightworkers feel emotions and energies strongly.
                They often sense when someone is struggling, even without words.
              </Typography>
              <Typography component={"li"}>
                Guides & Teachers: They may not always work as professional
                healers, but they live as examples — reminding others of their
                inner strength, wisdom, and connection to Spirit.
              </Typography>
              <Typography component={"li"}>
                Mission-Driven: Lightworkers often feel they were “sent here for
                a reason” — to contribute to a higher purpose or to make the
                world a kinder, more compassionate place.
              </Typography>
              <Typography component={"li"}>
                Spiritual Connection: Many are drawn to practices like
                meditation, Reiki, mediumship, or intuitive guidance, as they
                naturally align with higher realms of consciousness.
              </Typography>
            </Typography>
            <Typography component={"h4"}>
              The Essence of a Lightworker
            </Typography>
            <Typography>
              At the heart of it, a Lightworker is here to raise the vibration
              of the planet. They shine light into darkness, not by force, but
              by embodying love, compassion, and truth in everyday life.
            </Typography>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ margin: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          style={{
            padding: "15px",
          }}
        >
          <Typography component="span" fontSize={20}>
            03 &#160; &#160; &#160; &#160; What is Stall Holder?
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ marginTop: -20 }}>
          <Typography
            fontFamily={"Lato"}
            fontWeight={"Regular"}
            color="text.lightWorkerCardText"
            fontSize={17}
            paddingLeft={7.5}
            lineHeight={2}
          >
            A stall holder on Majik Gift is someone who shares their spiritual
            gifts, creations, or items through the Majik Gift space. Think of it
            as being part of a spiritual marketplace or community hub, where
            each stall holder contributes something unique for others to
            experience.
            <Typography component={"h4"}>What is a Stall Holder?</Typography>
            <Typography component={"ul"}>
              <Typography component={"li"}>
                Creators & Makers – people who handcraft spiritual items such as
                candles, oils, jewellery, artwork, or ritual tools.
              </Typography>
            </Typography>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
