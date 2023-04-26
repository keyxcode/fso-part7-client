import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Box } from "@mantine/core";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <Box mb="md">
      <div style={hideWhenVisible}>
        <Button variant="outline" fullWidth onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button fullWidth onClick={toggleVisibility} color="orange">
          cancel
        </Button>
      </div>
    </Box>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
