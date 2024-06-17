import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNode } from "@craftjs/core";

import {
  Typography,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Chip,
  TextField,
  Divider,
  Slider
} from "@mui/material";

import componentDefaultStyle from "../../componentDefaultStyle.js";
import {RootState} from "../../../../../store/store";

export const MaterialChip = ({
  size,
  variant,
  color,
  label,
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
    <Chip
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      ref={(ref) => connect(drag(ref))}
      label={label}
      size={size}
      variant={variant}
      color={color}
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
  );
};

const MaterialChipSettings = () => {
  const {
    actions: { setProp },
    props,
    padding,
    margin,
  } = useNode((node) => ({
    props: node.data.props,
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
              setProp((props) => (props.variant = e.target.value))
            }
            style={componentDefaultStyle.settingPanelSelect}
          >
            <MenuItem value="outlined">Outlined</MenuItem>
            <MenuItem value="filled">Filled</MenuItem>
          </Select>
        </FormControl>
      </Typography>
      <Typography component="div" variant="body1" mt={1}>
        <FormControl component="fieldset" size="small" fullWidth>
          <FormLabel component="legend">Color</FormLabel>
          <Select
            id="color-select"
            value={props.color}
            onChange={(e) => setProp((props) => (props.color = e.target.value))}
            style={componentDefaultStyle.settingPanelSelect}
          >
            <MenuItem value="primary">Primary</MenuItem>
            <MenuItem value="success">Success</MenuItem>
            <MenuItem value="warning">Warning</MenuItem>
            <MenuItem value="error">Error</MenuItem>
            <MenuItem value="info">Info</MenuItem>
            <MenuItem value="secondary">Secondary</MenuItem>
            <MenuItem value="default">Default</MenuItem>
          </Select>
        </FormControl>
      </Typography>
      <Typography component="div" variant="body1" mt={1}>
        <FormControl size="small" component="fieldset" fullWidth>
          <FormLabel component="legend">Label</FormLabel>
          <TextField
            value={props.label}
            variant="outlined"
            onChange={(e) => {
              setProp((props) => (props.label = e.target.value));
            }}
            style={componentDefaultStyle.settingPanelTextArea}
          ></TextField>
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

MaterialChip.craft = {
  props: {
    label: "Chip",
    size: "medium",
    variant: "filled",
    color: "primary",
  },
  related: {
    settings: MaterialChipSettings,
  },
};
