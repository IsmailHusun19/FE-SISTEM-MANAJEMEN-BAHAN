import axios from "axios";
import { BASE_URL } from "../utils/config";

const ApiMe = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/users/me`, {
      withCredentials: true,
    });
    return res.data;
  } catch {
    return null;
  }
};

const EditMe = async (data) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/users/me`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error", error);
    return {
      success: false,
      message: error.response?.data?.message,
      status: error.response?.status || 500,
    };
  }
};

const GetAllUsers = async () => {
  try {
    const res = await axios.get("${BASE_URL}/users/all", {
      withCredentials: true,
    });
    return res.data;
  } catch {
    return null;
  }
};

const GetUserById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/users/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch {
    return null;
  }
};

const Logout = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/users/logout`, {}, {
      withCredentials: true,
    });
    return res.data;
  } catch {
    return null;
  }
};

const ApiLogin = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/login`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error", error);
    return {
      success: false,
      message: error.response?.data?.message || "Login gagal",
      status: error.response?.status || 500,
    };
  }
};

const AddPengguna = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users`,
      data,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("Error", error);
    return {
      success: false,
      message: error.response?.data?.message,
      status: error.response?.status || 500,
    };
  }
};

const EditPengguna = async (data, id) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/users/${id}`,
      data,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("Error", error);
    return {
      success: false,
      message: error.response?.data?.message,
      status: error.response?.status || 500,
    };
  }
};

const DeletePengguna = async (id) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/users/nonaktif/${id}`,{},
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const DeletePenggunaPermanent = async (id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/users/${id}`,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("Error", error);
    return {
      success: false,
      message: error.response?.data?.message,
      status: error.response?.status || 500,
    };
  }
};

const RestorePengguna = async (id) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/users/restore/${id}`,{},
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const GetAllBahan = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/bahan`, {
      withCredentials: true,
    });
    return res.data;
  } catch {
    return null;
  }
};

const GetBahanById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/bahan/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const AddDataBahan = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/bahan`,
      data,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const EditDataBahan = async (id, form) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/bahan/${id}`,
      form,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const DeleteBahan = async (id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/bahan/inactive/${id}`,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const GetAllBahanNonAktif = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/bahan/inactive`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const RestoreBahan = async (id) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/bahan/restore/${id}`,{},
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const DeleteBahanPermanent = async (id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/bahan/${id}`,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const GetAllPenerimaanBahan = async (params = {}) => {
  try {
    const res = await axios.get(`${BASE_URL}/bahan-masuk`, {
        params,
        withCredentials: true,
    });
    return res.data;
  } catch {
    return null;
  }
};

const AddBahanMasuk = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/bahan-masuk`,
      data,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const GetDetailPenerimaanBahan = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/bahan-masuk/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch {
    return null;
  }
};

const DeleteBahanMasuk = async (id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/bahan-masuk/${id}`,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const EditBahanMasuk = async (id, form) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/bahan-masuk/${id}`,
      form,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const EditStatusKonfirmasiBahanMasuk = async (id, status) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/bahan-masuk/konfirmasi/${id}`,
      status,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const GetAllBahanSisa = async (params = {}) => {
  try {
    const res = await axios.get(`${BASE_URL}/bahan-sisa`, {
      params,
      withCredentials: true,
    });
    return res.data;
  } catch {
    return null;
  }
};

const AddPemakaianBahan = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/bahan-sisa`,
      data,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const GetDetailPemakaianBahan = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/bahan-sisa/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch {
    return null;
  }
};

const DeletePemakaianBahan = async (id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/bahan-sisa/${id}`,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const EditStatusKonfirmasiPemakaianBahan = async (id, status) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/bahan-sisa/${id}/status`,
      status,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const EditPemakaianBahan = async (id, form) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/bahan-sisa/${id}`,
      form,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const GetDashboard = async (params = {}) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/dashboard`,
      {
        params,
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};








export { ApiLogin, GetDashboard, EditPemakaianBahan, GetDetailPemakaianBahan, DeletePemakaianBahan, EditStatusKonfirmasiPemakaianBahan, AddPemakaianBahan, GetAllBahanSisa, EditStatusKonfirmasiBahanMasuk, EditBahanMasuk, DeleteBahanMasuk, GetDetailPenerimaanBahan, AddBahanMasuk, GetAllPenerimaanBahan, RestorePengguna, DeletePenggunaPermanent, RestoreBahan, DeleteBahanPermanent, EditMe, ApiMe, Logout, GetAllUsers, AddPengguna, EditPengguna, GetUserById, DeletePengguna, GetAllBahan, GetBahanById, AddDataBahan, EditDataBahan, DeleteBahan, GetAllBahanNonAktif};
