export function copyText(text: string, onSuccess?: (text: string) => void) {
  try {
    navigator.clipboard.writeText(text).then(() => {
      onSuccess?.(text);
    });
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}
