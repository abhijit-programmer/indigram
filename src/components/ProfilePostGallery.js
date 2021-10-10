import {
  makeStyles,
  ImageList,
  ImageListItem,
  isWidthUp,
  isWidthDown,
} from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";

//custom style of components
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    margin: theme.spacing(2, 0),
  },
  imageList: {
    width: 500,
    height: "auto",
  },
}));

const ProfilePostGallery = (props) => {
  const classes = useStyles();

  const getCols = (screenWidth) => {
    if (isWidthUp("sm", screenWidth)) {
      return { cols: 3, rowHeight: 200 };
    }

    if (isWidthDown("xs", screenWidth)) {
      return { cols: 1, rowHeight: "auto" };
    }

    return { cols: 2, rowHeight: 200 };
  };

  const { cols, rowHeight } = getCols(props.width);

  return (
    <div className={classes.root}>
      <ImageList
        rowHeight={rowHeight}
        className={classes.imageList}
        cols={cols}
      >
        {props.data && props.data.map((post) => (
            <ImageListItem key={post.id} cols={1}>
              <img src={post.imageURL} alt={post.caption} />
            </ImageListItem>
          ))}
      </ImageList>
    </div>
  );
};

export default withWidth()(ProfilePostGallery);
