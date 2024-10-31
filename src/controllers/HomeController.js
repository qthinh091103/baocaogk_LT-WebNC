const renderHome = (req, res) => {
  res.render("main", {
    data: {
      page: "home",
    },
  });
};
export default { renderHome };
