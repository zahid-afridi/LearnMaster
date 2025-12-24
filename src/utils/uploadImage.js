// ========================
// Upload Image to API
// ========================
export const uploadImage = async (file) => {
  if (!file) throw new Error("No file provided for upload");

  try {
    // Convert file to Base64
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Failed to convert file to Base64"));
      });

    const base64 = await toBase64(file);

    // Upload to API
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: base64 }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to upload image");
    }

    return await response.json();
  } catch (err) {
    console.error("Image upload error:", err.message);
    throw err; // re-throw so calling function can handle it
  }
};
