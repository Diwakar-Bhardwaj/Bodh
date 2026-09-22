
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    // 1. Double check that Cloudinary credentials exist in production
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
      console.error("Cloudinary Environment Variables are missing in production settings.");
      return Response.json(
        { success: false, error: "Server storage configuration mismatch." },
        { status: 500 }
      );
    }

    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return Response.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    // 2. Convert incoming file to an arrayBuffer chunk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 3. Pipe the buffer stream safely to Cloudinary's storage API
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "profiles",
            resource_type: "auto", // Forces Cloudinary to automatically handle JPG, PNG, and WebP
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary Stream Error:", error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    return Response.json({
      success: true,
      imageUrl: result.secure_url,
    });

  } catch (error) {
    console.error("Upload API Route Error:", error);
    return Response.json(
      { success: false, error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}