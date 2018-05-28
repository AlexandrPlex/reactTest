export function appCollection(stateCollection: any){
	switch (stateCollection) {
		case 'Organith':
			return 'Filial';
		case 'Filial':
			return 'Staff'

		default:
			return stateCollection;	
	}
}

export function downCollection(stateCollection: any){
	switch (stateCollection) {
		case 'Staff':
			return 'Filial';
		case 'Filial':
			return 'Organith'

		default:
			return stateCollection;	
	}
}