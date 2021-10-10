import { customAlphabet } from "nanoid";

export const renameFile = (fileName) => {
  if (fileName) {
    const regex = /(?:\.([^.]+))?$/;
    const nanoid = customAlphabet("1234567890abcdef", 10);
    const fileNameId = nanoid();
    const fileExtension = regex.exec(fileName)[0];
    console.log(fileNameId, fileExtension);
    return fileNameId + fileExtension;
  } else {
    return fileName;
  }
};

export const copyToClipboard = (text, setValues) => {
  navigator.clipboard.writeText(text).then(
    () => {
      setValues({ success: true, error: "" });
    },
    (err) => {
      setValues({
        success: false,
        error: "Not able to copy!",
      });
    }
  );
};
