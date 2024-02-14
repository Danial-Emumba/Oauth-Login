const User = require("../models/user");
const Provider = require("../models/provider");

async function updateOrSaveUser(profile, providerType) {
  const firstName =
    providerType === "google"
      ? profile.name.givenName
      : profile.displayName.split(" ")[0];
  const lastName =
    providerType === "google"
      ? profile.name.familyName
      : profile.displayName.split(" ")[1];
  try {
    let user = await User.findOne({
      where: { email: profile.emails[0].value },
    });

    if (user) {
      let provider = await Provider.findOne({
        where: {
          UserId: user.id,
          type: providerType,
          providerId: profile.id,
        },
      });

      if (!provider) {
        provider = await Provider.create({
          UserId: user.id,
          type: providerType,
          providerId: profile.id,
        });
      }
    } else {
      user = await User.create(
        {
          email: profile.emails[0].value,
          firstName,
          lastName,
          passowrd: null,
          Providers: [
            {
              type: providerType,
              providerId: profile.id,
            },
          ],
        },
        { include: [Provider] }
      );
    }

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = updateOrSaveUser;
