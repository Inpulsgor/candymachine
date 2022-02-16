import { Theme } from "@mui/material";

const styles = {
  root: {
    display: "flex",
    padding: (theme: Theme) => theme.spacing(0),
    "& > *": {
      margin: (theme: Theme) => theme.spacing(0.5),
      marginRight: 0,
      width: (theme: Theme) => theme.spacing(6),
      height: (theme: Theme) => theme.spacing(6),
      display: "flex",
      flexDirection: "column" as const,
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      background: "#384457",
      color: "white",
      borderRadius: 5,
      fontSize: 10,
    },
  },
  done: {
    display: "flex",
    margin: (theme: Theme) => theme.spacing(1),
    marginRight: 0,
    padding: (theme: Theme) => theme.spacing(1),
    flexDirection: "column" as const,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    background: "#384457",
    color: "white",
    borderRadius: 5,
    fontWeight: 700,
    fontSize: 18,
  },
  item: {
    fontWeight: 700,
    fontSize: 18,
  },
};

export default styles;
