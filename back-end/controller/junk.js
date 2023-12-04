// import UserModel from "../model/user.js";
// import jwt from "jsonwebtoken";
// const signIn = async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const tryGetUsername = await UserModel.findOne({ username: username });
//         if (tryGetUsername) {
//             const isPasswordCorrect = await bcrypt.compare(password, tryGetUsername.password);
//             if (isPasswordCorrect) {
//                 const accessToken = jwt.sign(
//                     {
//                         id: tryGetUsername._id, username: tryGetUsername.username, role: tryGetUsername.role
//                     },
//                     process.env.ACCESS_TOKEN_SECRET,
//                     {
//                         expiresIn: "10m",
//                     }
//                 );
//                 const refreshToken = jwt.sign(
//                     { username: userData.username },
//                     process.env.REFRESH_TOKEN_SECRET,
//                     {
//                         expiresIn: "1d",
//                     }
//                 );
//                 tryGetUsername.refresh_token = refreshToken;
//                 await tryGetUsername.save();
//                 res.cookie('refreshToken', refreshToken, {
//                     httpOnly: true,
//                     sameSite: 'none',
//                     secure: true,
//                     maxAge: 24 * 60 * 60 * 1000
//                 });
//                 res.status(200).json(accessToken, tryGetUsername);
//             }
//             else {
//                 res.status(401).json({ error: 'Wrong password' });
//             }
//         }
//         else {
//             res.status(404).json({ error: 'User not found' });
//         }
//     }
//     catch (error) {
//         console.error('Error signing in:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

// const handleRefresh = async (req, res) => {
//     //1. Retrieve Refresh Token from Client
//     const cookies = req.cookies;
//     if (!cookies?.jwt) return res.sendStatus(401);
//     const refreshToken = cookies.jwt;
//     const foundUser = await User.findOne({
//         where: { refresh_token: refreshToken },
//     });
//     if (!foundUser) {
//         return res.sendStatus(401);
//     }

//     //2. Check Validity and Generate new Access Token
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
//         if (err || decoded.email !== foundUser.email) return res.sendStatus(403);
//     });

//     const accessToken = jwt.sign(
//         {
//             id: foundUser.id,
//             username: foundUser.username,
//             role: foundUser.role
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         {
//             expiresIn: "10m",
//         }
//     );

//     res.status(200).json({
//         status: "success",
//         data: {
//             name: foundUser.display_name,
//             accessToken,
//             email: foundUser.email,
//             username: foundUser.username,
//             role: foundUser.role
//         },
//     });
// };

// const handleLogout = async (req, res) => {
//     //1. Remove Refresh Token from Client
//     const cookies = req.cookies;
//     if (!cookies?.jwt) return res.sendStatus(204); //No content already
//     const refreshToken = cookies.jwt;
//     const foundUser = await User.findOne({
//         where: { refresh_token: refreshToken },
//     });
//     res.clearCookie("refreshToken", { httpOnly: true, sameSite: "None", secure: true });
//     if (!foundUser) {
//         return res.sendStatus(204);
//     }

//     //2. Remove Refresh Token from Database
//     foundUser.refresh_token = null;
//     await foundUser.save();
//     res.sendStatus(204);
// };

// const handleVerify = async (req, res) => {
//   const { token } = req.params;

//   if (!token) {
//     return res.status(400).json({
//       status: "Bad Request",
//       message: "Token is required",
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     const user = await User.findOne({username: decoded.username });

//     if (!user) {
//       return res.status(404).json({
//         status: "Not Found",
//         message: "User does not exist",
//       });
//     }

//     // Email included in refresh token payload to check associativity when used again
//     const refreshToken = jwt.sign(
//       { username: decoded.username, email: decoded.email, role: decoded.role },
//       process.env.REFRESH_TOKEN_SECRET,
//       {
//         expiresIn: "1d",
//       }
//     );

//     console.log(user);
//     const accessToken = jwt.sign(
//       {
//         id: user._id,
//         username: user.username,
//         role: user.role,
//       },
//       process.env.ACCESS_TOKEN_SECRET,
//       {
//         expiresIn: "5m",
//       }
//     );

//     user.refresh_token = refreshToken;
//     await user.save();

//     // higher security as it becomes inaccessible by javascript
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       sameSite: "None",
//       secure: true,
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({
//       status: "success",
//       message: "User successfully verified",
//       data: {
//         accessToken,
//         email: user.email,
//         username: user.username,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     res.status(401).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };

// export {signIn, handleRefresh, handleLogout, handleVerify};