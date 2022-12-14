import React, { useEffect, useState } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from "react-table";
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
  TrashIcon,
  EyeIcon,
  PencilIcon,
  ViewListIcon,
} from "@heroicons/react/solid";
import { Button, PageButton } from "./shared/Button";
import { classNames } from "./shared/Utils";
import { SortIcon, SortUpIcon, SortDownIcon } from "./shared/Icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  doGetRumahTahfidzRequest,
  doDeleteRumahTahfidzRequest,
} from "../../../../src/reduxsaga/actions/RumahTahfidz";
import { doDeleteSantriRequest } from "../../../reduxsaga/actions/Santri";
import { doDeleteIqroSantriRequest } from "../../../reduxsaga/actions/Iqrosantri";
import {
  doDeleteSurahPendekSantriRequest,
  doDeleteSurahPendekSantriSucceed,
} from "../../../reduxsaga/actions/SurahPendekSantri";
import { doDeleteAlquranSantriRequest } from "../../../reduxsaga/actions/Alquransantri";
import { doDeleteUserRequest } from "../../../reduxsaga/actions/User";
import { doDeleteGuruRequest } from "../../../reduxsaga/actions/Guru";
import { doDeleteIqroGuruRequest } from "../../../reduxsaga/actions/IqroGuru";
import { doDeleteAlquranGuruRequest } from "../../../reduxsaga/actions/Alquranguru";
import { doDeleteMasterPondokRequest } from "../../../reduxsaga/actions/Masterpondok";
import moment from "moment";
import Modal from "../modal/Modal";
import { doDeleteSurahPendekGuruRequest } from "../../../reduxsaga/actions/SurahPendekGuru";

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <label className="flex gap-x-2 items-baseline">
      <span className="text-gray-700">Search: </span>
      <input
        type="text"
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3 py-1"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </label>
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <label className="flex gap-x-2 items-baseline">
      <span className="text-gray-700">{render("Header")}: </span>
      <select
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function StatusPill({ value }) {
  const status = value ? value.toLowerCase() : "unknown";

  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        status.startsWith("active") ? "bg-green-100 text-green-800" : null,
        status.startsWith("inactive") ? "bg-yellow-100 text-yellow-800" : null,
        status.startsWith("offline") ? "bg-red-100 text-red-800" : null
      )}
    >
      {status}
    </span>
  );
}

export function tanggalcustom({ value }) {
  if (value != null) {
    const tgl = moment(value).format("DD-MM-YYYY");
    return <span className="text-gray-500">{tgl}</span>;
  } else {
    return <span className=" text-gray-500"></span>;
  }
}

export function perkecilemail({ value }) {
  return <h1 className=" truncate w-36">{value}</h1>;
}

export function perkecilnama({ value }) {
  return <h1 className=" truncate w-40">{value}</h1>;
}

export function JumlahCabang({ value }) {
  const { isLoading, masterpondokdata } = useSelector(
    (state) => state.masterPondokState
  );

  return (
    <h1 className=" py-0 lg:py-1 w-5 lg:w-8 text-white text-center bg-fuchsia-400 rounded-md shadow-md mr-2 text-xs lg:text-sm">
      {masterpondokdata && value.length}
    </h1>
  );
}

