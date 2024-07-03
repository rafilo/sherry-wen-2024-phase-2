import { Text } from "../Text/Text";
import { Element, useNode } from "@craftjs/core";
import { Container, ContainerSettings } from "../../muiElements/Container/Container";
import { ReactNode } from "react";

interface CardTopProps {
  children: ReactNode;
}
export const CardTop: React.FC<CardTopProps> = ({ children }) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div ref={connect} className="text-only">
      {children}
    </div>
  );
};

CardTop.craft = {
  /*
  rules: {
    canMoveIn: (incomingNodes) =>
      incomingNodes.every((incomingNode) => incomingNode.data.type === Text),
  },
  */
};

interface CardBottomProps {
  children: ReactNode;
}
export const CardBottom: React.FC<CardBottomProps> = ({ children }) => {
  const {
    connectors: { connect },
  } = useNode();
  return <div ref={connect}>{children}</div>;
};

CardBottom.craft = {
  /*
  rules: {
    // Only accept Buttons
    canMoveIn: (incomingNodes) =>
      incomingNodes.every((incomingNode) => incomingNode.data.type === MaterialButton),
  },
  */
};
interface CardProps {
  background: string;
  padding: number; 
}
export const Card: React.FC<CardProps> = ({ background, padding = 20 }) => {
  return (
    <Container background={background} padding={padding}>
      <Element is={CardTop} id="text" canvas>
        {" "}
        <Text text="Title" fontSize={20} align="inherit"/>
        <Text text="Subtitle" fontSize={15} align="inherit"/>
      </Element>
      <Element is={CardBottom} id="buttons" canvas>
        {" "}
      </Element>
    </Container>
  );
};

Card.craft = {
  props: {
    background: "#ffffff",
    padding: 10,
  },
  related: {
    settings: ContainerSettings,
  },
};
