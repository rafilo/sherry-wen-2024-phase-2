import React, { useState, useEffect } from "react";

import { useNode } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import { useSelector } from "react-redux";
import {
  Slider,
  FormControl,
  FormLabel,
  Typography,
  Divider,
  Chip,
  Select,
  MenuItem,
} from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import componentDefaultStyle from "../../componentDefaultStyle.js";
import { RootState } from "../../../../../store/store";

interface TextProps {
  text?: string;
  fontSize: number | number[];
  padding?: number | number[];
  color?: string;
  bgColor?: string;
  margin?: number | number[];
  align?: string;
  craft?: JSON;
}
export const Text: React.FC<TextProps> = ({
  text,
  fontSize,
  padding,
  color,
  bgColor,
  margin,
  align,
}) => {
  const {
    connectors: { connect, drag },
    isActive,
    actions: { setProp },
  } = useNode((node) => ({
    isActive: node.events.selected,
  }));

  const [editable, setEditable] = useState(false);
  const [hover, setHover] = useState(false);
  const canvasEditable = useSelector((state: RootState) => state);

  useEffect(() => {
    !isActive && setEditable(false);
  }, [isActive]);

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      onClick={(e) => (canvasEditable ? setEditable(true) : setEditable(false))}
    >
      <ContentEditable
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        disabled={!editable}
        html={text}
        onChange={(e) =>
          setProp(
            (props: TextProps) =>
              (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, ""))
          )
        }
        style={{
          fontSize: `${fontSize}px`,
          padding: `${padding}px`,
          margin: `${margin}px`,
          color: `${color}`,
          background: `${bgColor}`,
          textAlign: `${align}`,
          ...(hover && canvasEditable
            ? componentDefaultStyle.componentHover
            : null),
          ...(editable && canvasEditable
            ? componentDefaultStyle.componentFocus
            : null),
        }}
      />
    </div>
  );
};

const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
    padding,
    margin,
    color,
    bgColor,
    props,
  } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
    padding: node.data.props.padding,
    margin: node.data.props.margin,
    color: node.data.props.color,
    bgColor: node.data.props.bgColor,
    props: node.data.props,
  }));

  return (
    <>
      <Divider textAlign="left" color="#e0e0e0">
        <Chip size="small" variant="outlined" color="primary" label="styles" />
      </Divider>
      <Typography component="div" variant="body1" mt={1}>
        <FormControl size="small" component="fieldset" fullWidth>
          <FormLabel component="legend">Font size</FormLabel>
          <Slider
            value={fontSize || 7}
            step={1}
            min={1}
            max={50}
            valueLabelDisplay="auto"
            onChange={(_, value) => {
              setProp((props: TextProps) => (props.fontSize = value));
            }}
          />
        </FormControl>
      </Typography>
      <Typography component="div" variant="body1" mt={1}>
        <FormControl size="small" component="fieldset" fullWidth>
          <FormLabel component="legend">Padding</FormLabel>
          <Slider
            value={padding || 10}
            step={1}
            min={1}
            max={20}
            valueLabelDisplay="auto"
            onChange={(_, value) => {
              setProp((props: TextProps) => (props.padding = value));
            }}
          />
        </FormControl>
      </Typography>
      <Typography component="div" variant="body1" mt={1}>
        <FormControl size="small" component="fieldset" fullWidth>
          <FormLabel component="legend">Margin</FormLabel>
          <Slider
            value={margin || 5}
            step={1}
            min={1}
            max={20}
            valueLabelDisplay="auto"
            onChange={(_, value) => {
              setProp((props: TextProps) => (props.margin = value));
            }}
          />
        </FormControl>
      </Typography>
      <Typography component="div" variant="body1" mt={1}>
        <FormControl fullWidth component="fieldset">
          <FormLabel component="legend">Text Color</FormLabel>
          <MuiColorInput
            value={color || "#000"}
            onChange={(color: string) => {
              setProp((props: TextProps) => (props.color = color));
            }}
          />
        </FormControl>
      </Typography>
      <Typography component="div" variant="body1" mt={1}>
        <FormControl fullWidth component="fieldset">
          <FormLabel component="legend">Background Color</FormLabel>
          <MuiColorInput
            value={bgColor || "#fff"}
            onChange={(color: string) => {
              setProp((props: TextProps) => (props.bgColor = color));
            }}
          />
        </FormControl>
      </Typography>
      <Typography component="div" variant="body1" mt={1}>
        <FormControl component="fieldset" size="small" fullWidth>
          <FormLabel component="legend">Text Align</FormLabel>
          <Select
            id="align-select"
            value={props.align}
            onChange={(e) =>
              setProp((props: TextProps) => (props.align = e.target.value))
            }
            style={componentDefaultStyle.settingPanelSelect}
          >
            <MenuItem value="center">Center</MenuItem>
            <MenuItem value="end">End</MenuItem>
            <MenuItem value="inherit">Inherit</MenuItem>
          </Select>
        </FormControl>
      </Typography>
    </>
  );
};

Text.craft = {
  props: {
    text: "Hi",
    fontSize: 20,
    padding: 10,
    margin: 5,
    color: "#000000",
    bgColor: "#ffffff",
    align: "inherit",
  },
  related: {
    settings: TextSettings,
  },
};