export function Jumlahorang({ value }) {
  const result = value.filter((e) => e.mulai_vakum == null);
  const resultvakum = value.filter((e) => e.mulai_vakum != null);

  return (
    <div className="flex">
      <div className="group cursor-pointer relative text-white py-1 lg:py-2 w-5 lg:w-10 text-center bg-fuchsia-400 rounded-md shadow-md   mr-2">
        {result.length}
        <div class="opacity-0 py-1 lg:py-2 w-12 lg:w-24 bg-black text-white text-center text-xs rounded-lg absolute z-10 group-hover:opacity-100 bottom-full -left-2/3 pointer-events-none">
          Aktif
          <svg
            class="absolute text-black h-4 w-full left-0 top-full"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
          >
            <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </div>
      </div>
      {/* <h1 className=" text-white py-2 text-center bg-fuchsia-400 rounded-md shadow-md w-10 mr-2">
        {result.length}
      </h1> */}
      {/* <h1 className=" text-white py-2 text-center bg-gray-400 rounded-md shadow-md w-10">
        {resultvakum.length}
      </h1> */}
      <div className="group cursor-pointer relative text-white py-1 lg:py-2 w-5 lg:w-10 text-center bg-gray-400 rounded-md shadow-md mr-2">
        {resultvakum.length}
        <div class="opacity-0 py-1 lg:py-2 w-12 lg:w-24 bg-black text-center text-xs rounded-lg absolute z-10 group-hover:opacity-100 bottom-full -left-2/3 pointer-events-none">
          Vakum
          <svg
            class="absolute text-black h-4 w-full left-0 top-full"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
          >
            <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function ButtonLinkRumahTahfidz({ value }) {
  const status = value ? value.toLowerCase() : "";

  const [showModal, setShowModal] = useState(false);

  const tampilkan = () => {
    setShowModal(!showModal);
  };

  const tutupkan = () => {
    setShowModal(false);
  };

  const { userProfile } = useSelector((state) => state.userState);

  const dispatch = useDispatch();

  const onDelete = async (id) => {
    dispatch(doDeleteRumahTahfidzRequest(id));
    setShowModal(false);
  };

  return (
    <div>
      {userProfile.role === "8b273d68-fe09-422d-a660-af3d8312f884" ? (
        <div className=" flex">
          <Link
            to={"detail/" + status}
            className="px-3 sm:px-1 bg-mamasingle py-1 rounded-md mx-1 text-white shadow-md"
          >
            <EyeIcon className="lg:w-5 sm:w-2" />
          </Link>
          <Link
            to={"edit/" + status}
            className="px-3 sm:px-1 bg-blue-600 py-1 rounded-md mx-1 text-white shadow-md"
          >
            <PencilIcon className="lg:w-5 sm:w-2" />
          </Link>
          {status == "96f95aea-ef38-4623-82af-979c383bbb35" ? (
            ""
          ) : (
            <button
              onClick={tampilkan}
              className="px-3 sm:px-1 bg-red-600 py-1 rounded-md mx-1 text-white shadow-md"
            >
              <TrashIcon className="lg:w-5 sm:w-2" />
            </button>
          )}
          {showModal && (
            <Modal onCancel={tutupkan} onDelete={() => onDelete(status)} />
          )}
        </div>
      ) : (
        <div className="flex">
          <Link
            to={"detail/" + status}
            className="px-3 bg-mamasingle py-1 rounded-md mx-1 text-white shadow-md"
          >
            <EyeIcon className="lg:w-5 sm:w-2" />
          </Link>
        </div>
      )}
    </div>
  );
}

export function ButtonLinkListRumahTahfidz({ value }) {
  const status = value ? value.toLowerCase() : "";
  const { userProfile } = useSelector((state) => state.userState);

  const [showModal, setShowModal] = useState(false);

  const tampilkan = () => {
    setShowModal(!showModal);
  };

  const tutupkan = () => {
    setShowModal(false);
  };

  const dispatch = useDispatch();

  const onDelete = async (id) => {
    dispatch(doDeleteRumahTahfidzRequest(id));
    setShowModal(false);
  };

  return (
    <div>
      <div className=" flex">
        <Link
          to={"/datarumahtahfiz/detail/" + status}
          className="px-3 sm:px-1 bg-mamasingle py-1 rounded-md mx-1 text-white shadow-md"
        >
          <EyeIcon className="lg:w-5 sm:w-2" />
        </Link>
        <Link
          to={"/datarumahtahfiz/edit/" + status}
          className="px-3 sm:px-1 bg-blue-600 py-1 rounded-md mx-1 text-white shadow-md"
        >
          <PencilIcon className="lg:w-5 sm:w-2" />
        </Link>

        {status == "96f95aea-ef38-4623-82af-979c383bbb35" ? (
          ""
        ) : (
          <button
            onClick={tampilkan}
            className="px-3 sm:px-1 bg-red-600 py-1 rounded-md mx-1 text-white shadow-md"
          >
            <TrashIcon className="lg:w-5 sm:w-2" />
          </button>
        )}

        {showModal && (
          <Modal onCancel={tutupkan} onDelete={() => onDelete(status)} />
        )}
      </div>
    </div>
  );
}

export function ButtonLinkMasterRumahTahfidz({ value }) {
  const status = value ? value.toLowerCase() : "";
  const { userProfile } = useSelector((state) => state.userState);

  const [showModal, setShowModal] = useState(false);

  const tampilkan = () => {
    setShowModal(!showModal);
  };

  const tutupkan = () => {
    setShowModal(false);
  };

  const dispatch = useDispatch();

  const onDelete = (e) => {
    dispatch(doDeleteMasterPondokRequest(e));
    setShowModal(false);
  };

  return (
    <div>
      {userProfile.role === "8b273d68-fe09-422d-a660-af3d8312f883" ||
      userProfile.role === "8b273d68-fe09-422d-a660-af3d8312f883" ? (
        <div className=" flex">
          <Link
            to={"list/" + status}
            className="px-3 sm:px-1 bg-violet-500 py-1 rounded-md mx-1 text-white shadow-md"
          >
            <ViewListIcon className="lg:w-5 sm:w-2" />
          </Link>
          <Link
            to={"detail/" + status}
            className="px-3 sm:px-1 bg-mamasingle py-1 rounded-md mx-1 text-white shadow-md"
          >
            <EyeIcon className="lg:w-5 sm:w-2" />
          </Link>
          <Link
            to={"edit/" + status}
            className="px-3 sm:px-1 bg-blue-600 py-1 rounded-md mx-1 text-white shadow-md"
          >
            <PencilIcon className="lg:w-5 sm:w-2" />
          </Link>
          {status == "96f95aea-ef38-4623-82af-979c383bbb01" ? (
            ""
          ) : (
            <button
              onClick={tampilkan}
              className="px-3 sm:px-1 bg-red-600 py-1 rounded-md mx-1 text-white shadow-md"
            >
              <TrashIcon className="lg:w-5 sm:w-2" />
            </button>
          )}
          {showModal && (
            <Modal onCancel={tutupkan} onDelete={() => onDelete(status)} />
          )}
        </div>
      ) : (
        <div className="flex">
          <Link
            to={"detail/" + status}
            className="px-3 bg-mamasingle py-1 rounded-md mx-1 text-white shadow-md"
          >
            <EyeIcon className="lg:w-5 sm:w-2" />
          </Link>
        </div>
      )}
    </div>
  );
}

export function ButtonLinkSantri({ value }) {
  const status = value ? value.toLowerCase() : "";

  const [showModal, setShowModal] = useState(false);

  const tampilkan = () => {
    setShowModal(!showModal);
  };

  const tutupkan = () => {
    setShowModal(false);
  };

  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.userState);

  const onDelete = async (id) => {
    dispatch(doDeleteSantriRequest(id));
    setShowModal(false);
  };

  return (
    <div>
      {userProfile.role === "8b273d68-fe09-422d-a660-af3d8312f883" ||
      userProfile.role === "8b273d68-fe09-422d-a660-af3d8312f884" ? (
        <div className="flex">
          <Link
            to={"detail/" + status}
            className="px-1 bg-mamasingle py-1 rounded-md mx-1 text-white shadow-md"
          >
            <EyeIcon className="lg:w-5 sm:w-2" />
          </Link>
          <Link
            to={"edit/" + status}
            className="px-1 bg-blue-600 py-1 rounded-md mx-1 text-white shadow-md"
          >
            <PencilIcon className="lg:w-5 sm:w-2" />
          </Link>
          <button
            onClick={tampilkan}
            className="px-1 bg-red-600 py-1 rounded-md mx-1 text-white shadow-md"
          >
            <TrashIcon className="lg:w-5 sm:w-2" />
            {showModal && (
              <Modal onCancel={tutupkan} onDelete={() => onDelete(status)} />
            )}
          </button>
        </div>
      ) : (
        <div className="flex">
          <Link
            to={"detail/" + status}
            className="px-1 bg-mamasingle py-1 rounded-md mx-1 text-white shadow-md"
          >
            <EyeIcon className="lg:w-5 sm:w-2" />
          </Link>
        </div>
      )}
    </div>
  );
}
export function ButtonLinkGuru({ value }) {
  const status = value ? value.toLowerCase() : "";

  const [showModal, setShowModal] = useState(false);

  const tampilkan = () => {
    setShowModal(!showModal);
  };

  const tutupkan = () => {
    setShowModal(false);
  };

  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.userState);

  const onDelete = async (id) => {
    dispatch(doDeleteGuruRequest(id));
    setShowModal(false);
  };

  return (
    <div>
      {userProfile.role === "8b273d68-fe09-422d-a660-af3d8312f883" ||
      userProfile.role === "8b273d68-fe09-422d-a660-af3d8312f884" ? (
        <div className="flex">
          <Link
            to={"detail/" + status}
            className="px-3 sm:px-1 bg-mamasingle py-1 rounded-md mx-1 text-white shadow-md"
          >
            <EyeIcon className="lg:w-5 sm:w-2" />
          </Link>
          <Link
            to={"edit/" + status}
            className="px-3 sm:px-1 bg-blue-600 py-1 rounded-md mx-1 text-white shadow-md"
          >
            <PencilIcon className="lg:w-5 sm:w-2" />
          </Link>
          <button
            onClick={tampilkan}
            className="px-3 sm:px-1 bg-red-600 py-1 rounded-md mx-1 text-white shadow-md"
          >
            <TrashIcon className="lg:w-5 sm:w-2" />
          </button>
          {showModal && (
            <Modal onCancel={tutupkan} onDelete={() => onDelete(status)} />
          )}
        </div>
      ) : (
        <div className="flex">
          <Link
            to={"detail/" + status}
            className="px-3 sm:px-1 bg-mamasingle py-1 rounded-md mx-1 text-white shadow-md"
          >
            <EyeIcon className="lg:w-5 sm:w-2" />
          </Link>
        </div>
      )}
    </div>
  );
}

