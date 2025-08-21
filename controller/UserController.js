const CoreUser = require("../models/CoreUser");
const { GetUserSession, Verify_JWT_Token } = require("../servies/AuthServices");


exports.DashboardAction = async (req, res) => {
  const userModel = await CoreUser.find();
  decode = Verify_JWT_Token(req.cookies.access_token.token || req.headers["authorization"]);
  return res.status(200).render("dashboard", {
    userModel: userModel,
    login_status: decode ? true : false,
    user: decode ? decode : null,
  });
};

exports.AddUserAction = async (req, res) => {
  return res.status(200).render("user/add_user_form");
};

exports.CreateUserAction = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { user_name, user_email, employee_id, mobile_number, status } = req.body;
      const model = new CoreUser();
      model.user_name = user_name;
      model.user_email = user_email;
      model.employee_id = employee_id;
      model.mobile_number = mobile_number;
      model.status = status || "Active"; // Default to 'Active' if not provided
      await model.save();
      req.flash(
        "success_msg",
        `User Has Been Created: [username:${model.user_name}]`
      );
      return res.status(200).redirect("/dashboard");
    } catch (err) {
      let errormsg = Object.values(err.errors)
        .map((value) =>
          typeof value === "object" ? JSON.stringify(value) : value
        )
        .join(" ");
      console.log(typeof errormsg);
      req.flash("error_msg", 'This is Error');
      return res.status(500).render("user/add_user_form", {
        message: "Something went wrong",
      });
    }
  } else {
    req.flash("error_msg", "Invalid Request");
    return res.status(403).redirect("/dashboard");
  }
};

exports.UpdateUserFormAction = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    req.flash("error_msg", "Invalid Request");
    return res.status(403).redirect("/dashboard");
  } else {
    //Find User Model
    const model = await CoreUser.find({ _id: id });
    if (model.length <= 0) {
      req.flash("error_msg", "Record Not Found");
      return res.status(404).redirect("/dashboard");
    } else {
      return res.status(200).render("user/update-user-form", {
        model: model,
      });
    }
  }
};

exports.UpdateUserAction = async (req, res) => {
  if (req.method !== "POST") {
    req.flash("error_msg", "Invalid Request");
    return res.status(403).redirect("/dashboard");
  } else {
    try {
      const { id, user_name, user_email, employee_id, mobile_number, status } =
        req.body;
      //Find User Model
      const model = await CoreUser.findById(id);
      if (model.length <= 0) {
        req.flash("error_msg", "Record Not Found");
        return res.status(404).redirect("/dashboard", {
          message: "User Not Found",
        });
      } else {
        model.user_name = user_name;
        model.user_email = user_email;
        model.employee_id = employee_id;
        model.mobile_number = mobile_number;
        model.status = status || "Active"; // Default to 'Active' if not provided
        await model.save();
        req.flash("success_msg", "You Details Are Successfully Updated");
        return res.status(200).redirect("/dashboard");
      }
    } catch (err) {
      req.flash("error_msg", err.errors);
      return res.status(500).render("user/update-user-form", {
        model: model,
      });
    }
  }
};

exports.DeleteUserAction = async (req, res) => {
  const { id } = req.query;
  if (id) {
    try {
      const model = await CoreUser.findByIdAndDelete(id);
      if (model) {
        req.flash("success_msg", "record has been deleted successfully");
        return res.status(200).redirect("/dashboard");
      } else {
        req.flash("error_msg", "Record not found");
        return res.status(200).redirect("/dashboard");
      }
    } catch (err) {
      req.flash("error_msg", err.message);
      return res.status(500).redirect("/dashboard");
    }
  } else {
    req.flash("error_msg", "Invalid request");
    return res.status(403).redirect("/dashboard");
  }
};
