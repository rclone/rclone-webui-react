import React, {useState} from "react";
import * as PropTypes from "prop-types";
import {Button} from "reactstrap";
import axiosInstance from "../../utils/API/API";
import {toast} from "react-toastify";

const deactivatePlugin = (item) => {

}


function PluginRowEntries({loadedPlugins, getPlugins}) {
	const [isLoading, setIsLoading] = useState(false);
	const removePlugin = (key) => {
		setIsLoading(true);
		axiosInstance.post("pluginsctl/removePlugin", {
			name: key
		}).then(res => {
			getPlugins();

			setIsLoading(false);
			toast.info(`Plugin ${key} removed successfully`);
		}, err => {
			setIsLoading(false);

			toast.error(`Error removing plugin ${key} : ${err}`);
		})

	}
	let entries = [];
	for (const [key, value] of Object.entries(loadedPlugins)) {
		entries.push(
			<tr key={key}>
				<td>{value.name}</td>
				<td>{value.description}</td>
				<td>
					{isLoading ? "Installing..." :
						<>
							<Button color="primary">Deactivate</Button>
							<Button color={"danger"} className="ml-2" onClick={() => removePlugin(key)}>Delete</Button>

						</>
					}
				</td>
			</tr>
		)
	}
	return entries;
}

PluginRowEntries.propTypes = {
	loadedPlugins: PropTypes.object.isRequired,
	getPlugins: PropTypes.func.isRequired
}

export default PluginRowEntries;
