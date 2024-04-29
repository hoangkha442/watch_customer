import { https } from "./config";

export const CoursesService = {
    getProduct: () => {
      return https.get(`/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP05`);
    }
}