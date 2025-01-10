import { ImageTransformationOptions } from "@/lib/interfaces/image/image.interface";
import { ControllerResponse } from "@/lib/interfaces/shared/interface";

/**
 * Image File Transformation Service, Allows the following transformations:
 *      - Resize
 *      - Crop
 *      - Alteration of Image Format
 *
 * @param {File} image - Image File to be transformed
 * @param {ImageTransformationOptions} [options] - Transformation Options
 *  - resize: ImageDimensions - Resize the image to the specified dimensions
 *  - crop: ImageCrop - Crop the image to the specified dimensions
 *   - format: ImageType - Alter the image format to the specified type
 * @returns {Promise<ControllerResponse<Blob>>} - Transformed Image Blob
 */
export const transformImage = async (
    image: File,
    options: ImageTransformationOptions
): Promise<ControllerResponse<Blob>> => {
    // Instantiate Formdata Request to send all relevant data to the service
    const formData: FormData = new FormData();

    // Add the image file to the form data
    formData.append("image", image);

    // Add All Transformation requests to the form data
    Object.entries(options).forEach(([key, value]) => {
        if (value) {
            formData.append(key, JSON.stringify(value));
        }
    });

    // Send the request to the server
    const response: Response = await fetch(
        process.env.NEXT_PUBLIC_IMAGE_API_URL + "image/transform",
        {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        }
    );

    if (!response.ok) {
        return { status: response.status, error: response.statusText };
    }

    const data = await response.blob();
    return { status: response.status, data };
};
