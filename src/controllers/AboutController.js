const renderAbout = (req, res) => {
  res.render("main", {
    data: {
      page: "about",
    },
  });
};
export default { renderAbout };
