import React, { useState, useEffect } from "react";
import { useNode } from "@craftjs/core";
import { useSelector } from "react-redux";
import {
  Typography,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  TextField,
  Divider,
  Chip,
  Slider,
  InputLabel
} from "@mui/material";

import componentDefaultStyle from "../../componentDefaultStyle.js";
import {RootState} from "../../../../../store/store";

export const MaterialSelect = ({
  color,
  size,
  padding,
  margin,
  label,
  variant,
  fullWidth,
  item1,
  item2,
  item3,
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
    <div ref={(ref) => connect(drag(ref))}>
      <FormControl
      sx={{ m: 1, minWidth: 120 }}
      variant = {variant}
      fullWidth={fullWidth == "enable" ? true : null}
      size={size} color={color}
      >
      <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        label={label}>
        <MenuItem value="">
            <em>None</em>
        </MenuItem>
        <MenuItem value={"1"}>{item1}</MenuItem>
        <MenuItem value={"2"}>{item2}</MenuItem>
        <MenuItem value={"3"}>{item3}</MenuItem>
      </Select>
      </FormControl>
    </div>
  );
};

const MaterialSelectSettings = () => {
  const {
    actions: { setProp },
    props,
    color,
    size,
    padding,
    margin,
    label,
    variant,
    fullWidth,
    item1,
    item2,
    item3,
  } = useNode((node) => ({
    props: node.data.props,
    size: node.data.props.size,
    color: node.data.props.color,
    padding: node.data.props.padding,
    margin: node.data.props.margin,
    label: node.data.props.label,
    variant: node.data.props.variant,
    fullWidth: node.data.props.fullWidth,
    item1: node.data.props.item1,
    item2: node.data.props.item2,
    item3: node.data.props.item3,
  }));
  return (
    <div>
      <Divider textAlign="left" color="#e0e0e0">
        <Chip size="small" variant="outlined" color="primary" label="props" />
      </Divider>
      <Typography component="div" variant="body1" mt={1}>
        <FormControl size="small" component="fieldset" fullWidth>
          <FormLabel component="legend">Size</FormLabel>
          <Select
            id="size-select"
            value={props.size}
            onChange={(e) => setProp((props) => (props.size = e.target.value))}
            style={componentDefaultStyle.settingPanelSelect}
          >
            <MenuItem value="small">Small</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
          </Select>
        </FormControl>
      </Typography>

      <Typography component="div" variant="body1" mt={1}>
        <FormControl size="small" component="fieldset" fullWidth>
          <FormLabel component="legend">Variant</FormLabel>
          <Select
            id="variant-select"
            value={props.variant}
            onChange={(e) => setProp((props) => (props.variant = e.target.value))}
            style={componentDefaultStyle.settingPanelSelect}
          >
            <MenuItem value="outlined">Outlined</MenuItem>
            <MenuItem value="filled">Filled</MenuItem>
            <MenuItem value="standard">Standard</MenuItem>
          </Select>
        </FormControl>
      </Typography>

      <Typography component="div" variant="body1" mt={1}>
        <FormControl size="small" component="fieldset" fullWidth>
          <FormLabel component="legend">Color</FormLabel>
          <Select
            id="color-select"
            value={props.color}
            onChange={(e) => setProp((props) => (props.color = e.target.value))}
            style={componentDefaultStyle.settingPanelSelect}
          >
            <MenuItem value="default">Grey</MenuItem>
            <MenuItem value="primary">Blue</MenuItem>
            <MenuItem value="warning">Orange</MenuItem>
            <MenuItem value="success">Green</MenuItem>
          </Select>
        </FormControl>
      </Typography>

      <Typography component="div" variant="body1" mt={1}>
        <FormControl size="small" component="fieldset" fullWidth>
          <FormLabel component="legend">Label</FormLabel>
          <TextField
            id="label-input"
            value={props.label}
            onChange={(e) => {
              setProp((props) => (props.label = e.target.value));
            }}
            style={componentDefaultStyle.settingPanelTextArea}
          ></TextField>
        </FormControl>
      </Typography>

      <Typography component="div" variant="body1" mt={1}>
        <FormControl component="fieldset" size="small">
          <FormLabel component="legend">Fullwidth</FormLabel>
          <Select
            id="color-select"
            value={fullWidth}
            onChange={(e) =>
              setProp((props) => (props.fullWidth = e.target.value))
            }
            style={componentDefaultStyle.settingPanelSelect}
          >
            <MenuItem value="enable">Enable</MenuItem>
            <MenuItem value="disable">Disable</MenuItem>
          </Select>
        </FormControl>
      </Typography>

      <Divider textAlign="left" style={{ paddingTop: "20px" }} color="#e0e0e0">
        <Chip size="small" variant="outlined" color="primary" label="items" />
      </Divider>
      <Typography component="div" variant="body1" mt={1}>
        <FormControl size="small" component="fieldset" fullWidth>
          <FormLabel component="legend">Item 1</FormLabel>
          <TextField
            id="item1-input"
            value={props.item1}
            onChange={(e) => {
              setProp((props) => (props.item1 = e.target.value));
            }}
            style={componentDefaultStyle.settingPanelTextArea}
          ></TextField>
        </FormControl>
      </Typography>
      <Typography component="div" variant="body1" mt={1}>
        <FormControl size="small" component="fieldset" fullWidth>
          <FormLabel component="legend">Item 2</FormLabel>
          <TextField
            id="item2-input"
            value={props.item2}
            onChange={(e) => {
              setProp((props) => (props.item2 = e.target.value));
            }}
            style={componentDefaultStyle.settingPanelTextArea}
          ></TextField>
        </FormControl>
      </Typography>
      <Typography component="div" variant="body1" mt={1}>
        <FormControl size="small" component="fieldset" fullWidth>
          <FormLabel component="legend">Item 3</FormLabel>
          <TextField
            id="item3-input"
            value={props.item3}
            onChange={(e) => {
              setProp((props) => (props.item3 = e.target.value));
            }}
            style={componentDefaultStyle.settingPanelTextArea}
          ></TextField>
        </FormControl>
      </Typography>
    </div>
  );
};

MaterialSelect.craft = {
  //default value of the Switch UI
  props: {
    size: "small",
    label: "label",
    color: "primary",
    padding: 10,
    margin: 5,
    variant: "outlined",
    fullWidth: "disable",
    item1: "Item 1",
    item2: "Item 2",
    item3: "Item 3",

  },
  related: {
    settings: MaterialSelectSettings,
  },
};
