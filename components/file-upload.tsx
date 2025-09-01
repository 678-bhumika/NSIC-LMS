"use client";

import toast from "react-hot-toast";
import { useState } from "react";

import { useUploadThing } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";

interface FileUploadProps {
  onChange: (url?: string, originalFilename?: string) => void;
  endpoint: keyof typeof ourFileRouter;
};

export const FileUpload = ({
  onChange,
  endpoint
}: FileUploadProps) => {

  const [isUploading, setIsUploading] = useState(false);
  const { startUpload } = useUploadThing(endpoint);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setIsUploading(true);

    try {
      const res = await startUpload(Array.from(e.target.files));
      if (res && res[0]) {
        console.log("Upload result:", res);
        onChange(res[0].url, res[0].name);
        toast.success("File uploaded!");
      }
    } catch (error: any) {
      toast.error(error?.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      {isUploading && <p>Uploading...</p>}
    </div>
  );
};