export function ButtonLinkUser({ value }) {
  const status = value ? value.toLowerCase() : "";

  const [showModal, setShowModal] = useState(false);

  const tampilkan = () => {
    setShowModal(!showModal);
  };

  const tutupkan = () => {
    setShowModal(false);
  };

  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.userState);

  const onDelete = async (id) => {
    dispatch(doDeleteUserRequest(id));
    setShowModal(false);
  };

  return (
    <div className=" flex">
      <Link
        to={"detail/" + status}
        className="px-3 sm:px-1 bg-mamasingle py-1 rounded-md mx-1 text-white shadow-md"
      >
        <EyeIcon className="lg:w-5 sm:w-2" />
      </Link>
      <Link
        to={"edit/" + status}
        className="px-3 sm:px-1 bg-blue-600 py-1 rounded-md mx-1 text-white shadow-md"
      >
        <PencilIcon className="lg:w-5 sm:w-2" />
      </Link>
      <button
        onClick={tampilkan}
        className="px-3 sm:px-1 bg-red-600 py-1 rounded-md mx-1 text-white shadow-md"
      >
        <TrashIcon className="lg:w-5 sm:w-2" />
      </button>
      {showModal && (
        <Modal onCancel={tutupkan} onDelete={() => onDelete(status)} />
      )}
    </div>
  );
}

