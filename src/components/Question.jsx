import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  styled,
  Button,
} from '@mui/material';
import BaseModal from './Dialogs/BaseModal';
import RadioButtonsGroup from './RadioButtonsGroup';
import Timer from './Timer';

const StyledBtn = styled(Button)(() => ({
  border: '#6c4298 1px solid',
  backgroundColor: '#6c4298',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgb(136 84 192 / .8)',
    color: '#000',
  },
}));

function Question({
  cards,
  activeQuestion,
  handleNextCard,
  handleAnswerSelect,
  selectedAnswerIndex,
  seconds,
}) {
  const [modal, setModal] = useState(false);

  const handleOpen = () => setModal(true);
  const handleClose = () => setModal(false);

  const isLastCard = activeQuestion === cards.length - 1;
  const currentCard = cards[activeQuestion];

  const {
    question,
    choices,
    image,
    quiz_name,
  } = currentCard;

  return (
    <>
      <Card className='quiz-card' card={currentCard} key={currentCard.id}>
        <div
          className="d-flex" >
          <h5>{quiz_name}</h5>
          <h5>#{`${currentCard.id + 1} / ${cards.length}`}</h5>
        </div>
        <CardMedia
          component="img"
          height="250"
          image={image}
          alt={quiz_name} />
        <CardContent sx={{ mb: 3 }}>
          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 'bold',
            }}
            >
            {question}
            <Timer seconds={seconds} />
          </Typography>
          <RadioButtonsGroup options={choices} handleAnswerSelect={handleAnswerSelect} />
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <StyledBtn
            onClick={handleOpen}
            variant="outlined"
          >
            <Typography>Show More</Typography>
          </StyledBtn>
          <StyledBtn
            variant="outlined"
            onClick={handleNextCard}
            disabled={selectedAnswerIndex === null}
          >
            {isLastCard ? 'Finish' : 'Next'}
          </StyledBtn>
        </CardActions>
        <BaseModal open={modal} handleClose={handleClose} card={currentCard} />
      </Card >
    </>
  );
}

export default Question;
