import { Button } from "@mui/material";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant={selected ? "contained" : "outlined"}
      sx={{
        border: "1px solid #EEBC1D",
        borderRadius: 1,
        padding: { xs: "8px 12px", md: "10px 20px" },
        fontFamily: "Montserrat",
        fontSize: { xs: "0.8rem", md: "0.9rem" },
        fontWeight: selected ? 700 : 500,
        minWidth: { xs: "70px", md: "100px" },
        flex: { xs: "1 1 auto", md: "0 0 auto" },
        maxWidth: { xs: "120px", md: "none" },
        backgroundColor: selected ? "#EEBC1D" : "transparent",
        color: selected ? "#000" : "#EEBC1D",
        textTransform: "none",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: "#EEBC1D",
          color: "#000",
          border: "1px solid #EEBC1D",
          transform: "translateY(-1px)",
          boxShadow: "0 2px 8px rgba(238, 188, 29, 0.3)",
        },
        "&:active": {
          transform: "translateY(0)",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default SelectButton;