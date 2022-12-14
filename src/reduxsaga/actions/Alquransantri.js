import * as ActionType from "../constants/AlquranSantri";

// GET
export const doGetAlquranSantriRequest = (payload) => ({
  type: ActionType.GET_ALQURANSANTRI_REQUEST,
  payload,
});

export const doGetAlquranSantriSucceed = (payload) => ({
  type: ActionType.GET_ALQURANSANTRI_SUCCEED,
  payload,
});

export const doGetAlquranSantriFailed = (payload) => ({
  type: ActionType.GET_ALQURANSANTRI_FAILED,
  payload,
});

// GETLISTAWAL
export const doGetAlquranAwalSantriRequest = () => ({
  type: ActionType.GET_ALQURANSANTRIAWAL_REQUEST,
});

export const doGetAlquranAwalSantriSucceed = (payload) => ({
  type: ActionType.GET_ALQURANSANTRIAWAL_SUCCEED,
  payload,
});

export const doGetAlquranAwalSantriFailed = (payload) => ({
  type: ActionType.GET_ALQURANSANTRIAWAL_FAILED,
  payload,
});

// GET BY ID
export const doGetAlquranSantriByIdRequest = (payload) => ({
  type: ActionType.GET_BY_ID_ALQURANSANTRI_REQUEST,
  payload,
});

export const doGetAlquranSantriByIdSucceed = (payload) => ({
  type: ActionType.GET_BY_ID_ALQURANSANTRI_SUCCEED,
  payload,
});

export const doGetAlquranSantriByIdFailed = (payload) => ({
  type: ActionType.GET_BY_ID_ALQURANSANTRI_FAILED,
  payload,
});

// GET BY RUMAHTAHFIZ
export const doGetAlquranSantriByRumahTahfidzRequest = (payload) => ({
  type: ActionType.GET_BY_RUMAHTAHFIDZ_ALQURANSANTRI_REQUEST,
  payload,
});

export const doGetAlquranSantriByRumahTahfidzSucceed = (payload) => ({
  type: ActionType.GET_BY_RUMAHTAHFIDZ_ALQURANSANTRI_SUCCEED,
  payload,
});

export const doGetAlquranSantriByRumahTahfidzFailed = (payload) => ({
  type: ActionType.GET_BY_RUMAHTAHFIDZ_ALQURANSANTRI_FAILED,
  payload,
});

// GET BY MASTERTAHFIZ
export const doGetAlquranSantriByMasterTahfidzRequest = (payload) => ({
  type: ActionType.GET_BY_MASTERTAHFIDZ_ALQURANSANTRI_REQUEST,
  payload,
});

export const doGetAlquranSantriByMasterTahfidzSucceed = (payload) => ({
  type: ActionType.GET_BY_MASTERTAHFIDZ_ALQURANSANTRI_SUCCEED,
  payload,
});

export const doGetAlquranSantriByMasterTahfidzFailed = (payload) => ({
  type: ActionType.GET_BY_MASTERTAHFIDZ_ALQURANSANTRI_FAILED,
  payload,
});

// GET BY USER ID
export const doGetAlquranSantriByUserIdRequest = (payload) => ({
  type: ActionType.GET_BY_USERID_ALQURANSANTRI_REQUEST,
  payload,
});

export const doGetAlquranSantriByUserIdSucceed = (payload) => ({
  type: ActionType.GET_BY_USERID_ALQURANSANTRI_SUCCEED,
  payload,
});

export const doGetAlquranSantriByUserIdFailed = (payload) => ({
  type: ActionType.GET_BY_USERID_ALQURANSANTRI_FAILED,
  payload,
});

// CREATE
export const doCreateAlquranSantriRequest = (payload) => ({
  type: ActionType.CREATE_ALQURANSANTRI_REQUEST,
  payload,
});

export const doCreateAlquranSantriSucceed = (payload) => ({
  type: ActionType.CREATE_ALQURANSANTRI_SUCCEED,
  payload,
});

export const doCreateAlquranSantriFailed = (payload) => ({
  type: ActionType.CREATE_ALQURANSANTRI_FAILED,
  payload,
});

// DELETE

export const doDeleteAlquranSantriRequest = (payload) => ({
  type: ActionType.DELETE_ALQURANSANTRI_REQUEST,
  payload,
});

export const doDeleteAlquranSantriSucceed = (payload) => ({
  type: ActionType.DELETE_ALQURANSANTRI_SUCCEED,
  payload,
});

export const doDeleteAlquranSantriFailed = (payload) => ({
  type: ActionType.DELETE_ALQURANSANTRI_FAILED,
  payload,
});

// Update
export const doUpdateAlquranSantriRequest = (payload) => ({
  type: ActionType.UPDATE_ALQURANSANTRI_REQUEST,
  payload,
});

export const doUpdateAlquranSantriSucceed = (payload) => ({
  type: ActionType.UPDATE_ALQURANSANTRI_SUCCEED,
  payload,
});

export const doUpdateAlquranSantriFailed = (payload) => ({
  type: ActionType.UPDATE_ALQURANSANTRI_FAILED,
  payload,
});
