import SHA1 from "crypto-js/sha1";
import Hex from "crypto-js/enc-hex";

// Gera assinatura SHA-1
const generateSHA1 = (data: string) => {
  return SHA1(data).toString(Hex);
};

// Monta string para assinatura
const generateSignature = (publicId: string, apiSecret: string, timestamp: number) => {
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

// Extrai o public_id da URL
const getPublicIdFromUrl = (url: string): string | null => {
  const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Upload genérico
export const cloudinaryUpload = async (
  file: File,
  resourceType: "image" | "video" | "raw" = "image"
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "blogccp"
  );

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) throw new Error("CLOUDINARY_CLOUD_NAME não definido.");

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erro ao fazer upload no Cloudinary.");
  }

  const data = await response.json();
  return data.secure_url;
};


// Delete genérico
export const cloudinaryDelete = async (
  mediaUrl: string,
  resourceType: "image" | "video" | "raw" = "image"
) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Variáveis de ambiente do Cloudinary não estão definidas.");
  }

  const publicId = getPublicIdFromUrl(mediaUrl);
  if (!publicId) {
    throw new Error("Não foi possível extrair o publicId da URL.");
  }

  const timestamp = new Date().getTime();
  const signature = generateSHA1(generateSignature(publicId, apiSecret, timestamp));

  const body = new URLSearchParams();
  body.append("public_id", publicId);
  body.append("signature", signature);
  body.append("api_key", apiKey);
  body.append("timestamp", timestamp.toString());

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/destroy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    console.error(`Erro ao deletar ${resourceType}:`, await response.text());
    throw new Error(`Erro ao deletar ${resourceType} no Cloudinary.`);
  }

  return await response.json();
};

// Update genérico (substituição por public_id)
export const cloudinaryUpdate = async (
  file: File,
  publicId: string,
  resourceType: "image" | "video" | "raw" = "image"
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("public_id", publicId);
  formData.append("overwrite", "true");
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "Temporario"
  );

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) throw new Error("CLOUDINARY_CLOUD_NAME não definido.");

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Erro ao atualizar ${resourceType} no Cloudinary.`);
  }

  const data = await response.json();
  return data.secure_url;
};

// Exporta utilidade para uso externo
export { getPublicIdFromUrl };
