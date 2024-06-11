const loading = (state = false, action) => {
    return `<div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>`
};

export default loading;