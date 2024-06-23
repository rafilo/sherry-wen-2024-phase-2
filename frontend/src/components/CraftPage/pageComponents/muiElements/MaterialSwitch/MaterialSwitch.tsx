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
  Slider
} from "@mui/material";

import componentDefaultStyle from "../../componentDefaultStyle.js";
import {RootState} from "../../../../../store/store";

export const MaterialSwitch = ({
  label,
  color,
  labelPlacement,
  size,
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
    <div ref={(ref) => connect(drag(ref))}>
      <FormControlLabel
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        control={<Switch size={size} color={color} />}
        label={label}
        labelPlacement={labelPlacement}
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
      />
    </div>
  );
};

const MaterialSwitchSettings = () => {
  const {
    actions: { setProp },
    props,
    label,
    labelPlacement,
    color,
    size,
    padding,
    margin,
  } = useNode((node) => ({
    props: node.data.props,
    size: node.data.props.size,
    label: node.data.props.label,
    labelPlacement: node.data.props.labelPlacement,
    color: node.data.props.color,
    padding: node.data.props.padding,
    margin: node.data.props.margin,
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
            <MenuItem value="large">Large</MenuItem>
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
        <FormControl size="small" component="fieldset" fullWidth>
          <FormLabel component="legend">LabelPlacement</FormLabel>
          <Select
            id="lp-select"
            value={props.labelPlacement}
            onChange={(e) =>
              setProp((props) => (props.labelPlacement = e.target.value))
            }
            style={componentDefaultStyle.settingPanelSelect}
          >
            <MenuItem value="top">Top</MenuItem>
            <MenuItem value="start">Start</MenuItem>
            <MenuItem value="bottom">Bottom</MenuItem>
            <MenuItem value="end">End</MenuItem>
          </Select>
        </FormControl>
      </Typography>
      <Divider textAlign="left" style={{ paddingTop: "20px" }} color="#e0e0e0">
        <Chip size="small" variant="outlined" color="primary" label="styles" />
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
              setProp((props) => (props.padding = value));
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
              setProp((props) => (props.margin = value));
            }}
          />
        </FormControl>
      </Typography>
    </div>
  );
};

MaterialSwitch.craft = {
  //default value of the Switch UI
  props: {
    defaultValue: "Hi there",
    size: "small",
    labelPlacement: "end",
    label: "hi",
    color: "primary",
    padding: 10,
    margin: 5,
  },
  related: {
    settings: MaterialSwitchSettings,
  },
};
