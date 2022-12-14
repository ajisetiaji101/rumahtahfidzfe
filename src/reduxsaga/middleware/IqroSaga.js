import { call, put } from "redux-saga/effects";
import {
  doGetIqroGuruByMasterTahfidzSucceed,
  doGetIqroGuruByRumahTahfidzFailed,
} from "../actions/IqroGuru";
import {
  doCreateIqroSantriFailed,
  doCreateIqroSantriSucceed,
  doDeleteIqroSantriFailed,
  doDeleteIqroSantriSucceed,
  doGetIqroAwalSantriFailed,
  doGetIqroAwalSantriSucceed,
  doGetIqroSantriByIdFailed,
  doGetIqroSantriByIdSucceed,
  doGetIqroSantriByMasterTahfidzFailed,
  doGetIqroSantriByMasterTahfidzSucceed,
  doGetIqroSantriByRumahTahfidzFailed,
  doGetIqroSantriByRumahTahfidzSucceed,
  doGetIqroSantriByUserIdFailed,
  doGetIqroSantriByUserIdSucced,
  doGetIqroSantriFailed,
  doGetIqroSantriSucceed,
  doUpdateIqroSantriFailed,
  doUpdateIqroSantriSucceed,
} from "../actions/Iqrosantri";
import apiIqrosantri from "../api/api-iqrosantri";

// GET
function* handleGetIqroSantri(action) {
  const { payload } = action;
  console.log("sudah sampai di middleware");

  try {
    const result = yield call(apiIqrosantri.list, payload);
    yield put(doGetIqroSantriSucceed(result));
  } catch (error) {
    yield put(doGetIqroSantriFailed(error));
  }
}

// GETLISTAWAL
function* handleGetIqroAwalSantri() {
  console.log("sudah sampai di middleware");

  try {
    const result = yield call(apiIqrosantri.listawal);
    yield put(doGetIqroAwalSantriSucceed(result));
  } catch (error) {
    yield put(doGetIqroAwalSantriFailed(error));
  }
}

// GET BY ID
function* handleGetByIdIqroSantri(action) {
  console.log("sudah sampai di middleware");
  const { payload } = action;

  try {
    const result = yield call(apiIqrosantri.getiqroid, payload);
    yield put(doGetIqroSantriByIdSucceed(result));
  } catch (error) {
    yield put(doGetIqroSantriByIdFailed(error));
  }
}

// GET BY RUMAHTAHFIZ
function* handleGetByRumahTahfidzIqroSantri(action) {
  console.log("sudah sampai di middleware");
  const { payload } = action;

  try {
    const result = yield call(apiIqrosantri.getiqrorumahtahfidz, payload);
    yield put(doGetIqroSantriByRumahTahfidzSucceed(result));
  } catch (error) {
    yield put(doGetIqroSantriByRumahTahfidzFailed(error));
  }
}

// GET BY USER ID
function* handleGetByUserIdIqroSantri(action) {
  console.log("sudah sampai di middleware");
  const { payload } = action;

  try {
    const result = yield call(apiIqrosantri.getiqrobyuserid, payload);
    yield put(doGetIqroSantriByUserIdSucced(result));
  } catch (error) {
    yield put(doGetIqroSantriByUserIdFailed(error));
  }
}

// GET BY MASTERTAHFIZ
function* handleGetByMasterTahfidzIqroSantri(action) {
  console.log("sudah sampai di middleware");
  const { payload } = action;

  try {
    const result = yield call(apiIqrosantri.getiqromastertahfidz, payload);
    yield put(doGetIqroSantriByMasterTahfidzSucceed(result));
  } catch (error) {
    yield put(doGetIqroSantriByMasterTahfidzFailed(error));
  }
}

// SANTRI
function* handleCreateIqroSantri(action) {
  console.log("sudah sampai di middleware");
  const { payload } = action;

  try {
    const result = yield call(apiIqrosantri.createiqro, payload);
    yield put(doCreateIqroSantriSucceed(result));
  } catch (error) {
    yield put(doCreateIqroSantriFailed(error));
  }
}

// HAPUS
function* handleDeleteIqroSantri(action) {
  console.log("sudah sampai di middleware");
  const { payload } = action;
  console.log(payload);

  try {
    const result = yield call(apiIqrosantri.deleteiqro, payload);
    yield put(doDeleteIqroSantriSucceed(payload));
  } catch (error) {
    yield put(doDeleteIqroSantriFailed(error));
  }
}

// UPDATE
function* handleUpdateIqroSantri(action) {
  console.log("sudah sampai di middleware");
  const { payload } = action;
  console.log(payload);

  try {
    const result = yield call(apiIqrosantri.updateiqro, payload);
    yield put(doUpdateIqroSantriSucceed(payload));
  } catch (error) {
    yield put(doUpdateIqroSantriFailed(error));
  }
}

export {
  handleGetIqroSantri,
  handleGetIqroAwalSantri,
  handleCreateIqroSantri,
  handleDeleteIqroSantri,
  handleGetByIdIqroSantri,
  handleUpdateIqroSantri,
  handleGetByRumahTahfidzIqroSantri,
  handleGetByMasterTahfidzIqroSantri,
  handleGetByUserIdIqroSantri,
};