export function ButtonLinkIqro({ value }) {
  const status = value ? value.toLowerCase() : "";

  return (
    <div className="flex">
      <Link
        to={"detail/" + status}
        className="px-3 sm:px-1 bg-mamasingle py-1 rounded-md mx-1 text-white shadow-md"
      >
        <EyeIcon className="lg:w-5 sm:w-2" />
      </Link>
    </div>
  );
}

export function ButtonLinkIqroList({ value }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const tampilkan = () => {
    setShowModal(!showModal);
  };

  const tutupkan = () => {
    setShowModal(false);
  };

  const onDelete = async (id) => {
    dispatch(doDeleteIqroSantriRequest(id));
    toast.success("Data berhasil dihapus...");
    setShowModal(false);
  };

  const status = value;

  return (
    <div className=" flex">
      <Link
        to={"/dataiqrosantri/edit/" + status}
        className="px-3 sm:px-1 bg-blue-600 py-1 rounded-md mx-1 text-white shadow-md"
      >
        <PencilIcon className="lg:w-5 sm:w-2" />
      </Link>
      <button
        onClick={tampilkan}
        className="px-3 sm:px-1 bg-red-600 py-1 rounded-md mx-1 text-white shadow-md"
      >
        <TrashIcon className="lg:w-5 sm:w-2" />
        {showModal && (
          <Modal onCancel={tutupkan} onDelete={() => onDelete(status)} />
        )}
      </button>
    </div>
  );
}

