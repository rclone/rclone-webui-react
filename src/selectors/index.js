import { createSelector } from "reselect";
import get from "lodash/get";
import orderBy from "lodash/orderBy";

const MIME_TYPES = {
  Images: "image/",
  Pdf: "application/pdf",
  Video: "video/"
};

const fileListSelector = (state, props) => {
  const currentPath = state.explorer.currentPaths[props.containerID];
  const { remoteName, remotePath } = currentPath;
  const pathKey = `${remoteName}-${remotePath}`;

  return get(state, ["remote", "files", pathKey, "files"], []);
};

const sortParamsSelector = (state, props) => {
  return state.explorer.sortParams[props.containerID];
};

const queryParamSelector = (state, props) => {
  return state.explorer.searchQueries[props.containerID];
};

const visibilityFiltersSelector = (state, props) => {
  return state.explorer.visibilityFilters[props.containerID];
};

const orderBySortParamsType = (data, type) => {
  if (type === "date") {
    return Date.parse(data);
  }
  return data;
};

export const getFilteredFilesList = createSelector(
  [fileListSelector, queryParamSelector],
  (list, query) => {
    const searchQuery = query.toLowerCase();
    if (searchQuery) {
      return list.filter((item) => {
        return item.Name.toLowerCase().startsWith(searchQuery);
      });
    }
    return list;
  }
);

export const getSortedFilesList = createSelector(
  [getFilteredFilesList, sortParamsSelector],
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

export const getFilesList = createSelector(
  [getSortedFilesList, visibilityFiltersSelector],
  (fileList, visibilityFilter) => {
    const mimeType = MIME_TYPES[visibilityFilter];
    if (mimeType) {
      return fileList.filter((item) => {
        return item.IsDir || (item.MimeType && item.MimeType === mimeType);
      });
    }
    return fileList;
  }
);
