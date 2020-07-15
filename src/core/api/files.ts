import { axInstance } from "./axios";

export default {
  upload: (file: any, id: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);
    return axInstance.post("/upload/icon", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
