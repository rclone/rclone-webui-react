import { createSelector } from "reselect";
import get from "lodash/get";
import orderBy from "lodash/orderBy";

const fileListSelector = (state, props) => {
  const currentPath = state.explorer.currentPaths[props.containerID];
  const { remoteName, remotePath } = currentPath;
  const pathKey = `${remoteName}-${remotePath}`;

  return get(state, ["remote", "files", pathKey, "files"], []);
};

const sortParamsSelector = (state, props) => {
  return state.explorer.sortParams[props.containerID];
};

const orderBySortParamsType = (data, type) => {
  if (type === "date") {
    return Date.parse(data);
  }
  return data;
};

export const getSortedFilesList = createSelector(
  [fileListSelector, sortParamsSelector],
  (fileList, sortParams) => {
    if (sortParams) {
      return orderBy(
        fileList,
        (file) =>
          orderBySortParamsType(get(file, sortParams.key), sortParams.type),
        [sortParams.order || "desc"]
      );
    }
    return fileList;
  }
);
