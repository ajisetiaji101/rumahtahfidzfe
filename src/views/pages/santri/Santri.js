import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { santri } from "../../../gambar";
import Table, {
  ButtonLinkSantri,
  perkecilnama,
  SelectColumnFilter,
  tanggalcustom,
} from "../../components/datatable/Table.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  doGetSantriByMasterTahfidzRequest,
  doGetSantriByRumahTahfidzRequest,
  doGetSantriByUserIdRequest,
  doGetSantriRequest,
} from "../../../reduxsaga/actions/Santri";
import LoadingSpinnerLogin from "../../components/spinner/LoadingSpinnerLogin";
const Santri = () => {
  const dispatch = useDispatch();

  const { isLoading, santridata } = useSelector((state) => state.santriState);
  const { userProfile } = useSelector((state) => state.userState);

  const [databaru, setDatabaru] = useState([]);

  useEffect(() => {
    setDatabaru(
      santridata.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
    );
  }, [santridata]);

  useEffect(() => {
    if (userProfile.role == "8b273d68-fe09-422d-a660-af3d8312f883") {
      dispatch(doGetSantriRequest());
    } else if (userProfile.role == "8b273d68-fe09-422d-a660-af3d8312f884") {
      dispatch(doGetSantriByMasterTahfidzRequest(userProfile.masterpondokId));
    } else if (userProfile.role == "1a2832f9-ceb7-4ff9-930a-af176c88dcc5") {
      dispatch(doGetSantriByUserIdRequest(userProfile.userId));
    } else {
      dispatch(doGetSantriByRumahTahfidzRequest(userProfile.pondokId));
    }
  }, []);

  const [Display, setDisplay] = useState([]);

  useEffect(() => {
    if (window.innerWidth <= 500) {
      setDisplay([
        {
          Header: "Nama",
          accessor: "name",
        },
        {
          Header: "Detail",
          accessor: "id",
          Cell: ButtonLinkSantri,
        },
      ]);
    } else {
      setDisplay([
        {
          Header: "Nama",
          accessor: "name",
          Cell: perkecilnama,
        },
        {
          Header: "NIS",
          accessor: "nis",
        },
        {
          Header: "MASUK",
          accessor: "mulai_masuk",
          Cell: tanggalcustom,
        },
        {
          Header: "VAKUM",
          accessor: "mulai_vakum",
          Cell: tanggalcustom,
        },
        {
          Header: "PONDOK",
          accessor: "Pondok.name",
          Filter: SelectColumnFilter, // new
          filter: "includes",
        },
        {
          Header: "Detail",
          accessor: "id",
          Cell: ButtonLinkSantri,
        },
      ]);
    }
  }, []);

  return (
    <div className="">
      {isLoading ? <LoadingSpinnerLogin /> : ""}
      <div className="mx-4 my-4 bg-gradient-to-r from-green-400 ro bg-mamasingle rounded-lg px-4 py-6 flex justify-between items-center shadow-lg hover:from-mamasingle hover:to-green-400">
        <h1 className="text-white font-semibold lg:text-2xl text-xl font-poppins">
          Data Santri
        </h1>
        <img src={santri} className="h-20" />
      </div>
      <div className="mt-6 px-4 text-gray-500">
        <Table columns={Display} data={databaru} url="tambah" />
      </div>
      <div className="z-30">
        <ToastContainer autoClose={2000} />
      </div>
    </div>
  );
};

export default Santri;
