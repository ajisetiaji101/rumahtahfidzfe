import { toast } from "react-toastify";
import storage from "redux-persist/lib/storage";
import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

import {
  doSignupSucceed,
  doSignupFailed,
  doSigninSucceed,
  doSignoutSucceed,
  doShowAuthMessage,
  doGetUserSucceed,
  doGetUserFailed,
  doGetUserByIdSucceed,
  doGetUserByIdFailed,
  doCreateUserSucceed,
  doCreateUserFailed,
  doDeleteUserSucceed,
  doDeleteUserFailed,
  doUpdateUserSucceed,
  doUpdateUserFailed,
  doUpdateNoFIleUserSucceed,
  doUpdateNoFIleUserFailed,
  doCreateUserNoFileRequest,
  doCreateUserNoFileFailed,
  doCreateUserNoFileSucceed,
  doGetUserByRumahTahfidzRequest,
  doGetUserByRumahTahfidzFailed,
  doGetUserByRumahTahfidzSucceed,
  doGetByAdminUserRequest,
  doGetByAdminUserFailed,
  doGetByAdminUserSucceed,
  doGetUserByMasterTahfidzSucceed,
  doGetUserByMasterTahfidzFailed,
  doCreateUserSantriSucceed,
  doCreateUserSantriFailed,
  doCreateUserSantriNoFileSucceed,
  doCreateUserSantriNoFileFailed,
} from "../actions/User";
import apiUser from "../api/api-user";

function* handleSignup(action) {
  const { payload } = action;
  try {
    const result = yield call(apiUser.signup, payload);
    yield put(doSignupSucceed(result.data));
  } catch (error) {
    yield put(doSignupFailed(error));
  }
}

function* handleSignin(action) {
  const { payload } = action;
  try {
    const result = yield call(apiUser.signin, payload);
    if (Object.keys(result.data.profile).length === 0) {
      yield put(
        doShowAuthMessage({
          message: "user or password not match, try again",
        })
      );
    } else {
      localStorage.setItem("token", result.data.token);
      yield put(doSigninSucceed(result.data));
    }
    //localStorage.setItem('@profile', JSON.stringify(result.data.profile));
  } catch (error) {
    yield put(
      doShowAuthMessage({ message: "user or password not match, try again" })
    );
  }
}

function* handleSignout(action) {
  const { payload } = action;
  try {
    localStorage.clear();
    yield put(doSignoutSucceed(payload));
  } catch (error) {
    yield put(doSignupFailed(error));
  }
}

function* handleGetUser() {
  console.log("sudah sampai di middleware");

  try {
    const result = yield call(apiUser.list);
    yield put(doGetUserSucceed(result));
  } catch (error) {
    yield put(doGetUserFailed(error));
  }
}

function* handleGetAdmin() {
  console.log("sudah sampai di middleware");

  try {
    const result = yield call(apiUser.listadmin);
    yield put(doGetByAdminUserSucceed(result));
  } catch (error) {
    yield put(doGetByAdminUserFailed(error));
  }
}

// GET BY ID
function* handleGetByIdUser(action) {
  console.log("sudah sampai di middleware");
  const { payload } = action;

  try {
    const result = yield call(apiUser.getuserid, payload);
    yield put(doGetUserByIdSucceed(result));
  } catch (error) {
    yield put(doGetUserByIdFailed(error));
  }
}

// GET BY RUMAHTAHFIZ
function* handleGetByRumahTahfidzUser(action) {
  console.log("sudah sampai di middleware");
  const { payload } = action;

  try {
    const result = yield call(apiUser.getuserrumahtahfidz, payload);
    yield put(doGetUserByRumahTahfidzSucceed(result));
  } catch (error) {
    yield put(doGetUserByRumahTahfidzFailed(error));
  }
}

// GET BY MASTERTAHFIZ
function* handleGetByMasterTahfidzUser(action) {
  console.log("sudah sampai di middleware");
  const { payload } = action;

  try {
    const result = yield call(apiUser.getusermastertahfidz, payload);
    yield put(doGetUserByMasterTahfidzSucceed(result));
  } catch (error) {
    yield put(doGetUserByMasterTahfidzFailed(error));
  }
}

// CREATE
function* handleCreateUser(action) {
  const { payload } = action;

  try {
    const result = yield call(apiUser.createuser, payload);
    if (result.code === "ERR_BAD_REQUEST") {
      yield call(toast, "Pastikan Email Tidak Sama", {
        type: toast.TYPE.ERROR,
      });
    } else {
      yield put(doCreateUserSucceed(result));
      yield call(toast, "Data berhasil ditambahkan", {
        type: toast.TYPE.SUCCESS,
      });
    }
  } catch (error) {
    yield put(doCreateUserFailed(error));
    yield call(toast, "Pastikan Email Tidak Sama", {
      type: toast.TYPE.ERROR,
    });
  }
}

