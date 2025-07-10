import User from "../models/User.js";

export const getRecommendedUsers = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;
    
        const recommendedUsers = await User.find({
          $and: [
            { _id: { $ne: currentUserId } }, //exclude current user
            { isOnboarded: true },
          ],
        });
        res.status(200).json(recommendedUsers);
      } catch (error) {
        console.error("Error in getRecommendedUsers controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
}