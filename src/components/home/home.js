import React, { useEffect, useState } from "react";
import api from "../../api/api";
import Card from "../card/card";
import styled, { ThemeProvider } from "styled-components";
import { CgDarkMode } from "react-icons/cg";
import themes from "../../styles/themes/index.js";

import {
  Container,
  ContainerCard,
  InputContent,
  Content,
  NavbarContainer,
  ImageLogo,
  ModeText,
} from "./home.style.js";

export const ThemeContext = React.createContext();

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const getApiData = async () => {
    const responseData = await api.get("https://ghibliapi.dev/films");
    setMovies(responseData.data);
  };

  useEffect(() => {
    getApiData();
  }, []);

  // ----------- Search Movies

  const searchLowerCase = search.toLocaleLowerCase();

  const Films = movies.filter((film) =>
    film.title.toLocaleLowerCase().includes(searchLowerCase)
  );

  // ----------- Change Theme

  const [theme, setTheme] = useState("light");

  const handleChangeTheme = () => {
    setTheme((prevState) => (prevState === "light" ? "dark" : "light"));
  };

  let themeColor = theme;

  return (
    <ThemeContext.Provider value="theme">
      {/* <ThemeProvider theme={themes[theme]}> */}
      <Container theme={themes[theme]}>
        <NavbarContainer theme={themes[theme]}>
          <ImageLogo theme={themes[theme]} />
          <ModeText theme={themes[theme]} onClick={() => handleChangeTheme()}>
            <CgDarkMode />
          </ModeText>
        </NavbarContainer>
        <Content>
          <InputContent
            type="text"
            placeholder="Movie name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Content>
        <ContainerCard>
          {Films.map((movie) => (
            <Card movie={movie} theme={themes[theme]} themeColor={themeColor} />
          ))}
        </ContainerCard>
      </Container>
      {/* </ThemeProvider> */}
    </ThemeContext.Provider>
  );
};

export default Home;