// CREATE
function* handleCreateUserSantri(action) {
  const { payload } = action;

  try {
    const result = yield call(apiUser.createusersantri, payload);
    if (result.code === "ERR_BAD_REQUEST") {
      yield call(toast, "Pastikan Email Tidak Sama", {
        type: toast.TYPE.ERROR,
      });
    } else {
      yield put(doCreateUserSantriSucceed(result));
      yield call(toast, "Data berhasil ditambahkan", {
        type: toast.TYPE.SUCCESS,
      });
    }
  } catch (error) {
    yield put(doCreateUserSantriFailed(error));
    yield call(toast, "Pastikan Email Tidak Sama", {
      type: toast.TYPE.ERROR,
    });
  }
}

// CREATE NO FILE
function* handleCreateNoFileUser(action) {
  console.log("sudah sampai di middleware");
  const { payload } = action;

  try {
    const result = yield call(apiUser.createNoFileuser, payload);
    if (result.code === "ERR_BAD_REQUEST") {
      yield call(toast, "Pastikan Email Tidak Sama", {
        type: toast.TYPE.ERROR,
      });
    } else {
      yield put(doCreateUserNoFileSucceed(result));
      yield call(toast, "Data berhasil ditambahkan", {
        type: toast.TYPE.SUCCESS,
      });
    }
  } catch (error) {
    yield put(doCreateUserNoFileFailed(error));
    yield call(toast, "Pastikan Email Tidak Sama", {
      type: toast.TYPE.ERROR,
    });
  }
}

function* handleCreateNoFileUserSantri(action) {
  console.log("sudah sampai di middleware");
  const { payload } = action;

  try {
    const result = yield call(apiUser.createNoFileusersantri, payload);
    if (result.code === "ERR_BAD_REQUEST") {
      yield call(toast, "Pastikan Email Tidak Sama", {
        type: toast.TYPE.ERROR,
      });
    } else {
      yield put(doCreateUserSantriNoFileSucceed(result));
      yield call(toast, "Data berhasil ditambahkan", {
        type: toast.TYPE.SUCCESS,
      });
    }
  } catch (error) {
    yield put(doCreateUserSantriNoFileFailed(error));
    yield call(toast, "Pastikan Email Tidak Sama", {
      type: toast.TYPE.ERROR,
    });
  }
}

// HAPUS
function* handleDeleteUser(action) {
  const { payload } = action;

  try {
    const result = yield call(apiUser.deleteuser, payload);
    if (result.code === "ERR_BAD_REQUEST") {
      yield call(toast, "Pastikan Data Benar", {
        type: toast.TYPE.ERROR,
      });
    } else {
      yield put(doDeleteUserSucceed(payload));
      yield call(toast, "Data berhasil dihapus", {
        type: toast.TYPE.SUCCESS,
      });
    }
  } catch (error) {
    yield put(doDeleteUserFailed(error));
    yield call(toast, "Pastikan Data Benar", {
      type: toast.TYPE.ERROR,
    });
  }
}

// UPDATE
function* handleUpdateUser(action) {
  const { payload } = action;

  try {
    const result = yield call(apiUser.updateuser, payload);
    if (result.code === "ERR_BAD_REQUEST") {
      yield call(toast, "Pastikan Email Tidak Sama", {
        type: toast.TYPE.ERROR,
      });
    } else {
      yield put(doUpdateUserSucceed(payload));
      yield call(toast, "Data berhasil diperbaharui", {
        type: toast.TYPE.SUCCESS,
      });
    }
  } catch (error) {
    yield put(doUpdateUserFailed(error));
    yield call(toast, "Pastikan Email Tidak Sama", {
      type: toast.TYPE.ERROR,
    });
  }
}

// UPDATE NO FILE
function* handleUpdateNoFileUser(action) {
  const { payload } = action;

  try {
    const result = yield call(apiUser.updateuserNoFile, payload);
    if (result.code === "ERR_BAD_REQUEST") {
      yield call(toast, "Pastikan Email Tidak Sama", {
        type: toast.TYPE.ERROR,
      });
    } else {
      yield put(doUpdateNoFIleUserSucceed(payload));
      yield call(toast, "Data berhasil diperbaharui", {
        type: toast.TYPE.SUCCESS,
      });
    }
  } catch (error) {
    yield put(doUpdateNoFIleUserFailed(error));
    yield call(toast, "Pastikan Email Tidak Sama", {
      type: toast.TYPE.ERROR,
    });
  }
}

export {
  handleSignup,
  handleSignin,
  handleSignout,
  handleCreateUser,
  handleDeleteUser,
  handleGetByIdUser,
  handleGetUser,
  handleUpdateNoFileUser,
  handleUpdateUser,
  handleCreateNoFileUser,
  handleGetByRumahTahfidzUser,
  handleGetAdmin,
  handleGetByMasterTahfidzUser,
  handleCreateUserSantri,
  handleCreateNoFileUserSantri,
};
