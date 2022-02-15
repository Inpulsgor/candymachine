import { FC } from "react";
import {
	Box,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Typography,
	Tooltip,
	Button,
} from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";

import { Wallet } from "common/components";
import { ReactComponent as DiamondIcon } from "assets/icons/diamond.svg";
import { MintCardProps } from "./MintCard.types";
import data from "common/static/content.json";
import styles from "./MintCard.styles";

const { connect, title, wallet, phase, description, notConnected, tooltip } =
	data.pages.home.mint;

const MintCard: FC<MintCardProps> = () => {
	return (
		<Card sx={styles.card}>
			<Box sx={styles.mediaBox}>
				<CardMedia
					sx={styles.media}
					component="img"
					height="230"
					width="200"
					image="https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561_960_720.png"
					alt="avatar"
				/>
			</Box>

			<CardContent sx={styles.contentBox}>
				<Box sx={styles.titleBox}>
					<Typography sx={styles.title} variant="h2" component="span">
						{title}
					</Typography>
					<DiamondIcon width="26" />
				</Box>

				<Tooltip
					sx={styles.tooltip}
					title={<Typography variant="body2">{tooltip}</Typography>}
					placement="top"
				>
					<Button sx={styles.tooltipBtn} variant="outlined" color="info">
						<Typography sx={styles.tooltipText} variant="body2">
							{phase}
						</Typography>
						<InfoIcon sx={styles.tooltipIcon} />
					</Button>
				</Tooltip>
			</CardContent>

			<CardActions sx={styles.actionsBox}>
				<Wallet />
				{/* <Button sx={styles.walletBtn} variant="contained" fullWidth>
					<Typography sx={styles.walletBtnText} variant="body1">
						{connect}
					</Typography>
				</Button> */}
			</CardActions>

			<CardContent sx={styles.contentBoxSecond}>
				<Typography sx={styles.walletText} variant="body1" component="span">
					{wallet}
				</Typography>

				<Typography sx={styles.notConnected} variant="body1" component="span">
					{notConnected}
				</Typography>

				<Typography sx={styles.description} variant="body2" component="p">
					{description}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default MintCard;
