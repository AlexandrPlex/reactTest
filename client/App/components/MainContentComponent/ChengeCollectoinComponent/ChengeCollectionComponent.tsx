export function appCollection(stateCollection: any){
    if (stateCollection === 'Organith') {
        return 'Filial';
    } else if (stateCollection === 'Filial') {
        return 'Staff'
    } else {
        return stateCollection;
    }
}

export function downCollection(stateCollection: any){
    if (stateCollection === 'Staff') {
        return 'Filial';
    } else if (stateCollection === 'Filial') {
        return 'Organith'
    } else {
        return stateCollection;
    }
}
