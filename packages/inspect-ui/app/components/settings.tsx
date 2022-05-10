import React, { createContext, useContext } from "react";
import {
  Checkbox,
  ClickAwayListener,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { Link as RouterLink, useSearchParams, useNavigate } from "react-router-dom";
import { stringify } from "query-string";
import ErroredIcon from "./errored-icon";
import HaltedIcon from "./halted-icon";
import CompletedIcon from "./completed-icon";

interface Settings {
  showCompleted: boolean;
  showErrored: boolean;
  showHalted: boolean;
  showStackTraces: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  showCompleted: false,
  showErrored: true,
  showHalted: false,
  showStackTraces: false,
};

export const SettingsContext = createContext<{
  settings: Settings;
  setSettings(settings: Settings): void;
}>({
  settings: DEFAULT_SETTINGS,
  setSettings: () => {},
});

type SearchParams = { [key: string]: string | boolean | number | undefined };
function searchString(parts: SearchParams): string {
  // remove keys with undefined to allow
  let filtered = Object.keys(parts).reduce<SearchParams>((acc, key) => {
    if (parts[key] === undefined) {
      return acc;
    } else {
      acc[key] = parts[key];
      return acc;
    }
  }, {});

  if (Object.keys(filtered).length === 0) {
    return "";
  } else {
    return `?${stringify(filtered)}`;
  }
}

export function SettingsMenu(): JSX.Element {
  let [search] = useSearchParams();
  let navigate = useNavigate();
  let isOpen = search.has("showSettings");
  let { settings, setSettings } = useContext(SettingsContext);

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label={`${open} settings`}
        component={RouterLink}
        disabled={isOpen}
        to={{
          search: searchString({ showSettings: isOpen ? undefined : true }),
        }}
      >
        <SettingsIcon />
      </IconButton>
      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={() =>
          isOpen &&
          navigate({ search: searchString({ showSettings: undefined }) })
        }
      >
        <Drawer open={isOpen} variant="persistent" anchor="right">
          <Typography variant="h4">Settings</Typography>
          <List>
            <ListItem
              role={undefined}
              dense
              button
              onClick={() =>
                setSettings({
                  ...settings,
                  showCompleted: !settings.showCompleted,
                })
              }
            >
              <ListItemIcon>
                <CompletedIcon />
              </ListItemIcon>
              <ListItemText primary="Show completed" />
              <ListItemSecondaryAction>
                <Checkbox
                  onClick={() =>
                    setSettings({
                      ...settings,
                      showCompleted: !settings.showCompleted,
                    })
                  }
                  edge="start"
                  checked={settings.showCompleted}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": `Show completed` }}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem
              role={undefined}
              dense
              button
              onClick={() =>
                setSettings({
                  ...settings,
                  showHalted: !settings.showHalted,
                })
              }
            >
              <ListItemIcon>
                <HaltedIcon />
              </ListItemIcon>
              <ListItemText primary={`Show halted`} />
              <ListItemSecondaryAction>
                <Checkbox
                  onClick={() =>
                    setSettings({
                      ...settings,
                      showHalted: !settings.showHalted,
                    })
                  }
                  edge="start"
                  checked={settings.showHalted}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": `Show halted` }}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem
              role={undefined}
              dense
              button
              onClick={() =>
                setSettings({
                  ...settings,
                  showErrored: !settings.showErrored,
                })
              }
            >
              <ListItemIcon>
                <ErroredIcon />
              </ListItemIcon>
              <ListItemText primary={`Show errored`} />
              <ListItemSecondaryAction>
                <Checkbox
                  onClick={() =>
                    setSettings({
                      ...settings,
                      showErrored: !settings.showErrored,
                    })
                  }
                  edge="start"
                  checked={settings.showErrored}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": `Show errored` }}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem
              role={undefined}
              dense
              button
              onClick={() =>
                setSettings({
                  ...settings,
                  showStackTraces: !settings.showStackTraces,
                })
              }
            >
              <ListItemIcon />
              <ListItemText primary={`Show stacktraces`} />
              <ListItemSecondaryAction>
                <Checkbox
                  onClick={() =>
                    setSettings({
                      ...settings,
                      showStackTraces: !settings.showStackTraces,
                    })
                  }
                  edge="start"
                  checked={settings.showStackTraces}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": `Show stacktraces` }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Drawer>
      </ClickAwayListener>
    </>
  );
}
