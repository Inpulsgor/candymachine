import { FC, useState } from "react";
import Countdown from "react-countdown";
import { Paper, Theme, createStyles } from "@mui/material";
// import { makeStyles } from "@mui/material";
import { CountdownRender, PhaseCountdownProps } from "./PhaseCountdown.types";

// const useStyles = makeStyles((theme: Theme) =>
// 	createStyles({
// 		root: {
// 			display: "flex",
// 			padding: theme.spacing(0),
// 			"& > *": {
// 				margin: theme.spacing(0.5),
// 				marginRight: 0,
// 				width: theme.spacing(6),
// 				height: theme.spacing(6),
// 				display: "flex",
// 				flexDirection: "column",
// 				alignContent: "center",
// 				alignItems: "center",
// 				justifyContent: "center",
// 				background: "#384457",
// 				color: "white",
// 				borderRadius: 5,
// 				fontSize: 10,
// 			},
// 		},
// 		done: {
// 			display: "flex",
// 			margin: theme.spacing(1),
// 			marginRight: 0,
// 			padding: theme.spacing(1),
// 			flexDirection: "column",
// 			alignContent: "center",
// 			alignItems: "center",
// 			justifyContent: "center",
// 			background: "#384457",
// 			color: "white",
// 			borderRadius: 5,
// 			fontWeight: "bold",
// 			fontSize: 18,
// 		},
// 		item: {
// 			fontWeight: "bold",
// 			fontSize: 18,
// 		},
// 	})
// );

const PhaseCountdown: FC<PhaseCountdownProps> = ({
  date,
  status,
  style,
  start,
  end,
  onComplete,
}) => {
  // const classes = useStyles();

  const [isFixed, setIsFixed] = useState(
    start && end && date ? start.getTime() - Date.now() < 0 : false
  );

  const renderCountdown = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRender) => {
    hours += days * 24;
    if (completed) {
      return status ? <span className={"classes.done"}>{status}</span> : null;
    } else {
      return (
        <div className={"classes.root"} style={style}>
          {isFixed && (
            <Paper elevation={0}>
              <span className={"classes.item"}>+</span>
            </Paper>
          )}
          <Paper elevation={0}>
            <span className={"classes.item"}>
              {hours < 10 ? `0${hours}` : hours}
            </span>
            <span>hrs</span>
          </Paper>
          <Paper elevation={0}>
            <span className={"classes.item"}>
              {minutes < 10 ? `0${minutes}` : minutes}
            </span>
            <span>mins</span>
          </Paper>
          <Paper elevation={0}>
            <span className={"classes.item"}>
              {seconds < 10 ? `0${seconds}` : seconds}
            </span>
            <span>secs</span>
          </Paper>
        </div>
      );
    }
  };

  if (date && start && end) {
    if (isFixed) {
      <Countdown
        date={start}
        now={() => end.getTime()}
        onComplete={() => setIsFixed(false)}
        renderer={renderCountdown}
      />;
    }
  }

  if (date) {
    return (
      <Countdown
        date={date}
        onComplete={onComplete}
        renderer={renderCountdown}
      />
    );
  } else {
    return null;
  }
};

export default PhaseCountdown;
