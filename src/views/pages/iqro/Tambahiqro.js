import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { bacaiqro } from "../../../gambar";
import {
  doGetByRumahTahfidzRequest,
  doGetRumahTahfidzRequest,
} from "../../../reduxsaga/actions/RumahTahfidz";
import { doGetSantriRequest } from "../../../reduxsaga/actions/Santri";
import { doCreateIqroSantriRequest } from "../../../reduxsaga/actions/Iqrosantri";
import moment from "moment";

const Tambahiqro = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [select, setSelect] = useState();
  console.log(select);

  useEffect(() => {
    if (userProfile.role == "8b273d68-fe09-422d-a660-af3d8312f883") {
      dispatch(doGetRumahTahfidzRequest());
    } else if (userProfile.role == "8b273d68-fe09-422d-a660-af3d8312f884") {
      dispatch(doGetByRumahTahfidzRequest(userProfile.masterpondokId));
    }
    dispatch(doGetSantriRequest());
  }, []);

  const handleChange = (e) => {
    setSelect(e.target.value);
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string("Masukkan iqra").required("Masukkan iqra"),
    halaman: Yup.string("Masukkan halaman").required("Masukkan halaman"),
    tgl_selesai: Yup.string("Masukkan tgl selesai").required(
      "Masukkan tgl selesai"
    ),
    ket: Yup.string("Masukkan keterangan").required("Masukkan keterangan"),

    santriId: Yup.string("Pilih Santri").required("Pilih Santri"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      halaman: "",
      tgl_selesai: "",
      ket: "",
      santriId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const payload = {
        name: values.name,
        halaman: values.halaman,
        tgl_selesai: moment(values.tgl_selesai).format("YYYY-MM-DD"),
        ket: values.ket,
        santriId: values.santriId,
      };

      dispatch(doCreateIqroSantriRequest(payload));

      toast.success("Data berhasil ditambahkan...");

      // setTimeout(() => {
      //   navigate("/dataiqrosantri", { state: { refresh: true } });
      // }, 3000);
    },
  });

  const { rumahtahfidzdata } = useSelector((state) => state.rumahTahfidzState);
  const { santridata } = useSelector((state) => state.santriState);
  const { userProfile } = useSelector((state) => state.userState);

  const iqro = ["IQRO 1", "IQRO 2", "IQRO 3", "IQRO 4", "IQRO 5", "IQRO 6"];
  const keterangan = ["mengulang", "belum lancar", "selesai"];
  return (
    <div className="">
      <div className="mx-4 my-4 bg-gradient-to-r from-green-400 ro bg-mamasingle rounded-lg px-4 py-6 flex justify-between items-center shadow-lg hover:from-mamasingle hover:to-green-400">
        <h1 className="text-white font-semibold lg:text-2xl text-xl font-poppins">
          Tambah Hafalan Iqro
        </h1>
        <img src={bacaiqro} className="h-20" />
      </div>
      <div className="m-4 bg-white p-4 rounded-md font-poppins text-xs">
        <div className="grid grid-cols-8 my-2">
          <h1 className="block lg:col-span-2 col-span-4">Tahfidz</h1>
          <select
            name="pondokId"
            id="pondokId"
            value={select}
            onChange={handleChange}
            autoComplete="pondokId"
            class="border rounded-md block lg:col-span-2 col-span-4 pl-2 py-1 placeholder:text-xs"
          >
            <option value="" selected disabled hidden>
              Pilih Rumah Tahfidz
            </option>
            {rumahtahfidzdata.map((e) => (
              <option value={e.id}>{e.name}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-8 my-2">
          <h1 className="block lg:col-span-2 col-span-4">Santri</h1>
          <select
            name="santriId"
            id="santriId"
            value={formik.values.santriId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="santriId"
            class="border rounded-md block lg:col-span-2 col-span-4 pl-2 py-1 placeholder:text-xs"
          >
            <option value="" selected disabled hidden>
              Pilih Santri
            </option>
            {santridata
              .filter((e) => e.pondokId === select)
              .map((e) => (
                <option value={e.id}>{e.name}</option>
              ))}
          </select>
          {formik.touched.santriId && formik.errors.santriId ? (
            <span className="my-1 lg:col-span-2 col-span-4 text-sm text-red-600 w-full ml-3">
              {formik.errors.santriId}
            </span>
          ) : null}
        </div>
        <div className="grid grid-cols-8 my-2">
          <h1 className="block lg:col-span-2 col-span-4">Iqro</h1>
          <select
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="name"
            class="border rounded-md block lg:col-span-2 col-span-4 pl-2 py-1 placeholder:text-xs"
          >
            <option value="" selected disabled hidden>
              Pilih Iqro
            </option>
            {iqro.map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
          {formik.touched.name && formik.errors.name ? (
            <span className="my-1 lg:col-span-2 col-span-4 text-sm text-red-600 w-full ml-3">
              {formik.errors.name}
            </span>
          ) : null}
        </div>
        <div className="grid grid-cols-8 my-2">
          <h1 className="block lg:col-span-2 col-span-4">Halaman</h1>
          <input
            className="border rounded-md block lg:col-span-2 col-span-4 pl-2 py-1 placeholder:text-xs"
            placeholder="Halaman ..."
            name="halaman"
            id="halaman"
            value={formik.values.halaman}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.halaman && formik.errors.halaman ? (
            <span className="my-1 lg:col-span-2 col-span-4 text-sm text-red-600 w-full ml-3">
              {formik.errors.halaman}
            </span>
          ) : null}
        </div>
        <div className="grid grid-cols-8 my-2">
          <h1 className="block lg:col-span-2 col-span-4">Tanggal Selesai</h1>
          <input
            className="border rounded-md block lg:col-span-2 col-span-4 pl-2 py-1 placeholder:text-xs"
            type="date"
            name="tgl_selesai"
            id="tgl_selesai"
            value={formik.values.tgl_selesai}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.tgl_selesai && formik.errors.tgl_selesai ? (
            <span className="my-1 lg:col-span-2 col-span-4 text-sm text-red-600 w-full ml-3">
              {formik.errors.tgl_selesai}
            </span>
          ) : null}
        </div>
        <div className="grid grid-cols-8 my-2">
          <h1 className="block lg:col-span-2 col-span-4">Keterangan</h1>
          <select
            name="ket"
            id="ket"
            value={formik.values.ket}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="ket"
            class="border rounded-md block lg:col-span-2 col-span-4 pl-2 py-1 placeholder:text-xs"
          >
            <option value="" selected disabled hidden>
              Pilih Keterangan
            </option>
            {keterangan.map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
          {formik.touched.ket && formik.errors.ket ? (
            <span className="my-1 lg:col-span-2 col-span-4 text-sm text-red-600 w-full ml-3">
              {formik.errors.ket}
            </span>
          ) : null}
        </div>
        <div>
          <button
            className="py-1 px-2 bg-mamasingle rounded-md text-white shadow-sm"
            type="button"
            onClick={formik.handleSubmit}
          >
            SIMPAN
          </button>
          <button
            className="py-1 px-2 bg-red-400 rounded-md text-white shadow-sm ml-2"
            onClick={() => navigate("/dataiqrosantri")}
          >
            KEMBALI
          </button>
        </div>
      </div>
      <div className="z-30">
        <ToastContainer autoClose={2000} />
      </div>
    </div>
  );
};

export default Tambahiqro;
