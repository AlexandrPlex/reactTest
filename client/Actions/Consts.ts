export enum ActionTypes {
  LOGIN = 'ACTION_LOGIN',
  CllECTION = 'ACTION_CllECTION',
  // LOGOUT = 'ACTION_LOGOUT',
  ONLOADDATA = 'ACTION_LOAD_DATA',
  ACTIVETABLEITEM = 'ACTIVE_TABLE_ITEM',
  STATEMAODALVIEW = 'STATE_MODAL_VIEW',
  ADDNEWITEM = 'ADD_NEW_ITEM',
}

export enum AsyncActionTypes {
    BEGIN = '_BEGIN',
    SUCCESS = '_SUCCESS',
    FAILURE = '_FAILURE'
}

export enum CollectionName {
	ORGANITH = 'Organith',
	FILIAL = 'Filial',
	STAFF = 'Staff',
}

export enum SiteConfig {
	APIPREFIX = "http://localhost:8080",
	SITENAME = "React Test",
}

export enum ServerCall {
	LOGIN = "login",
}
