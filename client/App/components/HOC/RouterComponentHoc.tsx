import * as React from 'react';

function RouterComponentHOC(Component: any, collectionName: string): any{
	return class extends React.Component {
		static displayName = `RouterComponentHOC(${Component.displayName || Component.name})`;
		render() {
			return <Component {...this.props} collectionName={collectionName} />
		}
	}

}

export default RouterComponentHOC;