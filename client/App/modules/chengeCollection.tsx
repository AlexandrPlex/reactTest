import {CollectionName} from '../../Actions/Consts';

export function appCollection(stateCollection: any){
    if (stateCollection === CollectionName.ORGANITH) {
        return CollectionName.FILIAL;
    } else if (stateCollection === CollectionName.FILIAL) {
        return CollectionName.STAFF
    } else {
        return stateCollection;
    }
}

export function downCollection(stateCollection: any){
    if (stateCollection === CollectionName.STAFF) {
        return CollectionName.FILIAL;
    } else if (stateCollection === CollectionName.FILIAL) {
        return CollectionName.ORGANITH
    } else {
        return stateCollection;
    }
}