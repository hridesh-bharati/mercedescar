// src/lib/cloudinary.js

/**
 * Upload to Cloudinary with optional overwrite.
 *
 * @param {File} file - Image file
 * @param {Object} options
 * @param {string} options.folder - Folder path (e.g. 'mercedes/services')
 * @param {string} options.publicId - If provided, overwrites that image (no duplicates)
 * @returns {Promise<{ success: boolean, url?: string, publicId?: string, error?: string }>}
 */
export async function uploadToCloudinary(file, options = {}) {
  const { folder = 'mercedes-garage', publicId = null } = options;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default');
  formData.append('folder', folder);

  if (publicId) {
    formData.append('public_id', publicId);
    formData.append('overwrite', 'true');
    formData.append('invalidate', 'true');
  }

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || 'Upload failed');

    return {
      success: true,
      url: data.secure_url,
      publicId: data.public_id,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export function extractPublicIdFromUrl(url) {
  if (!url || !url.includes('/upload/')) return null;
  try {
    const parts = url.split('/upload/')[1];
    const withoutVersion = parts.replace(/^v\d+\//, ''); 
    return withoutVersion.replace(/\.[^/.]+$/, '');
  } catch {
    return null;
  }
}