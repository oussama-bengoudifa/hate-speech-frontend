import {
  loginAdmin,
  refreshToken,
  getCode,
  registerAdmin,
  forgetPassword,
  resetPassword,
} from "./auth.service";
import {
  getBanned,
  createBanned,
  updateBanned,
  deleteBanned,
} from "./banned.service";

export {
  loginAdmin,
  refreshToken,
  getBanned,
  createBanned,
  updateBanned,
  deleteBanned,
  getCode,
  registerAdmin,
  forgetPassword,
  resetPassword,
};
