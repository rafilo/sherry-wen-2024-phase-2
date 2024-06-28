import React, { useState, useEffect } from "react";
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
  Rating,
} from "@mui/material";

import componentDefaultStyle from "../../componentDefaultStyle.js";
import {RootState} from "../../../../../store/store";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

export const MaterialRating = ({
  size,
  color,
  padding,
  margin,
  precision,
  icon,
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
    <Rating
    sx={{
      "& .MuiRating-iconFilled": {
        color: {color}
      },
    }}
      precision={precision == "enable" ? 0.5 : 1}
      icon={icon == "heart" ? <FavoriteIcon fontSize="inherit"/> : icon=="like" ? <ThumbUpIcon fontSize="inherit"/> : <StarIcon fontSize="inherit"/>  }
      emptyIcon={icon == "heart" ? <FavoriteBorderIcon fontSize="inherit"/> : icon=="like" ? <ThumbUpOffAltIcon fontSize="inherit"/> : <StarOutlineIcon fontSize="inherit"/>}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      ref={(ref) => connect(drag(ref))}
      size={size}
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

/* Component Setting that show when selecting the component, 
   check the props of the corresponding mui elements and then
   setting up with template below. In this case we are modifying
   size, variant, and color props of a mui button
   https://mui.com/material-ui/react-button/
*/
const MaterialRatingSetting = () => {
  const {
    actions: { setProp },
    padding,
    margin,
    props,
    precision,
    icon,
  } = useNode((node) => ({
    props: node.data.props,
    padding: node.data.props.padding,
    margin: node.data.props.margin,
    precision: node.data.props.precision,
    icon: node.data.props.icon
  }));

  return (
    <div>
      <Divider
        textAlign="left"
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
              setProp((props) => (props.size = e.target.value))
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
          <FormLabel component="legend">Precision</FormLabel>
          <Select
            id="precision-select"
            value={props.precision}
            onChange={(e) =>
              setProp((props) => (props.precision = e.target.value))
            }
            style={componentDefaultStyle.settingPanelSelect}
          >
            <MenuItem value="enable">Enable</MenuItem>
            <MenuItem value="disable">Disable</MenuItem>
          </Select>
        </FormControl>
      </Typography>
      <Typography component="div" variant="body1" mt={1}>
        <FormControl size="small" component="fieldset" fullWidth>
          <FormLabel component="legend">Icon</FormLabel>
          <Select
            id="icon-select"
            value={props.icon}
            onChange={(e) =>
              setProp((props) => (props.icon = e.target.value))
            }
            style={componentDefaultStyle.settingPanelSelect}
          >
            <MenuItem value="star">Star</MenuItem>
            <MenuItem value="heart">Heart</MenuItem>
            <MenuItem value="like">Like</MenuItem>
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
              setProp((props) => (props.color = e.target.value))
            }
            style={componentDefaultStyle.settingPanelSelect}
          >
            <MenuItem value="primary">Yellow</MenuItem>
            <MenuItem value="pink">Pink</MenuItem>
            <MenuItem value="red">Red</MenuItem>
            <MenuItem value="purple">Purple</MenuItem>
            <MenuItem value="black">Black</MenuItem>
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

/* use Component.craft to pass default prop when creating the component
   and the setting which is used to modify the component
 */
  MaterialRating.craft = {
  props: {
    size: "small",
    color: "primary",
    padding: 10,
    margin: 5,
    precision: "disable",
    icon: "star",
  },
  related: {
    settings: MaterialRatingSetting,
  },
};
