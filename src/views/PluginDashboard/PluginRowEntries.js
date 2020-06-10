import React from "react";
import * as PropTypes from "prop-types";
import {Button} from "reactstrap";

const deactivatePlugin = (item) => {

}

const removePlugin = (item) => {

}

function PluginRowEntries({loadedPlugins}) {


	let entries = [];
	for (const [key, value] of Object.entries(loadedPlugins)) {
		entries.push(
			<tr key={key}>
				<td>{value.name}</td>
				<td>{value.description}</td>
				<td>
					<Button color="primary">Deactivate</Button>
					<Button color={"danger"} className="ml-2">Delete</Button>
				</td>
			</tr>
		)
	}
	return entries;
}

PluginRowEntries.propTypes = {
	loadedPlugins: PropTypes.object.isRequired,
}

export default PluginRowEntries;
