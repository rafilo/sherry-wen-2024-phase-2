import {
  Box,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  TooltipProps,
  tooltipClasses,
  Chip
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { Element, useEditor } from "@craftjs/core";
import AppsIcon from "@mui/icons-material/Apps";

import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ShortTextIcon from "@mui/icons-material/ShortText";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import ListAltIcon from "@mui/icons-material/ListAlt";
import StyleIcon from "@mui/icons-material/Style";
import LabelIcon from "@mui/icons-material/Label";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import StarRateIcon from '@mui/icons-material/StarRate';

import {
  Card,
  MaterialButton,
  Container,
  Text,
  MaterialTextField,
  MaterialChip,
  MaterialSwitch,
  MaterialSelect,
  MaterialRating,
} from "../pageComponents/exportComponents";

export const Toolbox = () => {
  const { connectors, query } = useEditor();
  /*
  const genDraggableIconFromRef = function (ref) {
    return ref;
  };
  */

  const toolboxStyle = {
    header: {
      borderBottom: "1px solid #e0e0e0",
    },
    headerTitle: {
      fontSize: "15px",
    },
  };

  const DragIconButton = styled(IconButton)({
    color: "#bdbdbd",
    "&:hover": {
      backgroundColor: "rgb(0 0 0 / 0%)",
      cursor: "move",
      color: "#424242",
    },
  });

  const WidgetTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} arrow />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      minheight: 70,
      fontSize: theme.typography.pxToRem(14),
      border: "1px solid #dadde9",
    },
  }));

  return (
    <Box>
      <Grid container alignItems="center">
        <Grid item xs>
          <AppsIcon
            style={{
              position: "relative",
                      float:"left",
              color: "#ffffff",
              paddingLeft: "2px",
              paddingTop: "2px",
              fontSize: "21px",
            }}
          />
          <Typography
            variant="subtitle1"
            style={{
              backgroundColor: "#1976d2",
              color: "#ffffff",
              paddingLeft: "28px",
              ...toolboxStyle.headerTitle,
            }}
          >
            Widgets
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        columnSpacing={0}
        p={1}
      >
        <Chip label="MUI" />
        <Grid container direction="column" item>
          <WidgetTooltip title="MaterialButton" placement="right">
            <DragIconButton
              aria-label="button"
              ref={(ref) =>
                connectors.create(
                  ref,
                  <MaterialButton
                    text="click me"
                    size="small"
                    variant="outlined"
                    color="primary"
                    disabled=""
                  />
                )
              }
            >
              <RadioButtonCheckedIcon />
            </DragIconButton>
          </WidgetTooltip>
        </Grid>

        <Grid container direction="column" item>
          <WidgetTooltip title="MaterialTextField" placement="right">
            <DragIconButton
              aria-label="textfield"
              ref={(ref) =>
                connectors.create(
                  ref,
                  <MaterialTextField
                    defaultValue="textField"
                    size="small"
                    variant="filled"
                  />
                )
              }
            >
              <TextFieldsIcon />
            </DragIconButton>
          </WidgetTooltip>
        </Grid>
        
        <Grid container direction="column" item>
          <WidgetTooltip title="MaterialSelect" placement="right">
            <DragIconButton
              aria-label="select"
              ref={(ref) => connectors.create(ref, <MaterialSelect />)}
            >
              <ArrowDropDownIcon />
            </DragIconButton>
          </WidgetTooltip>
        </Grid>

        <Grid container direction="column" item>
          <WidgetTooltip title="MaterialRating" placement="right">
            <DragIconButton
              aria-label="rating"
              ref={(ref) => connectors.create(ref, <MaterialRating />)}
            >
              <StarRateIcon />
            </DragIconButton>
          </WidgetTooltip>
        </Grid>

        <Grid container direction="column" item>
          <WidgetTooltip title="MaterialChip" placement="right">
            <DragIconButton
              aria-label="chip"
              ref={(ref) => connectors.create(ref, <MaterialChip />)}
            >
              <LabelIcon />
            </DragIconButton>
          </WidgetTooltip>
        </Grid>
        <Grid container direction="column" item style={{borderBottom: "1px solid #bdbdbd", marginBottom: "20px"}}>
          <WidgetTooltip title="MaterialSwitch" placement="right">
            <DragIconButton
              aria-label="switch"
              ref={(ref) => connectors.create(ref, 
              <MaterialSwitch 
              label= "Hi"
              size="small"
              labelPlacement= "end"
              value="small"
              color="primary"
              />)}
            >
              <ToggleOffIcon />
            </DragIconButton>
          </WidgetTooltip>
        </Grid>
        <Chip label="HTML" />
        <Grid container direction="column" item>
          <WidgetTooltip title="HTMLText" placement="right">
            <DragIconButton
              aria-label="text"
              ref={(ref) => connectors.create(ref, <Text text="Hi world" />)}
            >
              <ShortTextIcon />
            </DragIconButton>
          </WidgetTooltip>
        </Grid>

        <Grid container direction="column" item>
          <WidgetTooltip title="Container" placement="right">
            <DragIconButton
              aria-label="Container"
              ref={(ref) =>
                connectors.create(ref, <Element is={Container} canvas />)
              }
            >
              <ListAltIcon />
            </DragIconButton>
          </WidgetTooltip>
        </Grid>

        <Grid container direction="column" item>
          <WidgetTooltip title="Card" placement="right">
            <DragIconButton
              aria-label="card"
              ref={(ref) => connectors.create(ref, <Card />)}
            >
              <StyleIcon />
            </DragIconButton>
          </WidgetTooltip>
        </Grid>
      </Grid>
    </Box>
  );
};
