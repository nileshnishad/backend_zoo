const { readJSONFile, writeJSONFile } = require('../utils/fileUtils');
const { successResponse, errorResponse } = require('../utils/responseUtils');
const path = require('path');

const getFilePath = (fileName) => path.join(__dirname, '..', 'data', fileName);
const profilesFilePath = getFilePath('profiles.json');

exports.getProfile = async (req, res) => {
  const { id } = req.params;
  console.log("id",id);
  try {
    const profiles = await readJSONFile(profilesFilePath);
    console.log("profiles",profiles);
    const profile = profiles.find(profile => profile.id === id);
    if (!profile) return res.status(404).json(errorResponse(null, 'Profile not found'));

    res.status(200).json(successResponse(profile, 'Profile fetched successfully'));
  } catch (err) {
    res.status(500).json(errorResponse(err.message, 'Server error'));
  }
};

exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const updatedProfile = req.body;
  try {
    const profiles = await readJSONFile(profilesFilePath);
    const profileIndex = profiles.findIndex(profile => profile.id === id);
    if (profileIndex === -1) return res.status(404).json(errorResponse(null, 'Profile not found'));

    profiles[profileIndex] = { ...profiles[profileIndex], ...updatedProfile };
    await writeJSONFile(profilesFilePath, profiles);

    res.status(200).json(successResponse(profiles[profileIndex], 'Profile updated successfully'));
  } catch (err) {
    res.status(500).json(errorResponse(err.message, 'Server error'));
  }
};
