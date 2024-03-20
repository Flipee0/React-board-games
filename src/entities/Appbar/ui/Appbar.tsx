import React from "react";
import { AppbarContainer } from "shared/ui/Appbar/AppbarContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChess } from "@fortawesome/free-solid-svg-icons/faChess";
import Apps from "@mui/icons-material/Apps";
import pagePaths from "shared/models/PagePaths";
import {
  Avatar,
  Dropdown,
  Grid,
  IconButton,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy";
import { Link } from "react-router-dom";
import styles from "./Appbar.module.css"

type AppbarProps = {
  colorModeToggleButton?: React.ReactNode;
};

export const Appbar = ({ colorModeToggleButton }: AppbarProps) => {
  return (
    <AppbarContainer>
      <Grid xs={4}>
        <Link to={"/"} className={styles.navLink}>
          Board games
        </Link>
      </Grid>
      <Grid xs={4} sx={{ display: "flex", justifyContent: "center" }}>
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "plain", color: "neutral" } }}
            sx={{ borderRadius: 40 }}
          >
            <Apps />
            Games
          </MenuButton>
          <Menu
            variant="outlined"
            sx={{
              "--List-padding": "0.5rem",
              "--ListItemDecorator-size": "3rem",
              display: "grid",
              gridTemplateColumns: "repeat(1, 1fr)",
              gridTemplateRows: "repeat(1, 1fr)",
              gap: 1,
            }}
          >
            <Link
              to={pagePaths.gameConfig + pagePaths.chess}
              className={styles.navLink}
            >
              <MenuItem orientation="vertical">
                <ListItemDecorator>
                  <Avatar>
                    <FontAwesomeIcon icon={faChess} />
                  </Avatar>
                </ListItemDecorator>
                Chess
              </MenuItem>
            </Link>
          </Menu>
        </Dropdown>
      </Grid>
      <Grid xs={4} sx={{ display: "flex", justifyContent: "right" }}>
        {colorModeToggleButton}
      </Grid>
    </AppbarContainer>
  );
};
