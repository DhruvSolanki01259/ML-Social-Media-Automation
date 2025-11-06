import User from "../models/user.model";
import { errorHandler, serverErrorHandler } from "../utils/responseHandlers";

export const addSocials = async (req, res) => {
  try {
    const { linkedinUrl, instagramUrl, facebookUrl, twitterUrl } = req.body;

    if (!linkedinUrl || !instagramUrl || !facebookUrl || !twitterUrl) {
      return errorHandler(res, 400, "All fields are required");
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return errorHandler(res, 404, "User not found");
    }

    user.socials = {
      linkedin: linkedinUrl,
      instagram: instagramUrl,
      facebook: facebookUrl,
      twitter: twitterUrl,
    };

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Social accounts updated successfully",
      data: user.socials,
    });
  } catch (error) {
    console.error("Error in Adding Socials:", error.message);
    return serverErrorHandler(res, 500, "Internal Server Error");
  }
};
