const renderContact = (req, res) => {
  res.render("main", {
    data: {
      page: "contact",
    },
  });
};
export default { renderContact };