export function ButtonLinkSurahPendekList({ value }) {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const tampilkan = () => {
    setShowModal(!showModal);
  };

  const tutupkan = () => {
    setShowModal(false);
  };

  const onDelete = async (id) => {
    dispatch(doDeleteSurahPendekSantriRequest(id));
    toast.success("Data berhasil dihapus...");
    setShowModal(false);
  };

  const status = value;

  return (
    <div className=" flex">
      <Link
        to={"/datasurahpendeksantri/edit/" + status}
        className="px-3 sm:px-1 bg-blue-600 py-1 rounded-md mx-1 text-white shadow-md"
      >
        <PencilIcon className="lg:w-5 sm:w-2" />
      </Link>
      <button
        onClick={tampilkan}
        className="px-3 sm:px-1 bg-red-600 py-1 rounded-md mx-1 text-white shadow-md"
      >
        <TrashIcon className="lg:w-5 sm:w-2" />
        {showModal && (
          <Modal onCancel={tutupkan} onDelete={() => onDelete(status)} />
        )}
      </button>
    </div>
  );
}

export function ButtonLinkAlquranList({ value }) {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const tampilkan = () => {
    setShowModal(!showModal);
  };

  const tutupkan = () => {
    setShowModal(false);
  };

  const onDelete = async (id) => {
    dispatch(doDeleteAlquranSantriRequest(id));
    toast.success("Data berhasil dihapus...");
    setShowModal(false);
  };

  const status = value;

  return (
    <div className=" flex">
      <Link
        to={"/dataalquransantri/edit/" + status}
        className="px-3 sm:px-1 bg-blue-600 py-1 rounded-md mx-1 text-white shadow-md"
      >
        <PencilIcon className="lg:w-5 sm:w-2" />
      </Link>
      <button
        onClick={tampilkan}
        className="px-3 sm:px-1 bg-red-600 py-1 rounded-md mx-1 text-white shadow-md"
      >
        <TrashIcon className="lg:w-5 sm:w-2" />
      </button>
      {showModal && (
        <Modal onCancel={tutupkan} onDelete={() => onDelete(status)} />
      )}
    </div>
  );
}

export function ButtonLinkIqroPengajarList({ value }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const tampilkan = () => {
    setShowModal(!showModal);
  };

  const tutupkan = () => {
    setShowModal(false);
  };

  const onDelete = async (id) => {
    dispatch(doDeleteIqroGuruRequest(id));
    setShowModal(false);
  };

  const status = value;

  return (
    <div className=" flex">
      <Link
        to={"/dataiqropengajar/edit/" + status}
        className="px-3 sm:px-1 bg-blue-600 py-1 rounded-md mx-1 text-white shadow-md"
      >
        <PencilIcon className="lg:w-5 sm:w-2" />
      </Link>
      <button
        onClick={tampilkan}
        className="px-3 sm:px-1 bg-red-600 py-1 rounded-md mx-1 text-white shadow-md"
      >
        <TrashIcon className="lg:w-5 sm:w-2" />
      </button>
      {showModal && (
        <Modal onCancel={tutupkan} onDelete={() => onDelete(status)} />
      )}
    </div>
  );
}

export function ButtonLinkSurahPendekGuruList({ value }) {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const tampilkan = () => {
    setShowModal(!showModal);
  };

  const tutupkan = () => {
    setShowModal(false);
  };

  const onDelete = async (id) => {
    dispatch(doDeleteSurahPendekGuruRequest(id));
    toast.success("Data berhasil dihapus...");
    setShowModal(false);
  };

  const status = value;

  return (
    <div className=" flex">
      <Link
        to={"/datasurahpendekguru/edit/" + status}
        className="px-3 sm:px-1 bg-blue-600 py-1 rounded-md mx-1 text-white shadow-md"
      >
        <PencilIcon className="lg:w-5 sm:w-2" />
      </Link>
      <button
        onClick={tampilkan}
        className="px-3 sm:px-1 bg-red-600 py-1 rounded-md mx-1 text-white shadow-md"
      >
        <TrashIcon className="lg:w-5 sm:w-2" />
      </button>
      {showModal && (
        <Modal onCancel={tutupkan} onDelete={() => onDelete(status)} />
      )}
    </div>
  );
}

