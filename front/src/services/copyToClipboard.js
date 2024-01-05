export const copyToClipboard = async (content) => {
  if (!navigator.clipboard) {
    return null;
  } else {
    try {
      await navigator.clipboard.writeText(content);
      return true;
    } catch (err) {
      return err;
    }
  }
};
