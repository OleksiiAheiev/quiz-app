import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import styled from '@emotion/styled';
import { categoriesThunks } from '../../store/modules/categories';
import logo from '../../logo.webp';
import CategoryBtns from '../CategoryBtns';

const NavWrapper = styled(Box)(() => ({
  padding: '0 20px',
  backgroundColor: '#fff',
}));

const QuizButton = styled(Button)(() => ({
  width: '110px',
  backgroundColor: '#6c4298',
  color: '#fff',
  marginBottom: '20px',
  '&:hover': {
    backgroundColor: 'rgb(136 84 192 / .8)',
    color: '#000',
  },
}));

const ButtonWrapper = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#e5e5e5',
  padding: '20px 30px 0',
  borderRadius: '10px',
  marginBottom: '20px',
}));

function NavMenu() {
  const { categories } = useSelector((state) => state.categoriesReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        await dispatch(categoriesThunks.fetchCategories());
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <NavWrapper
      className="nav-menu"
      sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }}
    >
      <Link
        style={{
          textDecoration: 'none',
          color: 'inherit',
          cursor: 'pointer',
        }}
        to={'/quiz'}
      >
        <img
          style={{ padding: '0 30px', width: '100px' }}
          src={logo}
          alt="logo" />
      </Link>
      <ButtonWrapper>
        <Link
          style={{
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
          }}
          to={'quiz/create'}
        >
          <QuizButton
            variant="contained"
            size="small"
          >
            <Typography fontSize='small'>Create Quiz</Typography>
          </QuizButton>
        </Link>
        <Link
          style={{
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
          }}
          to={'quiz/favorite'}
        >
          <QuizButton
            variant="contained"
            size="small"
          >
            <Typography fontSize='small'>Favorite</Typography>
          </QuizButton>
        </Link>
      </ButtonWrapper>
      {categories.map((category, index) => (
        <CategoryBtns category={category} id={index} key={index} />
      ))}
    </NavWrapper>
  );
}

export default NavMenu;
