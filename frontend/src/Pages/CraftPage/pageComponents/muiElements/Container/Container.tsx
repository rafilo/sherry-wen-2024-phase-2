// components/user/Container.js
import { useSelector } from "react-redux";
import { useNode } from "@craftjs/core";
import {
  Paper,
  FormControl,
  FormLabel,
  Slider,
  Typography,
  Divider,
  Chip
} from "@mui/material";

import { MuiColorInput } from "mui-color-input";
import componentDefaultStyle from "../../componentDefaultStyle.js";
import {RootState} from "../../../../../store/store";
import { ReactNode } from "react";

interface ContainerProps {
  background: string;
  padding: number;
  margin?: number;
  children: ReactNode;
  craft?: JSON;
}

export const Container: React.FC<ContainerProps> = ({ background, padding = 0, margin = 0, children }) => {
  const {
    connectors: { connect, drag },
    isActive,
  } = useNode((node) => ({
    isActive: node.events.selected,
  }));
  const canvasEditable = useSelector((state: RootState) => state)
  return (
    <Paper
      ref={(ref) => connect(drag(ref))}
      style={{
        background,
        padding: `${padding}px`,
        margin: `${margin}px`,
        ...(isActive && canvasEditable? componentDefaultStyle.componentFocus : null),
      }}
    >
      {children}
    </Paper>
  );
};

export const ContainerSettings = () => {
  const {
    background,
    padding,
    margin,
    actions: { setProp },
  } = useNode((node) => ({
    background: node.data.props.background,
    padding: node.data.props.padding,
    margin: node.data.props.margin
  }));
  return (
    <div>
      <Divider textAlign="left" color="#e0e0e0">
        <Chip size="small" variant="outlined" color="primary" label="styles" />
      </Divider>
      <Typography component="div" variant="body1" mt={1}>
        <FormControl fullWidth component="fieldset">
          <FormLabel component="legend">Background</FormLabel>
          <MuiColorInput
            value={background || "#000"}
            onChange={(color: string) => {
              setProp((props: ContainerProps) => (props.background = color));
            }}
          />
        </FormControl>
      </Typography>
      <Typography component="div" variant="body1" mt={2}>
        <FormControl fullWidth component="fieldset">
          <FormLabel component="legend">Padding</FormLabel>
          <Slider
            defaultValue={padding || 10}
            valueLabelDisplay="auto"
            step={1}
            min={1}
            max={50}
            onChange={(_, value) => setProp((props: ContainerProps) => (props.padding = value))}
          />
        </FormControl>
      </Typography>
      <Typography component="div" variant="body1" mt={2}>
        <FormControl fullWidth component="fieldset">
          <FormLabel component="legend">Margin</FormLabel>
          <Slider
            defaultValue={margin || 10}
            valueLabelDisplay="auto"
            step={1}
            min={1}
            max={50}
            onChange={(_, value) => setProp((props: ContainerProps) => (props.margin = value))}
          />
        </FormControl>
      </Typography>
    </div>
  );
};

Container.craft = {
  props: {
    background: "#ffffff",
    padding: 10,
    margin: 10
  },
  related: {
    settings: ContainerSettings,
  },
};