export function ButtonLinkAlquranGuruList({ value }) {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const tampilkan = () => {
    setShowModal(!showModal);
  };

  const tutupkan = () => {
    setShowModal(false);
  };

  const onDelete = async (id) => {
    dispatch(doDeleteAlquranGuruRequest(id));
    toast.success("Data berhasil dihapus...");
    setShowModal(false);
  };

  const status = value;

  return (
    <div className=" flex">
      <Link
        to={"/dataalquranguru/edit/" + status}
        className="px-3 sm:px-1 bg-blue-600 py-1 rounded-md mx-1 text-white shadow-md"
      >
        <PencilIcon className="lg:w-5 sm:w-2" />
      </Link>
      <button
        onClick={tampilkan}
        className="px-3 sm:px-1 bg-red-600 py-1 rounded-md mx-1 text-white shadow-md"
      >
        <TrashIcon className="lg:w-5 sm:w-2" />
      </button>
      {showModal && (
        <Modal onCancel={tutupkan} onDelete={() => onDelete(status)} />
      )}
    </div>
  );
}

export function AvatarCell({ value, column, row }) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10">
        <img
          className="h-10 w-10 rounded-full"
          src={row.original[column.imgAccessor]}
          alt=""
        />
      </div>
      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">
          {row.original[column.emailAccessor]}
        </div>
      </div>
    </div>
  );
}

function Table({ columns, data, url }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination // new
  );

  const { userProfile } = useSelector((state) => state.userState);

  // Render the UI for your table
  return (
    <>
      <div className="sm:flex sm:gap-x-2 font-poppins justify-between">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        {headerGroups.map((headerGroup) =>
          headerGroup.headers.map((column) =>
            column.Filter ? (
              <div className="mt-2 sm:mt-0" key={column.id}>
                {column.render("Filter")}
              </div>
            ) : null
          )
        )}
        {userProfile.role === "8b273d68-fe09-422d-a660-af3d8312f883" ||
        userProfile.role === "8b273d68-fe09-422d-a660-af3d8312f884" ? (
          <Link
            to={url}
            className=" bg-mamasingle lg:px-4 px-2 py-1 rounded-md text-white"
          >
            Tambah
          </Link>
        ) : null}
      </div>
      {/* table */}
      <div className="mt-4 flex flex-col">
        <div className="-my-2 overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-200"
              >
                <thead className="bg-gray-50 font-poppins">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        // Add the sorting props to control sorting. For this example
                        // we can add them into the header props
                        <th
                          scope="col"
                          className="group lg:px-6 px-2 py-3 text-left text-xs font-light text-gray-500 uppercase tracking-wider"
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          <div className="flex items-center justify-between">
                            {column.render("Header")}
                            {/* Add a sort direction indicator */}
                            <span>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <SortDownIcon className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <SortUpIcon className="w-4 h-4 text-gray-400" />
                                )
                              ) : (
                                <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                              )}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200 font-poppins"
                >
                  {page.map((row, i) => {
                    // new
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="lg:px-6 px-2 py-4 whitespace-nowrap"
                              role="cell"
                            >
                              {cell.column.Cell.name === "defaultRenderer" ? (
                                <div className="text-xs text-gray-500">
                                  {cell.render("Cell")}
                                </div>
                              ) : (
                                cell.render("Cell")
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className="py-3 flex items-center justify-between font-poppins">
        <div className="flex-1 flex justify-between sm:hidden">
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex gap-x-2 items-baseline">
            <span className="lg:text-sm text-xs text-gray-700">
              Page <span className="font-medium">{state.pageIndex + 1}</span> of{" "}
              <span className="font-medium">{pageOptions.length}</span>
            </span>
            <label>
              <span className="sr-only">Items Per Page</span>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-1 px-2 mr-2"
                value={state.pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <PageButton
                className="rounded-l-md"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">First</span>
                <ChevronDoubleLeftIcon
                  className="lg:h-5 lg:w-5 h-2 w-2 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
              <PageButton
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon
                  className="lg:h-5 lg:w-5 h-2 w-2 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
              <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
                <span className="sr-only">Next</span>
                <ChevronRightIcon
                  className="lg:h-5 lg:w-5 h-2 w-2 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
              <PageButton
                className="rounded-r-md"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <span className="sr-only">Last</span>
                <ChevronDoubleRightIcon
                  className="lg:h-5 lg:w-5 h-2 w-2 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
