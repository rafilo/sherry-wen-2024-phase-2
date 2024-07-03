import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNode } from "@craftjs/core";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  TextField,
  Select,
  MenuItem,
  Typography,
  Slider,
  Divider,
  Chip,
} from "@mui/material";

import componentDefaultStyle from "../../componentDefaultStyle.js";
import {RootState} from "../../../../../store/store";

interface MaterialButtonProps {
  size: "small" | "medium" | "large";
  variant: "text" | "outlined" | "contained";
  color: "primary" | "secondary" | "success" | "error";
  text: string;
  currentFunction: string;
  padding: number;
  margin: number;
}
export const MaterialButton: React.FC<MaterialButtonProps> = ({
  size,
  variant,
  color,
  text,
  currentFunction,
  padding,
  margin,
}) => {
  const {
    // declare connector in useNode() to enable drag for the component
    connectors: { connect, drag },
    isActive,
  } = useNode((node) => ({
    isActive: node.events.selected,
  }));

  const [hover, setHover] = useState(false);
  const canvasEditable = useSelector((state: RootState) => state)

  return (
    <Button
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      ref={(ref) => connect(drag(ref))}
      size={size}
      variant={variant}
      color={color}
      onClick={function () {
        const func = new Function(currentFunction);
        return func();
      }}
      style={{
        padding: `${padding}px`,
        margin: `${margin}px`,
        ...(hover && canvasEditable
          ? componentDefaultStyle.componentHover
          : null),
        ...(isActive && canvasEditable
          ? componentDefaultStyle.componentFocus
          : null),
      }}
    >
      {text}
    </Button>
  );
};

/* Component Setting that show when selecting the component, 
   check the props of the corresponding mui elements and then
   setting up with template below. In this case we are modifying
   size, variant, and color props of a mui button
   https://mui.com/material-ui/react-button/
*/
const MaterialbuttonSetting = () => {
  // Use selectedBtn to keep track of the current selected setting panel
  const [selectedBtn, setSelectedBtn] = React.useState(1);
  const {
    actions: { setProp },
    padding,
    margin,
    props,
  } = useNode((node) => ({
    props: node.data.props,
    padding: node.data.props.padding,
    margin: node.data.props.margin,
  }));

  return (
    <div>
      <ButtonGroup
        disableElevation
        variant="contained"
        color="primary"
        fullWidth
      >
        <Button
          color={selectedBtn === 1 ? "primary" : "inherit"}
          onClick={() => setSelectedBtn(1)}
          style={componentDefaultStyle.settingPanelButton}
        >
          Content
        </Button>
        <Button
          color={selectedBtn === 2 ? "primary" : "inherit"}
          onClick={() => setSelectedBtn(2)}
          style={componentDefaultStyle.settingPanelButton}
        >
          Event
        </Button>
      </ButtonGroup>

      {selectedBtn == 1 ? (
        <div>
          <Divider
            textAlign="left"
            style={{ paddingTop: "20px" }}
            color="#e0e0e0"
          >
            <Chip
              size="small"
              variant="outlined"
              color="primary"
              label="props"
            />
          </Divider>
          <Typography component="div" variant="body1" mt={1}>
            <FormControl size="small" component="fieldset" fullWidth>
              <FormLabel component="legend">Size</FormLabel>
              <Select
                id="size-select"
                value={props.size}
                onChange={(e) =>
                  setProp((props: MaterialButtonProps) => (props.size = e.target.value))
                }
                style={componentDefaultStyle.settingPanelSelect}
              >
                <MenuItem value="small">Small</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="large">Large</MenuItem>
              </Select>
            </FormControl>
          </Typography>
          <Typography component="div" variant="body1" mt={1}>
            <FormControl size="small" component="fieldset" fullWidth>
              <FormLabel component="legend">Variant</FormLabel>
              <Select
                id="variant-select"
                value={props.variant}
                onChange={(e) =>
                  setProp((props: MaterialButtonProps) => (props.variant = e.target.value))
                }
                style={componentDefaultStyle.settingPanelSelect}
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="outlined">Outlined</MenuItem>
                <MenuItem value="contained">Contained</MenuItem>
              </Select>
            </FormControl>
          </Typography>
          <Typography component="div" variant="body1" mt={1}>
            <FormControl component="fieldset" size="small" fullWidth>
              <FormLabel component="legend">Color</FormLabel>
              <Select
                id="color-select"
                value={props.color}
                onChange={(e) =>
                  setProp((props: MaterialButtonProps) => (props.color = e.target.value))
                }
                style={componentDefaultStyle.settingPanelSelect}
              >
                <MenuItem value="primary">Primary</MenuItem>
                <MenuItem value="secondary">Secondary</MenuItem>
                <MenuItem value="success">Success</MenuItem>
                <MenuItem value="error">Error</MenuItem>
              </Select>
            </FormControl>
          </Typography>

          <Divider
            textAlign="left"
            style={{ paddingTop: "20px" }}
            color="#e0e0e0"
          >
            <Chip
              size="small"
              variant="outlined"
              color="primary"
              label="styles"
            />
          </Divider>

          <Typography component="div" variant="body1" mt={1}>
            <FormControl size="small" component="fieldset" fullWidth>
              <FormLabel component="legend">Padding</FormLabel>
              <Slider
                style={componentDefaultStyle.settingPanelSlide}
                value={padding || 10}
                step={1}
                min={1}
                max={20}
                valueLabelDisplay="auto"
                onChange={(_, value) => {
                  setProp((props: MaterialButtonProps) => (props.padding = value));
                }}
              />
            </FormControl>
          </Typography>
          <Typography component="div" variant="body1" mt={1}>
            <FormControl size="small" component="fieldset" fullWidth>
              <FormLabel component="legend">Margin</FormLabel>
              <Slider
                style={componentDefaultStyle.settingPanelSlide}
                value={margin || 5}
                step={1}
                min={1}
                max={20}
                valueLabelDisplay="auto"
                onChange={(_, value) => {
                  setProp((props: MaterialButtonProps) => (props.margin = value));
                }}
              />
            </FormControl>
          </Typography>
          <Typography component="div" variant="body1" mt={1}>
            <FormControl size="small" component="fieldset" fullWidth>
              <FormLabel component="legend">Content</FormLabel>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={props.text}
                onChange={(e) => {
                  setProp((props: MaterialButtonProps) => (props.text = e.target.value));
                }}
                style={componentDefaultStyle.settingPanelTextArea}
              ></TextField>
            </FormControl>
          </Typography>
        </div>
      ) : (
        <div>
          <Typography component="div" variant="body1" mt={1}>
            <FormControl component="fieldset" size="small" fullWidth>
              <FormLabel component="legend">Click Event</FormLabel>
              <TextField
                id="outlined-basic"
                variant="outlined"
                multiline
                value={props.currentFunction}
                onChange={(e) => {
                  setProp((props: MaterialButtonProps) => (props.currentFunction = e.target.value));
                }}
                style={componentDefaultStyle.settingPanelTextArea}
              ></TextField>
            </FormControl>
          </Typography>
        </div>
      )}
    </div>
  );
};

/* use Component.craft to pass default prop when creating the component
   and the setting which is used to modify the component
 */
MaterialButton.craft = {
  props: {
    size: "small",
    variant: "contained",
    color: "primary",
    text: "Click me",
    currentFunction: "console.log('hi')",
    padding: 10,
    margin: 5,
  },
  related: {
    settings: MaterialbuttonSetting,
  },
};
